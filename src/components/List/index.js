import React from 'react';
import { FlatList } from 'react-native';

export default function List() {
    return (
        <FlatList style={{
            marginBottom: 20,
            width: '90%',
            paddingLeft: 5,
            paddingRight: 5,
            borderRadius: 5,
            border: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }}/>
    );
}