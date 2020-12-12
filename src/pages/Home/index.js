import React, { useContext, useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import firebase from '../../services/firebaseConnection';

import { Container, Row, Button} from '../../components'

import { AuthContext } from '../../contexts/auth'

export default function Home() {
  const { user } = useContext(AuthContext);

  const [games, setGames] = useState([]);

  useEffect(() => {
    loadList();
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

  return (
    <Container>
      { games ? games.map(game => (
        <View style={styles.card} key={game.key}>
            <Text style={styles.text}> { game.teamHome} X { game.teamGuest} </Text>
            <Button text="Apostar" />
        </View>
      )) : null }
     
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 170,
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
    fontSize: 20
  }
});
