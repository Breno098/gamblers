import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

export default function List({...props}) {
    return (
        <FlatList 
            nestedScrollEnabled
            style={ styles.main } 
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        marginBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5,
        borderColor: '#ff7213',
        borderWidth: 2,
        backgroundColor: 'rgba(0, 0, 0, 1)',
    }, 
});