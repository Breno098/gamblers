import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { AppContext } from '../../contexts/app';
import { AuthContext } from '../../contexts/auth'
import { Container, Row, Button, Input, List, ListColumns, Select, Option } from '../../components'
import firebase from '../../services/firebaseConnection';

export default function Team() {

    const { setMessage } = useContext(AppContext);
    const { user } = useContext( AuthContext );

    const [teamName, setTeamName] = useState('');
    const [teamKey, setTeamKey] = useState(null);
    const [teams, setTeams] = useState([]);

    const [country, setCountry] = useState(null);
    const [countrys, setCountrys] = useState([]);

    const [textButton, setTextButton] = useState('Registrar');

    useEffect(() => {
        loadList();
        loadListCountry();
    }, []);

    async function loadList(){
        await firebase.database().ref('app').child('team').orderByChild('name').on('value', (snapshot) => {
                setTeams([]);
                snapshot.forEach( childItem => {
                    let list = { key: childItem.key, name: childItem.val().name, country: childItem.val().country };
                    setTeams(oldArray => [...oldArray, list]);
                })
            })
    }

    async function loadListCountry(){
        await firebase.database().ref('app').child('country').orderByChild('name').on('value', (snapshot) => {
                setCountrys([]);
                snapshot.forEach( childItem => {
                    let list = { name: childItem.val().name };
                    setCountrys(oldArray => [...oldArray, list]);
                })
            })
    }

    async function handleSubmit(){
        if(!user.adm){
            setMessage('Sem permissão');
            return;
        }

        if(!teamName){
            setMessage('Insira o nome.');
            return;
        }

        if(!country){
            setMessage('Insira o país.');
            return;
        }

        let model = {
            name: teamName,
            country: country,
        }

        if(!teamKey){
            let key = await firebase.database().ref('app').child('team').push().key;
            await firebase.database().ref('app').child('team').child(key).set(model)
            setMessage(`${teamName} registrado com sucesso.`)
        } else {
            await firebase.database().ref('app').child('team').child(teamKey).set(model);
            setMessage(`${teamName} alterado com sucesso.`)
        }

        clear()
    }

    async function clear(){
        setTextButton('Registrar')
        setTeamKey(null);
        setTeamName('');
        setCountry('');
    }

    function deleteAlert(item){
        Alert.alert(
            'Confirmar exclusão?',
            `${item.name} (${item.country})`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Deletar', onPress: () => deleteItem(item) }
            ],
        );
    }

    async function deleteItem(item){
        await firebase.database().ref('app').child('team').child(item.key).remove();
        setMessage(`${item.name} deletado com sucesso.`)
        clear();
    }

    function insertFieds(item){
        setTextButton('Alterar')
        setTeamKey(item.key);
        setTeamName(item.name);
        setCountry(item.country);
    }

    return (
        <Container>

            <Row cols={[8]} height={400} >
                <List headers={[{
                    title: 'Nome',
                    onPress: () => setTeams(teams.slice().reverse())
                 }, {
                    title: 'País',
                 }]}>
                    { teams.map(item => (
                        <ListColumns   
                            columns={[item.name, item.country]}
                            onLongPress={() => deleteAlert(item)}
                            onPress={() => insertFieds(item) }
                        />
                    ))}
                </List>
            </Row>
           
            <Row cols={[8]}>
                <Input
                    placeholder="Nome" 
                    value={teamName}
                    onChangeText={(text) => setTeamName(text)}
                />
            </Row>

            <Row cols={[8]}>
                    <Select
                        selectedValue={country}   
                        onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
                    >
                        <Option label="Selecione o time" value={null} />
                        { countrys ? countrys.map(country => (<Option label={country.name} value={country.name} />)) : null }
                    </Select>
            </Row>

            <Row cols={[6,2]} >
                <Button text={textButton} onPress={handleSubmit} />
                <Button text="Limpar" color="clean" icon="eraser" onPress={clear}/>
            </Row>

        </Container>
    );    
}