import React, { useContext, useState, useEffect} from 'react';
import firebase from '../../services/firebaseConnection';
import { StyleSheet, Text, Dimensions,  } from 'react-native';
import { Container, Row, Button, Select, List, ListColumns, Option, Card} from '../../components';

import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

export default function OfficialGame({ route }) {
    const { user, setUser } = useContext(AuthContext);
    const navigator = useNavigation();

    const [playersHome, setPlayersHome] = useState([]);
    const [playerHome, setPlayerHome] = useState(null);

    const [playersGuest, setPlayersGuest] = useState([]);
    const [playerGuest, setPlayerGuest] = useState(null);

    const [playersGoalsHome, setPlayersGoalsHome] = useState([]);
    const [playersGoalsGuest, setPlayersGoalsGuest] = useState([]);

    const [status, setStatus] = useState(0);
    const [index, setIndex] = useState(false);

    useEffect(() => {
        loadGame();
        loadListPlayers();
    }, [route.params?.game]);

    async function loadListPlayers(){
        await firebase.database().ref('app').child('player').orderByChild('team').equalTo(route.params?.game.teamHome.name).on('value', (snapshot) => {
            setPlayersHome([]);
            snapshot.forEach( childItem => {
                let list = { 
                    key: childItem.key, 
                    name: childItem.val().name, 
                };
                setPlayersHome(oldArray => [...oldArray, list]);
            })
        });

        await firebase.database().ref('app').child('player').orderByChild('team').equalTo(route.params?.game.teamGuest.name).on('value', (snapshot) => {
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

        await firebase.database().ref('app').child('game').child(route.params?.game.key).on('value', (snapshot) => {
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
                name: route.params?.game.teamHome.name,
                score: playersGoalsHome.length,
                goals: playersGoalsHome
            },
            teamGuest: {
                name: route.params?.game.teamGuest.name,
                score: playersGoalsGuest.length,
                goals: playersGoalsGuest
            },
            date: route.params?.game.date,
            time: String(route.params?.game.time),
            finished: true,
            stadium: route.params?.game.stadium,
        };

        await firebase.database().ref('app').child('game').child(route.params?.game.key).set(model);

        await firebase.database().ref('app').child('bet').on('value', (snapshot) => {

            snapshot.forEach(async childItem => {

                let compare = childItem.child(route.params?.game.key);

                if(compare.exists())
                {
                    let refUser = await firebase.database().ref('users');

                    await scoreAdd(compare, refUser, childItem.key);

                    await scoreGoals(compare, refUser, childItem.key);
                }
            })
        })

        alert('Pontos contabilizados');

        navigator.navigate('OfficialGames')
    }
    
    async function scoreAdd(compare, refUser, uidUser){
        let goalsHome = compare.child('teamHome/score').val();
        let goalsGuest = compare.child('teamGuest/score').val();

        if( goalsHome === playersGoalsHome.length && goalsGuest === playersGoalsGuest.length ){
            await refUser.child(uidUser).once('value').then(snapshot => {
                let userModel = { 
                    name: snapshot.child('name').val(), 
                    score: snapshot.child('score').val() + 3
                };
                
                refUser.child(uidUser).set(userModel);

                if(uidUser === user.uid){
                    setUser({ email: user.email, uid: user.uid, ...userModel });
                }
            });
        }
    }

    async function scoreGoals(compare, refUser, uidUser){
        var playersGoalsHomeClone = [ ...playersGoalsHome ];
        var playersGoalsGuestClone = [ ...playersGoalsGuest ];
        var scoreAdd = 0;

        compare.child('teamHome/goals').forEach(goal => {
            let indexWhile = 0;
            let statusWhile = true;

            while (statusWhile && playersGoalsHomeClone.length > indexWhile) {
                if(playersGoalsHomeClone[indexWhile].name === goal.child('name').val()){
                    statusWhile = false;
                    scoreAdd = scoreAdd + 1.5;
                    playersGoalsHomeClone = arrayRemove(playersGoalsHomeClone, indexWhile);
                } else {
                    indexWhile++;
                }
            }
        })

        compare.child('teamGuest/goals').forEach(goal => {
            let indexWhile = 0;
            let statusWhile = true;

            while (statusWhile && playersGoalsGuestClone.length > indexWhile) {
                if(playersGoalsGuestClone[indexWhile].name === goal.child('name').val()){
                    statusWhile = false;
                    scoreAdd = scoreAdd + 1.5;
                    playersGoalsGuestClone = arrayRemove(playersGoalsGuestClone, indexWhile);
                } else {
                    indexWhile++;
                }
            }
        })

        await refUser.child(uidUser).once('value').then(snapshot => {
            let userModel = { 
                name: snapshot.child('name').val(), 
                score: snapshot.child('score').val() + scoreAdd
            };
            
            refUser.child(uidUser).set(userModel);

            if(uidUser === user.uid){
                setUser({ email: user.email, uid: user.uid, ...userModel });
            }
        });
    }

    function arrayRemove(arr, index) { 
        delete arr[index];

        return arr.filter((item) =>{ 
            return item && typeof item !== 'undefined'; 
        });
    }

    function addPlayerHome(){
        setPlayersGoalsHome(oldArray => [...oldArray, playerHome]);
    }

    function addPlayerGuest(){
        setPlayersGoalsGuest(oldArray => [...oldArray, playerGuest]);
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
        <Container>
            <Row cols={[6,2]}>
                <Text style={styles.text}> { route.params?.game.teamHome.name } </Text>
                <Text style={styles.text}> { playersGoalsHome.length } </Text>
            </Row>
            <Row height={150} cols={[8]}>
                <List>
                    { playersGoalsHome.map((player, index) => (<ListColumns columns={[player.name]} onLongPress={() => deleteGoalHome(index)}/> )) }
                </List>
            </Row>

            <Row cols={[6,2]}>
                <Text style={styles.text}> { route.params?.game.teamGuest.name } </Text>
                <Text style={styles.text}> { playersGoalsGuest.length } </Text>
            </Row>
            <Row height={150} cols={[8]}>
                <List>
                    { playersGoalsGuest.map((player, index) => (<ListColumns columns={[player.name]} onLongPress={() => deleteGoalGuest(index)}/> )) }
                </List>
            </Row>

            <Row cols={[6,2]} height={50}>
                <Select selectedValue={playerHome} onValueChange={(itemValue, itemIndex) => setPlayerHome(itemValue)}>
                    <Option label={`Jogadores do ${route.params?.game.teamHome.name}`} value={null} />
                    { playersHome ? playersHome.map(player => (<Option label={player.name} value={player} /> )) : null }
                </Select>
                <Button text="Add" icon="plus" onPress={() => addPlayerHome()}/>
            </Row>

            <Row cols={[6,2]} height={50}>
                <Select selectedValue={playerGuest} onValueChange={(itemValue, itemIndex) => setPlayerGuest(itemValue)}>
                    <Option label={`Jogadores do ${route.params?.game.teamGuest.name}`} value={null} />
                    { playersGuest ? playersGuest.map(player => (<Option label={player.name} value={player} /> )) : null }
                </Select>
                <Button text="Add" icon="plus" onPress={() => addPlayerGuest()}/>
            </Row>

            <Row cols={[8]}>
                <Button text="Calcular" onPress={handleSubmit}/>
            </Row>

        </Container>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        textAlign: 'center',
        width: '100%'
    },
 });
  