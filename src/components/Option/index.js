import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text} from 'react-native';

export default function Option({text, onPress}) {
 return (
    <View style={styles.items} >
        <TouchableHighlight onPress={onPress} style={styles.itemPress}>
            <Text style={styles.textItem}> {text} </Text>
        </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
    items: {
        width: '100%',
        backgroundColor: '#131313',
        alignItems: 'center'
    },
    itemPress: {
        width: '90%',
        padding: 13,
        borderBottomColor: '#ff7213',
        borderBottomWidth: 0.3,
    },
    textItem: {
        width: '100%',
        fontSize: 17,
        textAlign: 'center',
        color: "#ff7213",
      },
})