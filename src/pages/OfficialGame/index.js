import React, { useContext, useState, useEffect} from 'react';
import firebase from '../../services/firebaseConnection';
import { StyleSheet, Text } from 'react-native';
import { Container , Row, Button, Select, List, ListColumns, Option } from '../../components';
import { AuthContext } from '../../contexts/auth';

import ScoreService from '../../services/ScoreService'

export default function OfficialGame({ game, onCloseModal }) {
    const { user, setUser } = useContext(AuthContext);

    const [playersHome, setPlayersHome] = useState([]);
    const [playerHome, setPlayerHome] = useState(null);

    const [playersGuest, setPlayersGuest] = useState([]);
    const [playerGuest, setPlayerGuest] = useState(null);

    const [playersGoalsHome, setPlayersGoalsHome] = useState([]);
    const [playersGoalsGuest, setPlayersGoalsGuest] = useState([]);

    useEffect(() => {
        loadGame();
        loadListPlayers();
    }, [game]);

    async function loadListPlayers(){
        await firebase.database().ref('app').child('player').orderByChild('team').equalTo(game.teamHome.name).on('value', (snapshot) => {
            setPlayersHome([]);
            snapshot.forEach( childItem => {
                let list = { 
                    key: childItem.key, 
                    name: childItem.val().name, 
                };
                setPlayersHome(oldArray => [...oldArray, list]);
            })
        });

        await firebase.database().ref('app').child('player').orderByChild('team').equalTo(game.teamGuest.name).on('value', (snapshot) => {
            setPlayersGuest([]);
            snapshot.forEach( childItem => {
                let list = { 
                    key: childItem.key, 
                    name: childItem.val().name, 
                };
                setPlayersGuest(oldArray => [...oldArray, list]);
            })
        })
    } 

    async function loadGame(){

        await firebase.database().ref('app').child('game').child(game.key).on('value', (snapshot) => {
            setPlayersGoalsHome([]);
            snapshot.child('teamHome/goals').forEach( childItem => {
                setPlayersGoalsHome(oldArray => [...oldArray, { 
                    key: childItem.key, 
                    name: childItem.val().name, 
                }]);
            })

            setPlayersGoalsGuest([]);
            snapshot.child('teamGuest/goals').forEach( childItem => {
                setPlayersGoalsGuest(oldArray => [...oldArray, { 
                    key: childItem.key, 
                    name: childItem.val().name, 
                }]);
            })
        });
    } 

    async function handleSubmit(){
        let model = {
            teamHome: {
                name: game.teamHome.name,
                score: playersGoalsHome.length,
                goals: playersGoalsHome
            },
            teamGuest: {
                name: game.teamGuest.name,
                score: playersGoalsGuest.length,
                goals: playersGoalsGuest
            },
            date: game.date,
            time: String(game.time),
            finished: true,
            stadium: game.stadium,
        };

        await firebase.database().ref('app').child('game').child(game.key).set(model);

        const scoreService = new ScoreService(model, game.key);
        await scoreService.init();
        await scoreService.calculateScore();
        await scoreService.save()

        alert('Pontos contabilizados');
        onCloseModal();
    }
    
    function addPlayerHome(){
        if(playerHome){
            setPlayersGoalsHome(oldArray => [...oldArray, playerHome]);
        }
    }

    function addPlayerGuest(){
        if(playerGuest){
            setPlayersGoalsGuest(oldArray => [...oldArray, playerGuest]);
        }
    }

    function deleteGoalHome(goalIndex){
        setPlayersGoalsHome( playersGoalsHome.filter((value, index) => { 
            return index !== goalIndex;
        }));
    }

    async function deleteGoalGuest(goalIndex){
        setPlayersGoalsGuest( playersGoalsGuest.filter((value, index) => { 
            return index !== goalIndex;
        }));
    }

    return (
        <Container menu={false}>
            <Row cols={[6,2]} top={50}>
                <Text style={styles.text}> { game.teamHome.name } </Text>
                <Text style={styles.text}> { playersGoalsHome.length } </Text>
            </Row>
            <Row height={150} cols={[8]}>
                <List>
                    { playersGoalsHome.map((player, index) => (<ListColumns columns={[player.name]} onLongPress={() => deleteGoalHome(index)}/> )) }
                </List>
            </Row>

            <Row cols={[6,2]}>
                <Text style={styles.text}> { game.teamGuest.name } </Text>
                <Text style={styles.text}> { playersGoalsGuest.length } </Text>
            </Row>
            <Row height={150} cols={[8]}>
                <List>
                    { playersGoalsGuest.map((player, index) => (<ListColumns columns={[player.name]} onLongPress={() => deleteGoalGuest(index)}/> )) }
                </List>
            </Row>

            <Row cols={[6,2]} height={50}>
                <Select selectedValue={playerHome} onValueChange={(itemValue, itemIndex) => setPlayerHome(itemValue)}>
                    <Option label={`Jogadores do ${game.teamHome.name}`} value={null} />
                    { playersHome ? playersHome.map(player => (<Option label={player.name} value={player} /> )) : null }
                </Select>
                <Button text="Add" icon="plus" onPress={() => addPlayerHome()}/>
            </Row>

            <Row cols={[6,2]} height={50}>
                <Select selectedValue={playerGuest} onValueChange={(itemValue, itemIndex) => setPlayerGuest(itemValue)}>
                    <Option label={`Jogadores do ${game.teamGuest.name}`} value={null} />
                    { playersGuest ? playersGuest.map(player => (<Option label={player.name} value={player} /> )) : null }
                </Select>
                <Button text="Add" icon="plus" onPress={() => addPlayerGuest()}/>
            </Row>

            <Row cols={[8]}>
                <Button text="Calcular" onPress={handleSubmit} disabled={game.finished || !user.adm}/>
            </Row>

        </Container >
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        textAlign: 'center',
        width: '100%'
    },
 });
  