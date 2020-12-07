import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { CustomDrawer } from '../components'
import Home from '../pages/Home';

const AppDrawer = createDrawerNavigator();

function AppRoutes(){
    return(
    <AppDrawer.Navigator
        drawerContent={ (props) => <CustomDrawer {...props}/> }
        drawerStyle={{
            backgroundColor: '#171717'
        }}
        drawerContentOptions={{
            labelStyle: {
                fontWeight: 'bold',
            },
            activeTintColor: '#FFF',
            activeBackgroundColor: '#ff7213',
            inactiveTintColor: '#DDD',
            inactiveBackgroundColor: '#000',
            itemStyle: {
                marginVertical: 5
            }
        }}
    >
        <AppDrawer.Screen name="Home" component={Home}/>
    </AppDrawer.Navigator>
    );
}

export default AppRoutes;
