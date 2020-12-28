import React, { useState, useEffect} from 'react';
import { Modal, StyleSheet, Text } from 'react-native';
import firebase from '../../services/firebaseConnection';
import OfficialGame from '../OfficialGame';

import { Container, Row, Button, Card} from '../../components';

export default function OfficialGames() {
  const [games, setGames] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [atualGame, setAtualGame] = useState(null);

  useEffect(() => {
    loadList();
  }, []);

  async function loadList(){
    await firebase.database().ref('app').child('game').orderByChild('date').on('value', (snapshot) => {
      setGames([]);

      snapshot.forEach( childItem => {
        let list = { 
            key: childItem.key, 
            teamHome: {
                name: childItem.child('teamHome/name').val(),
            }, 
            teamGuest: {
                name: childItem.child('teamGuest/name').val(),
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

  return (
    <Container>
      <Modal 
        transparent={false}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <OfficialGame game={atualGame} onCloseModal={() =>setModalVisible(false)}/>
      </Modal>

      <Row cols={[8]}>
        <Text style={{textAlign: 'center', ...styles.text}}> Calcular Apostas </Text>
      </Row>
      { games ? games.map(game => (
        <Row cols={[8]} height={200} key={game.key}>
          <Card>
             <Row cols={[3,2,3]} height={5}>
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
                <Button text="Calcular pontos" onPress={() => {
                   setAtualGame(game);
                   setModalVisible(true);
                }}/>
                <Card center={true}>
                  <Text style={styles.status}> 
                    { game.finished ? 'Finalizado' : 'Aberto' }
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
