import React, { useState, useEffect } from 'react';
import { Container, Row, List, ListColumns } from '../../components';
import { View, StyleSheet, ScrollView, Text, Image, Dimensions } from 'react-native';
import firebase from '../../services/firebaseConnection';

export default function Ranking() {

    const [users, setUsers] = useState([]);
    const [usersRanking, setUsersRanking] = useState([]);

    useEffect(() => {
        loadList();
    }, []);

    async function loadList(){
        await firebase.database().ref('users').orderByChild('score').on('value', (snapshot) => {
                setUsers([]);
                snapshot.forEach( childItem => {
                    let list = { key: childItem.key, name: childItem.val().name, score: childItem.val().score };
                    setUsers(oldArray => [...oldArray, list]);
                })
            })
    }

    return (
        <Container>

            <Row cols={[8]} height={200}>
                <View style={{  width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row' }}>
                  
                    <View style={{ width: '33%', height: '100%', marginRight: 5, justifyContent: 'flex-end' }}>
                        <Text style={{ textAlign: 'center', marginBottom: 5 }}>
                            { typeof users[ users.length - 3 ] !== 'undefined' ? users[ users.length - 3 ].name : '--' }
                        </Text>
                        <View style={{ width: '100%', height: '30%', backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', marginBottom: 5 }}>
                                { typeof users[ users.length - 3 ] !== 'undefined' ? users[ users.length - 3 ].score : '--' }
                            </Text>
                        </View>
                    </View>

                    <View style={{ width: '33%', height: '100%', marginRight: 5, justifyContent: 'flex-end' }}>
                        <Text style={{ textAlign: 'center', marginBottom: 5, fontSize: 25  }}>
                            { typeof users[ users.length - 1 ] !== 'undefined' ? users[ users.length - 1 ].name : '--' }
                        </Text>
                        <View style={{ width: '100%', height: '80%', backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', marginBottom: 5 }}>
                                { typeof users[ users.length - 1 ] !== 'undefined' ? users[ users.length - 1 ].score : '--' }
                            </Text>
                        </View>
                    </View>

                    <View style={{ width: '33%', height: '100%', justifyContent: 'flex-end' }}>
                        <Text style={{ textAlign: 'center', marginBottom: 5  }}>
                            { typeof users[ users.length - 2 ] !== 'undefined' ? users[ users.length - 2 ].name : '--' }
                        </Text>
                        <View style={{ width: '100%', height: '50%', backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', marginBottom: 5 }}>
                            { typeof users[ users.length - 2 ] !== 'undefined' ? users[ users.length - 2 ].score : '--' }
                            </Text>
                        </View>
                    </View>

                </View>
            </Row>

            <Row cols={[8]} height={300} >
                <List headers={[{
                    title: 'Nome',
                 }, {
                    title: 'Pontos',
                 }]}>
                    { users.map(user => (
                        <ListColumns   
                            columns={[user.name, user.score]}
                        />
                    ))}
                </List>
            </Row>
           
        </Container>
    );    
}