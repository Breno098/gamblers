import React from 'react';
import { TextInput } from 'react-native';

export default function Input({ ...props }) {
 return (
   <TextInput 
    { ...props }
    placeholderTextColor='rgba(255,255,255,0.50)'
    style={{
        backgroundColor: 'rgba(0,0,0,0.20)',
        fontSize: 17,
        color: '#FFF',
        marginBottom: 15,
        padding: 10,
        borderRadius: 7,
        borderColor: '#ff7213',
        borderStyle: 'solid',
        borderWidth: 1,
        width: '100%',
    }}>

   </TextInput>
  );
}