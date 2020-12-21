import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../contexts/auth'

export default function Message() {
  const { message } = useContext( AuthContext );

  return (
    <TouchableOpacity style={ styles.messageArea }>
        <Text style={ styles.text }>
            { message && message }
        </Text>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  messageArea: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '100%',
  }, 

  text: {
    fontSize: 15, 
    color: '#000', 
    fontWeight: 'bold'
  }
});