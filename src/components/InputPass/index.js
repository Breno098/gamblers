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
        placeholderTextColor='rgba(0, 0, 0, 0.5)'
        style={ styles.input }/>

      <TouchableOpacity onPress={ handleOpenEye } style={ styles.iconArea }>
        <Icon
          name={ openEye ? 'eye' : 'eye-slash' }
          size={30}
          color="rgba(0, 0, 0, 0.5)"
          style={{ marginBottom: 15, marginLeft: 10 }}
        />
      </TouchableOpacity>
     
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    fontSize: 17,
    color: '#000',
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