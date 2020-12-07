import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function Message({ message }) {

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
    width: '90%',
    height: 45,
    marginTop: 10,
    marginBottom: 10,
  }, 

  text: {
    fontSize: 15, 
    color: '#FFF', 
    fontWeight: 'bold'
  }
});