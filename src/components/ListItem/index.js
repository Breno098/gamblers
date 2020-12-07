import React from 'react';
import { View, StyleSheet, Text} from 'react-native';

export default function ListItem({ text }) {
 return (
   <View style={ styles.item }>
     <Text style={ styles.text }> { text }  </Text>
   </View>
  );
}

const styles = StyleSheet.create({
  item: {
    color: '#FFF',
    width: '100%',
    padding: 10,
    marginBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 5
  }, 

  text: {
    color: '#FFF'
  }
});