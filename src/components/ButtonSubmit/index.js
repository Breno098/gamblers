import React from 'react';
import { TouchableOpacity, Text, StyleSheet,ActivityIndicator } from 'react-native';

export default function ButtonSubmit({ text, onPress, loading}) {
 return (
   <TouchableOpacity 
    onPress={onPress}
    style={ styles.button }>
       { loading ? (<ActivityIndicator size={20} color="#FFF"/>) : (<Text style={ styles.text }> { text } </Text>) }
   </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#09ad00',
    width: '100%',
    height: 45,
    borderRadius: 5,
  }, 

  text: {
    fontSize: 15, 
    color: '#FFF', 
    fontWeight: 'bold'
  }
});