import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function TextLink({ text, ...props }) {
 return (
   <TouchableOpacity { ...props} style={{ marginTop: 5, marginBottom: 9 }}>
       <Text style={{ marginTop: 15, color: '#ff7213' }}>
           { text && text }
       </Text>
   </TouchableOpacity>
  );
}