import React from 'react';
import { TouchableOpacity, Text, StyleSheet,ActivityIndicator } from 'react-native';

export default function Button({ text, onPress, loading, color, textColor}) {
  const colorBtn = color == 'success' ? '#17e636' : 
                   color == 'danger' ? '#c70000' : 
                   color ? color : '#ff7213';
    
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={{ backgroundColor: colorBtn, ...styles.button} }>
        { loading 
          ? 
          (<ActivityIndicator size={20} color={textColor ?? '#FFF'}/>) 
          : 
          (<Text style={{ color: textColor ?? '#FFF', ...styles.text }}> { text } </Text>) 
        }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 45,
    borderRadius: 7,
  }, 

  text: {
    fontSize: 15, 
    fontWeight: 'bold'
  }
});