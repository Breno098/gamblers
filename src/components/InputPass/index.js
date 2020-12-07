import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function InputPass({ ...props }) {

  const [openEye, setOpenEye] = useState(true);

  const handleOpenEye = () => setOpenEye(!openEye);

  return (
    <View style={{ width: '100%', flexDirection: 'row' }}>

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
    marginBottom: 15,
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
    flexDirection: 'column'
  }
});