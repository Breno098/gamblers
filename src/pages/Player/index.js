import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { AppContext } from '../../contexts/app';
import { Container, Row, Button, Input, List, ListColumns, Select, Option } from '../../components'
import firebase from '../../services/firebaseConnection';

export default function Player() {

    const { setMessage } = useContext(AppContext);

    const [playerName, setPlayerName] = useState('');
    const [playerKey, setPlayerKey] = useState(null);
    const [players, setPlayers] = useState([]);
    
    const [team, setTeam] = useState(null);
    const [teams, setTeams] = useState([]);

    const [country, setCountry] = useState(null);
    const [countrys, setCountrys] = useState([]);

    const [textButton, setTextButton] = useState('Registrar');

    useEffect(() => {
        loadList();
        loadListCountry();
        loadListTeam();
    }, []);

    async function loadList(){
        await firebase.database().ref('app').child('player').orderByChild('name').on('value', (snapshot) => {
                setPlayers([]);
                snapshot.forEach( childItem => {
                    let list = { key: childItem.key, name: childItem.val().name, team: childItem.val().team, country: childItem.val().country };
                    setPlayers(oldArray => [...oldArray, list]);
                })
            })
    }

    async function loadListTeam(){
        await firebase.database().ref('app').child('team').orderByChild('name').on('value', (snapshot) => {
                setTeams([]);
                snapshot.forEach( childItem => {
                    let list = { name: childItem.val().name };
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
        if(!playerName){
            setMessage('Insira o nome.');
            return;
        }

        if(!team){
            setMessage('Insira o time.');
            return;
        }

        if(!country){
            setMessage('Insira o país.');
            return;
        }


        let model = {
            name: playerName,
            team: team,
            country: country
        }

        if(!playerKey){
            let key = await firebase.database().ref('app').child('player').push().key;
            await firebase.database().ref('app').child('player').child(key).set(model)
            setMessage(`${playerName} registrado com sucesso.`)
        } else {
            await firebase.database().ref('app').child('player').child(playerKey).set(model);
            setMessage(`${playerName} alterado com sucesso.`)
        }

        clear()
    }

    async function clear(){
        setTextButton('Registrar')
        setPlayerKey(null);
        setPlayerName('');
        setTeam('');
        setCountry('');
    }

    function deleteAlert(item){
        Alert.alert(
            'Confirmar exclusão?',
            `${item.name} (${item.team})`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Deletar', onPress: () => deleteItem(item) }
            ],
        );
    }

    async function deleteItem(item){
        await firebase.database().ref('app').child('player').child(item.key).remove();
        setMessage(`${item.name} deletado com sucesso.`)
        clear();
    }

    function insertFieds(player){
        setTextButton('Alterar')
        setPlayerKey(player.key);
        setPlayerName(player.name);
        setTeam(player.team);
        setCountry(player.country);
    }

    return (
        <Container>

            <Row height={400} cols={[8]}>
                <List headers={[{
                    title: 'Nome',
                    onPress: () => {
                        setPlayers(players.slice().reverse());
                    }
                 }, {
                    title: 'Time',
                 }, {
                    title: 'País',
                 }]}>
                    { players.map(player => (
                        <ListColumns   
                            columns={[player.name, player.team, player.country]}
                            onLongPress={() => deleteAlert(player)}
                            onPress={() => insertFieds(player) }
                        />
                    ))}
                </List>
            </Row>
           
            <Row cols={[8]}>
                <Input
                    placeholder="Nome" 
                    value={playerName}
                    onChangeText={(text) => setPlayerName(text)}
                />
            </Row>

            <Row cols={[8]}>
                    <Select
                        selectedValue={team}   
                        onValueChange={(itemValue, itemIndex) => setTeam(itemValue)}
                    >
                        <Option label="Selecione o time" value={null} />
                        { teams ? teams.map(team => (<Option label={team.name} value={team.name} />)) : null }
                    </Select>
            </Row>

            <Row cols={[8]}>
                    <Select
                        selectedValue={country}   
                        onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
                    >
                        <Option label="Selecione o país" value={null} />
                        { countrys ? countrys.map(country => (<Option label={country.name} value={country.name} />)) : null }
                    </Select>
            </Row>

            <Row cols={[6, 2]} >
                <Button text={textButton} onPress={handleSubmit} />
                <Button text="Limpar" color="clean" icon="eraser" onPress={clear}/>
            </Row>

        </Container>
    );    
}