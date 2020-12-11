import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { AppContext } from '../../contexts/app';
import { Container, Divisor, Button, Input, List, ListColumns, Select, Option } from '../../components'
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';

export default function Game() {

    const { setMessage } = useContext(AppContext);

    const [teamHome, setTeamHome] = useState(null);
    const [teamGuest, setTeamGuest] = useState(null);
    const [teams, setTeams] = useState([]);

    const [games, setGames] = useState([]);
    const [gameKey, setGameKey] = useState(null);

    const [textButton, setTextButton] = useState('Registrar');

    useEffect(() => {
        loadList();
        loadListTeam();
    }, []);

    async function loadList(){
        await firebase.database().ref('app').child('game').orderByChild('date').on('value', (snapshot) => {
                setGames([]);
                snapshot.forEach( childItem => {
                    let list = { 
                        key: childItem.key, 
                        teamHome: childItem.val().teamHome, 
                        teamGuest: childItem.val().teamGuest,
                        date: childItem.val().date,
                    };
                    setGames(oldArray => [...oldArray, list]);
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

    async function handleSubmit(){
        let model = {
            teamGuest: teamGuest,
            teamHome: teamHome,
            date: format(new Date(), 'dd/MM/yyyy')
        }

        if(!gameKey){
            let key = await firebase.database().ref('app').child('game').push().key;
            await firebase.database().ref('app').child('game').child(key).set(model)
            setMessage(`Jogo de ${teamHome} e ${teamGuest} registrado com sucesso.`)
        } else {
            await firebase.database().ref('app').child('game').child(gameKey).set(model);
            setMessage(`Jogo de ${teamHome} e ${teamGuest} alterado com sucesso.`)
        }

        clear()
    }

    async function clear(){
        setTextButton('Registrar')
        setGameKey(null);
        setTeamHome('');
        setTeamGuest('');
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
        await firebase.database().ref('app').child('game').child(item.key).remove();
        setMessage(`Deletado com sucesso.`)
        clear();
    }

    function insertFieds(game){
        setTextButton('Alterar')
        setGameKey(game.key);
        setTeamHome(game.teamHome);
        setTeamGuest(game.teamGuest);
    }

    return (
        <Container>

            <Divisor row={40}>
                <List headers={[{
                    title: 'Data',
                    onPress: () => {
                        setPlayers(games.slice().reverse());
                    }
                 }, {
                    title: 'Time Casa',
                 }, {
                    title: 'Time Fora',
                 } ]}>
                    { games.map(game => (
                        <ListColumns   
                            columns={[game.teamHome, game.teamGuest, game.date]}
                            onLongPress={() => deleteAlert(game)}
                            onPress={() => insertFieds(game) }
                        />
                    ))}
                </List>
            </Divisor>
           
            <Divisor row={5} top={10} cols={2} >
                    <Select
                        selectedValue={teamHome}   
                        onValueChange={(itemValue, itemIndex) => setTeamHome(itemValue)}
                    >
                        <Option label="Selecione" value={null} />
                        { teams 
                          ? 
                          teams.map(team => (
                            <Option label={team.name} value={team.name} />
                          )) 
                          : 
                          <Option label="Carregando..." value={null} />
                        }
                    </Select>

                    <Select
                        selectedValue={teamGuest}   
                        onValueChange={(itemValue, itemIndex) => setTeamGuest(itemValue)}
                    >
                        <Option label="Selecione" value={null} />
                        { teams 
                          ? 
                          teams.map(team => (
                            <Option label={team.name} value={team.name} />
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