import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableHighlight, View , FlatList} from 'react-native';
import { Modal } from '../../components';

export default function Select({ itemPress, items, model }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [textSelect, setTextSelect] = useState(null);

  useEffect(() => {
    function modelChange(){
      setTextSelect(model);
    }

    modelChange();
  }, [model])

  function setSelect(text){
    setTextSelect(text);
    setModalVisible(false);
  }

  return (
    <View>
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
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
        </Modal>

        <TouchableHighlight
          style={styles.fakeInput}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}> { textSelect ?? 'Selecione' } </Text>
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
});


  
