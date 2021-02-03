import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Card({ children, center }) {
 return (
    <View style={{ justifyContent: center ? 'center' : 'space-between', ...styles.card}}>
       { children }
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
      width: '100%',
      height: '100%',
      marginBottom: 20,
      padding: 7,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 5,
      alignItems: 'center',
    },
  });