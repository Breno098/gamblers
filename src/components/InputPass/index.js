import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function InputPass({ ...props }) {

  const [openEye, setOpenEye] = useState(true);

  const handleOpenEye = () => setOpenEye(!openEye);

  return (
    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

      <TextInput 
        { ...props }
        secureTextEntry={openEye}
        placeholderTextColor='rgba(255,255,255,0.50)'
        style={ styles.input }/>

      <TouchableOpacity onPress={ handleOpenEye } style={ styles.iconArea }>
        <Icon
          name={ openEye ? 'eye' : 'eye-slash' }
          size={30}
          color="#FFF"
          style={{ marginBottom: 15, marginLeft: 10 }}
        />
      </TouchableOpacity>
     
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(0,0,0,0.20)',
    fontSize: 17,
    color: '#FFF',
    padding: 10,
    borderRadius: 7,
    borderColor: '#ff7213',
    borderStyle: 'solid',
    borderWidth: 1,
    flex: 80,
  }, 

  iconArea: {
    alignItems: 'center',
    justifyContent: "center",
    flexDirection: 'column',
    marginTop: 10,
    flex: 15
  }
});