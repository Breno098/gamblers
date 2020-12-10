import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export default function ListColumns({ columns, ...props}) {
    const width = 100 / columns.length;

    return ( 
        <TouchableWithoutFeedback {...props}>
            <View style={ styles.item }>
                { columns.map( (column) => (
                    <View style={{ width: width + '%' }}>
                        <Text style={ styles.text }> { column }  </Text>
                    </View>
                ))}    
            </View>
        </TouchableWithoutFeedback>
        
    );
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        padding: 10,
        marginBottom: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 5,
        flexDirection: 'row'
    },  

    text: {
        color: 'black',
    }
})