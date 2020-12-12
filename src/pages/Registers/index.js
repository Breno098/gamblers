import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text} from 'react-native';

import Team from './team';
import Country from './country';
import Player from './player';
import Game from './game';

const Tab = createBottomTabNavigator();

const icons = {
    Team: {
        label: 'Time',
        icon: 'users'
    },
    Country : {
        label: 'País',
        icon: 'globe'
    },
    Player : {
        label: 'Jogador',
        icon: 'user'
    },
    Game: {
        label: 'Jogos',
        icon: 'futbol-o'
    }
}

export default function Registers(){
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    const { icon, label } = icons[route.name]
                    return (
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={icon} size={size} color={color} />
                        <Text style={{ fontSize: 11,  }}> { label } </Text>
                    </View>)
                }
            })}

            tabBarOptions={{
                activeTintColor: '#09ad00',
                inactiveTintColor: 'black',
                style: {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    height: 50,
                    paddingBottom: 5,
                    paddingTop: 5,
                },
                showLabel: false,
        }}>
            <Tab.Screen name="Game"  component={Game}/>
            <Tab.Screen name="Country" component={Country}/>
            <Tab.Screen name="Team"    component={Team}/>
            <Tab.Screen name="Player"  component={Player}/>
        </Tab.Navigator>
    )
}