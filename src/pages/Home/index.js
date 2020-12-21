import React, { useContext, useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import firebase from '../../services/firebaseConnection';
import { useNavigation } from '@react-navigation/native';

import { Container, Row, Button, Card} from '../../components';
import { AuthContext } from '../../contexts/auth';

export default function Home() {
  const navigator = useNavigation();
  const { user } = useContext(AuthContext);

  const [games, setGames] = useState([]);
  const [statusBet, setStatusBet] = useState([])

  useEffect(() => {
    loadList();
  }, []);

  async function loadList(){
    let uid = user.uid;

    await firebase.database().ref('app').child('bet').child(uid).on('value', (snapshot) => {
      setStatusBet([])
      snapshot.forEach(childItem => {
        setStatusBet(oldArray => [...oldArray, { key: childItem.key }]);
      });
    });

    await firebase.database()
      .ref('app').child('game').orderByChild('finished').equalTo(false).on('value', (snapshot) => {
      setGames([]);

      snapshot.forEach( childItem => {
        let images = { 
          home: childItem.child('teamGuest/image').val()
        };

        let list = { 
            key: childItem.key, 
            teamHome: {
                name: childItem.child('teamHome/name').val(),
                score: childItem.child('teamHome/score').val(),
            }, 
            teamGuest: {
                name: childItem.child('teamGuest/name').val(),
                score: childItem.child('teamGuest/score').val(),
                //link_image: require(game.teamGuest.link_image)
            }, 
            date: childItem.val().date,
            time: childItem.val().time,
            stadium: childItem.val().stadium,
        };
        setGames(oldArray => [...oldArray, list]);
      })
    })
  } 

  return (
    <Container>
      { games ? games.map(game => (
        <Row cols={[8]} height={200}>
          <Card>
              <Row cols={[3, 2, 3]} height={5}>
                  <Text style={{textAlign: 'center', ...styles.text}}> { game.teamHome.name} </Text>
                  <Text style={{textAlign: 'center', ...styles.text}}> X </Text>
                  <Text style={{textAlign: 'center', ...styles.text}}> { game.teamGuest.name} </Text>
              </Row>

              <Row cols={[8]} height={5}>
                <Text style={styles.text}> Data: { game.date } { game.time }</Text>
              </Row>

              <Row cols={[8]} height={5}>
                <Text style={styles.text}> Local: { game.stadium }</Text>
              </Row>

              <Row cols={[6, 2]}>
                <Button text="Apostar" onPress={() => navigator.navigate('Bet', { game })}/>
                <Card center={true}>
                  <Text style={styles.status}> 
                    { statusBet.filter(value => (value.key == game.key)).length ? 'Apostado' : '--' } 
                  </Text>
                </Card>
              </Row>
              
          </Card>
        </Row>
      )) : null }
     
    </Container>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    width: '100%'
  },

  status: {
    fontSize: 12,
    textAlign: 'center',
    width: '100%'
  }
});
