import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { AppContext } from '../../contexts/app';
import { Container, Button, List, ListColumns, Select, Option, DateInput, Row, Input, InputTime } from '../../components'
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';



export default function Game() {

    const { setMessage } = useContext(AppContext);

    const [teamHome, setTeamHome] = useState(null);
    const [scoreHome, setScoreHome] = useState(null);
    const [teamGuest, setTeamGuest] = useState(null);
    const [scoreGuest, setScoreGuest] = useState(null);
    const [teams, setTeams] = useState([]);

    const [games, setGames] = useState([]);
    const [gameKey, setGameKey] = useState(null);

    const [date, setDate] = useState(format(new Date(), 'dd/MM/yyyy'));
    const [hourGame, setHourGame] = useState(null);
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
                        scoreHome: childItem.val().scoreHome,
                        formatHome: `(${childItem.val().scoreHome}) ${childItem.val().teamHome}`,
                        teamGuest: childItem.val().teamGuest,
                        scoreGuest: childItem.val().scoreGuest,
                        formatGuest: `(${childItem.val().scoreGuest}) ${childItem.val().teamGuest}`,
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
            teamHome: teamHome,
            scoreHome: scoreHome ?? '--',
            teamGuest: teamGuest,
            scoreGuest: scoreGuest ?? '--',
            date: date
        }

        if(!gameKey){
            let key = await firebase.database().ref('app').child('game').push().key;
            await firebase.database().ref('app').child('game').child(key).set(model)
            setMessage(`${teamHome} e ${teamGuest} registrado com sucesso.`)
        } else {
            await firebase.database().ref('app').child('game').child(gameKey).set(model);
            setMessage(`${teamHome} e ${teamGuest} alterado com sucesso.`)
        }

        clear()
    }

    async function clear(){
        setTextButton('Registrar')
        setGameKey(null);
        setTeamHome('');
        setScoreHome(null);
        setTeamGuest('');
        setScoreGuest(null);
    }

    function deleteAlert(item){
        Alert.alert(
            'Confirmar exclusão?',
            `${teamHome} x ${teamGuest}`,
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
        setScoreHome(game.scoreHome);
        setTeamGuest(game.teamGuest);
        setScoreGuest(game.scoreGuest);
    }

    return (
        <Container>

            <Row height={400} cols={[8]}>
                <List headers={[{
                    title: 'Data', onPress: () => setGames(games.slice().reverse())
                }, {
                    title: 'Time Casa',
                }, {
                    title: 'Time Visitante',
                }]}>
                    { games.map(game => (
                        <ListColumns   
                            columns={[game.date, game.formatHome, game.formatGuest]}
                            onLongPress={() => deleteAlert(game)}
                            onPress={() => insertFieds(game) }
                        />
                    ))}
                </List>
            </Row>
           
            <Row cols={[6,2]}>
                <Select selectedValue={teamHome} onValueChange={(itemValue, itemIndex) => setTeamHome(itemValue)}>
                    <Option label="Time da casa" value={null} />
                    { teams ? teams.map(team => (<Option label={team.name} value={team.name} /> )) : null }
                </Select>

                <Input
                    placeholder="Placar" 
                    value={scoreHome}
                    onChangeText={(text) => setScoreHome(text)}
                    keyboardType="numeric"
                />

            </Row>

            <Row cols={[6,2]}>
                <Select selectedValue={teamGuest} onValueChange={(itemValue, itemIndex) => setTeamGuest(itemValue)}>
                    <Option label="Time visitante" value={null} />
                    { teams ? teams.map(team => (<Option label={team.name} value={team.name} /> )) : null }
                </Select>

                <Input
                    placeholder="Placar" 
                    value={scoreGuest}
                    onChangeText={(text) => setScoreGuest(text)}
                    keyboardType="numeric"
                />

            </Row>

            <Row top={10} cols={[4, 4]}>
                <DateInput
                    date={date}
                    onDateChange={(date) => setDate(date)}
                />
                <InputTime
                    value={hourGame}
                    onChangeText={text => setHourGame(text)}
                />              
            </Row>

            <Row cols={[6,2]}>
                <Button text={textButton} onPress={handleSubmit} />
                <Button text="Limpar" color="clean" icon="eraser" onPress={clear}/>
            </Row>

        </Container>
    );    
}