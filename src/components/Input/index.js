import React from 'react';
import { TextInput } from 'react-native';

export default function Input({ ...props }) {
 return (
   <TextInput 
    { ...props }
    placeholderTextColor='rgba(0, 0, 0, 0.5)'
    style={{
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        fontSize: 17,
        color: '#000',
        height: 45,
        padding: 10,
        borderRadius: 7,
        borderColor: '#09ad00',
        borderStyle: 'solid',
        borderWidth: 1,
        width: '100%',
    }}/>
  );
}