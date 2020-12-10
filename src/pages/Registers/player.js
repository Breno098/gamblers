import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { AppContext } from '../../contexts/app';
import { Container, Divisor, Button, Input, List, ListColumns, Select, Option } from '../../components'
import firebase from '../../services/firebaseConnection';

export default function Player() {

    const { setMessage } = useContext(AppContext);

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
        await firebase.database()
            .ref('app')
            .child('team')
            .orderByChild('name')
            .on('value', (snapshot) => {
                setTeams([]);
                snapshot.forEach( childItem => {
                    let list = { key: childItem.key, name: childItem.val().name, country: childItem.val().country };
                    setTeams(oldArray => [...oldArray, list]);
                })
            })
    }

    async function loadListCountry(){
        await firebase.database()
            .ref('app')
            .child('country')
            .orderByChild('name')
            .on('value', (snapshot) => {
                setCountrys([]);
                snapshot.forEach( childItem => {
                    let list = { key: childItem.key, name: childItem.val().name };
                    setCountrys(oldArray => [...oldArray, list]);
                })
            })
    }

    async function handleSubmit(){
        if(!teamKey){

            let key = await firebase.database().ref('app').child('team').push().key;
            await firebase.database().ref('app').child('team').child(key).set({
                name: teamName,
                country: country,
            })

            setMessage(`${teamName} registrado com sucesso.`)

        } else {

            await firebase.database().ref('app').child('team').child(teamKey).set({
                name: teamName,
                country: country
            });

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
            ' ',
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

            <Divisor row={40}>
                <List headers={[{
                    title: 'Nome',
                    onPress: () => {
                        setTeams(teams.slice().reverse());
                    }
                 }, {
                    title: 'País',
                 }]}>
                    { teams.map(item => (
                        <ListColumns   
                            key={item.key}
                            columns={[item.name, item.country]}
                            onLongPress={() => deleteAlert(item)}
                            onPress={() => insertFieds(item) }
                            // delayLongPress={1000}
                        />
                    ))}
                </List>
            </Divisor>
           
            <Divisor row={5} top={10}>
                <Input
                    placeholder="Nome" 
                    value={teamName}
                    onChangeText={(text) => setTeamName(text)}
                />
            </Divisor>

            <Divisor row={5} top={10}>
                    <Select
                        selectedValue={country}   
                        onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
                    >
                        <Option label="Selecione" value={null} />
                        { countrys 
                          ? 
                          countrys.map(country => (
                            <Option label={country.name} value={country.name} />
                          )) 
                          : 
                          <Option label="Carregando..." value={null} />
                        }
                    </Select>
            </Divisor>

            <Divisor row={5} top={10} cols={2} >
                <Button text={textButton} onPress={handleSubmit} />
                <Button text="Limpar" color="clean" icon="eraser" onPress={clear}/>
            </Divisor>

        </Container>
    );    
}