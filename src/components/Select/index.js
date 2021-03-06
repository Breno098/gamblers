import React from 'react';
import { StyleSheet,View, Picker } from 'react-native';

export default function Select({ children, ...props }) {

  return (
    <View style={ styles.select }>
        <Picker { ...props }>
            { children }
        </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  select: {
    width: '100%',
    height: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 3,
  },
});


  
