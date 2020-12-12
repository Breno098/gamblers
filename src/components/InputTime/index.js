import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function InputTime({ ...props }) {
 return (
    <View style={styles.fakeInput}>
      <TextInputMask
        { ...props }
        type={'datetime'}
        options={{
          format: 'HH:mm',
        }}
        style={{
          fontSize: 17,
          color: '#000',
          height: 43,
          width: '80%',
          textAlign: 'center'
      }}/>
      <Icon name="clock-o" color="#000" size={28} style={{ marginRight: 5 }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  fakeInput: {
    width: '100%',
     borderColor: '#09ad00',  
     borderWidth: 1, 
     borderRadius: 5, 
     backgroundColor: 'rgba(0, 0, 0, 0.1)', 
     flexDirection: 'row', 
     alignItems: 'center'
  }, 
});