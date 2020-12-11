import React from 'react';
import { Image } from 'react-native';

export default function Logo({ ...props }) {
 return (
   <Image style={{
       marginBottom: 15,
       height: 200,
       width: 200
   }}
   { ...props }
   />
  );
}