import React from 'react';
import { Picker } from 'react-native';

export default function Option({ ...props }) {
 return (
    <Picker.Item {...props} />
  );
}