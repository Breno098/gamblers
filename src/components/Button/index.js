import React from 'react';
import { TouchableOpacity, Text, StyleSheet,ActivityIndicator, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Button({ text, onPress, loading, color, icon, textColor}) {
  const colorBtn = color == 'success' ? '#17e636' : 
                   color == 'danger' ? '#c70000' : 
                   color == 'clean' ? '#FFF' :
                   color ? color : '#ff7213';

  const textColorBtn = color == 'clean' ? '#000' : 
                       textColor ? textColor : '#FFF';
    
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={{ backgroundColor: colorBtn, ...styles.button} }>
        { loading 
          ? 
          (<ActivityIndicator size={20} color={textColorBtn}/>) 
          : 
          (
            <View style={ styles.btn }>
              <Text style={{ color: textColorBtn ?? '#FFF', ...styles.text }}> { text } </Text>
              {
                  icon 
                  ? 
                  <Icon name={icon} size={15} color={textColorBtn} style={{ marginLeft: 5 }}/>
                  :
                  null
              }
            </View>
          ) 
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
  },
  
  btn: {
    flexDirection: "row", 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});