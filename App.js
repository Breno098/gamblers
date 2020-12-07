import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';

console.disableYellowBox = true;

import AuthProvider from './src/contexts/auth';
import AppProvider from './src/contexts/app';

import Routes from './src/routes/index';

export default function App() {
 return (
   <NavigationContainer>
      <AuthProvider>
         <AppProvider>
            <StatusBar backgroundColor="#ff7213" barStyle="light-content"/>
            <Routes/>
         </AppProvider>
      </AuthProvider>
   </NavigationContainer>
  );
}