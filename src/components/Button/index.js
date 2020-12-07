import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function ButtonSubmit({ text }) {
 return (
   <TouchableOpacity style={{
       alignItems: 'center',
       justifyContent: 'center',
       backgroundColor: '#ff7213',
       width: '90%',
       height: 45,
       borderRadius: 7,
       marginTop: 10
   }}>
       <Text style={{ fontSize: 25, color: '#FFF', fontWeight: 'bold'}}> 
            { text && text }
       </Text>
   </TouchableOpacity>
  );
}