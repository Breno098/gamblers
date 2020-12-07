import React from 'react';
import { TouchableOpacity, Text, StyleSheet,ActivityIndicator } from 'react-native';

export default function Button({ text, onPress, loading}) {
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
    backgroundColor: '#ff7213',
    width: '100%',
    height: 45,
    borderRadius: 7,
    marginTop: 10
  }, 

  text: {
    fontSize: 15, 
    color: '#FFF', 
    fontWeight: 'bold'
  }
});