import React, { useContext, useState, useEffect} from 'react';
import firebase from '../../services/firebaseConnection';
import { StyleSheet, Text, Dimensions,  } from 'react-native';
import { Container, Row, Button, Select, List, ListColumns, Option, Card} from '../../components';

import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

export default function Bet({ game, onCloseModal }) {
    const { user } = useContext(AuthContext);
    const navigator = useNavigation();

    const [playersHome, setPlayersHome] = useState([]);
    const [playerHome, setPlayerHome] = useState(null);

    const [playersGuest, setPlayersGuest] = useState([]);
    const [playerGuest, setPlayerGuest] = useState(null);

    const [playersGoalsHome, setPlayersGoalsHome] = useState([]);
    const [playersGoalsGuest, setPlayersGoalsGuest] = useState([]);

    useEffect(() => {
        loadBet();
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

    async function loadBet(){
        let uid = user.uid;

        await firebase.database().ref('app').child('bet').child(uid).child(game.key).on('value', (snapshot) => {
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
        let uid = user.uid;

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
            }
        };

        await firebase.database().ref('app').child('bet').child(uid).child(game.key).set(model);

        alert('Apostado');
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
            <Row cols={[8]} height={70} top={50}>
                <Card>
                    <Row cols={[8]} height={5} top={0} bottom={0}>
                        <Text style={styles.textCard}> Informações </Text>
                    </Row>
                    <Row cols={[4,4]} height={5} top={0} bottom={20}>
                        <Text style={styles.textCard}> { game.date}</Text>
                        <Text style={styles.textCard}> { game.time}</Text>
                    </Row>
                </Card>
            </Row>

            <Row cols={[6,2]}>
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
                <Button text="Apostar" onPress={handleSubmit}/>
            </Row>

        </Container>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: Dimensions.get('window').height - 90,
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 7,
        borderColor: '#09ad00',
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
  
    text: {
        fontSize: 30,
        textAlign: 'center',
        width: '100%'
    },

    textCard: {
        fontSize: 15,
        textAlign: 'center',
        width: '100%'
    }
  });
  