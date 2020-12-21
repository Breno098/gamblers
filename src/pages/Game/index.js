import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { AppContext } from '../../contexts/app';
import { Container, Button, List, ListColumns, Select, Option, DateInput, Row, Input, InputTime } from '../../components'
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';

export default function Game() {

    const { setMessage } = useContext(AppContext);

    const [teamHome, setTeamHome] = useState(null);
    const [teamGuest, setTeamGuest] = useState(null);
    const [teams, setTeams] = useState([]);

    const [games, setGames] = useState([]);
    const [gameKey, setGameKey] = useState(null);

    const [date, setDate] = useState(format(new Date(), 'dd/MM/yy'));
    const [time, setTime] = useState('00:00');
    const [textButton, setTextButton] = useState('Registrar');

    const [finished, setFinished] = useState(false);
    const [stadium, setStadium] = useState(null);
    const [stadiums, setStadiums] = useState([]);

    useEffect(() => {
        loadList();
        loadListTeam();
        loadListStadiums();
    }, []);

    async function loadList(){
        await firebase.database().ref('app').child('game').orderByChild('date').on('value', (snapshot) => {
                setGames([]);
                snapshot.forEach( childItem => {
                    let list = { 
                        key: childItem.key, 
                        teamHome: {
                            name: childItem.child('teamHome/name').val(),
                            score: childItem.child('teamHome/score').val()
                        }, 
                        teamGuest: {
                            name: childItem.child('teamGuest/name').val(),
                            score: childItem.child('teamGuest/score').val()
                        }, 
                        date: childItem.val().date,
                        time: childItem.val().time,
                        finished: childItem.val().finished,
                        stadium: childItem.val().stadium,
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

    async function loadListStadiums(){
        await firebase.database().ref('app').child('stadium').orderByChild('name').on('value', (snapshot) => {
            setStadiums([]);
            snapshot.forEach( childItem => {
                let list = { name: childItem.val().name };
                setStadiums(oldArray => [...oldArray, list]);
            })
        })
    }

    async function handleSubmit(){
        let model = {
            teamHome: teamHome,
            teamHome: {
                name: teamHome,
                score: '--',
            }, 
            teamGuest: {
                name: teamGuest,
                score: '--',
            }, 
            date: date,
            time: time,
            finished: finished,
            stadium: stadium
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
        setTeamGuest('');
        setTime('');
        setFinished(false);
        setStadium(null);
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
        setTeamHome(game.teamHome.name);
        setTeamGuest(game.teamGuest.name);
        setTime(String(game.time));
        setFinished(game.finished);
        setStadium(game.stadium);
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
                            columns={[
                                `${game.date} (${game.time ?? '--'} - ${game.finished ? 'S' : 'N'}) `, 
                                `(${game.teamHome.score}) ${game.teamHome.name}`, 
                                `(${game.teamGuest.score}) ${game.teamGuest.name}`
                            ]}
                            onLongPress={() => deleteAlert(game)}
                            onPress={() => insertFieds(game) }
                        />
                    ))}
                </List>
            </Row>
           
            <Row cols={[8]}>
                <Select selectedValue={teamHome} onValueChange={(itemValue, itemIndex) => setTeamHome(itemValue)}>
                    <Option label="Time da casa" value={null} />
                    { teams ? teams.map(team => (<Option label={team.name} value={team.name} /> )) : null }
                </Select>
            </Row>

            <Row cols={[8]}>
                <Select selectedValue={teamGuest} onValueChange={(itemValue, itemIndex) => setTeamGuest(itemValue)}>
                    <Option label="Time visitante" value={null} />
                    { teams ? teams.map(team => (<Option label={team.name} value={team.name} /> )) : null }
                </Select>
            </Row>

            <Row cols={[4, 4]}>
                <DateInput
                    date={date}
                    onDateChange={(date) => setDate(date)}
                />
                <InputTime
                    value={time}
                    onChangeText={text => setTime(text)}
                />              
            </Row>

            <Row cols={[4, 4]}>
                <Select selectedValue={finished} onValueChange={(itemValue, itemIndex) => setFinished(itemValue)}>
                    <Option label="Não finalizado" value={false} />
                    <Option label="Finalizado" value={true} />
                </Select>

                <Select selectedValue={stadium} onValueChange={(itemValue, itemIndex) => setStadium(itemValue)}>
                    <Option label="Estádio" value={false} />
                    { stadiums ? stadiums.map(stadium => (<Option label={stadium.name} value={stadium.name} /> )) : null }
                </Select>
            </Row>

            <Row cols={[6,2]}>
                <Button text={textButton} onPress={handleSubmit} />
                <Button text="Limpar" color="clean" icon="eraser" onPress={clear}/>
            </Row>

        </Container>
    );    
}