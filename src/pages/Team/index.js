import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome';

import Register from './register'

const Tab = createBottomTabNavigator();

const icons = {
    Lista: {
        icon: 'list'
    },
    Registrar: {
        icon: 'pencil'
    }
}

export default function Team(){
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    const { icon } = icons[route.name]
                    return <Icon name={icon} size={size} color={color} />;
                }
            })}

            tabBarOptions={{
                activeTintColor: '#ff7213',
                inactiveTintColor: '#FFF',
                style: {
                    backgroundColor: '#131313',
                    height: 50,
                    paddingBottom: 5,
                    paddingTop: 5,
                },
                showLabel: false,
        }}>
            
            <Tab.Screen name="Registrar" component={Register} />
            {/* <Tab.Screen name="Lista" component={Listing} /> */}
        </Tab.Navigator>
    )
}