import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawer } from '../components'

import Home from '../pages/Home';
import Country from '../pages/Country';
import Registers from '../pages/Registers';

const AppDrawer = createDrawerNavigator();

function AppRoutes(){
    return(
    <AppDrawer.Navigator
        drawerContent={ (props) => <CustomDrawer {...props}/> }
        drawerStyle={{
            backgroundColor: 'rgba(255, 255, 255, 1)'
        }}
        drawerContentOptions={{
            labelStyle: {
                fontWeight: 'bold',
            },
            activeTintColor: '#000',
            activeBackgroundColor: '#ff7213',
            inactiveTintColor: '#000',
            inactiveBackgroundColor: 'rgba(0, 0, 0, 0.1)',
            itemStyle: {
                marginVertical: 2
            }
        }}
    >
        <AppDrawer.Screen name="Registrar" component={Registers}/>
        {/* <AppDrawer.Screen name="Países" component={Country}/> */}
        <AppDrawer.Screen name="Home" component={Home}/>
    </AppDrawer.Navigator>
    );
}

export default AppRoutes;
