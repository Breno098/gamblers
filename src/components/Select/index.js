import React, { useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableHighlight, View , FlatList} from 'react-native';

export default function Select({ itemPress, items }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [textSelect, setTextSelect] = useState('');

  function setSelect(text){
    setTextSelect(text);
    setModalVisible(false);
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setSelect('')
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            { items.length === 0 
              ? 
              <ActivityIndicator size="large" color="#ff7213"/> 
              :  
              <FlatList
                style={styles.scroll}
                data={items}
                keyExtractor={(item) => item.id }
                renderItem={({item}) => (
                  <TouchableHighlight style={styles.items} onPress={() => {
                    setSelect(item.text);
                    itemPress(item.value);
                  }}>
                    <View style={styles.itemPress}>
                      <Text style={styles.textItem}> { item.text } </Text>
                    </View>
                  </TouchableHighlight>
                )}
              />
            }
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.fakeInput}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}> { textSelect != '' ? textSelect : 'Selecione' } </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    borderWidth: 1,
    height: '100%'
  },
  items: {
    width: '100%',
    alignItems: 'center'
  },
  itemPress: {
    width: '90%',
    padding: 13,
    borderBottomColor: '#ff7213',
    borderBottomWidth: 0.3,
  },
  textItem: {
    width: '100%',
    fontSize: 17,
    textAlign: 'center',
    color: "#ff7213",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%'
  },
  modalView: {
    width: '87%',
    height: 200,
    backgroundColor: 'rgba(0,0,0,0.92)',
    borderColor: '#ff7213',
    borderWidth: 1,
    borderRadius: 7,
    padding: 3,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  fakeInput: {
    backgroundColor: 'rgba(0,0,0,0.50)',
    padding: 10,
    height: 50,
    borderRadius: 7,
    borderColor: '#ff7213',
    borderWidth: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  textStyle: {
    color: "rgba(255,255,255,0.50)",
    fontWeight: "bold",
    fontSize: 17,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});


  
