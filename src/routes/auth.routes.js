import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const AuthStack = createStackNavigator();

function AuthRoutes(){
    return(
    <AuthStack.Navigator>
        <AuthStack.Screen 
        name="SignIn" 
        component={SignIn}
        options={{ headerShown: false }}
        />
        <AuthStack.Screen 
        name="SignUp" 
        component={SignUp}
        options={{ 
            headerStyle: {
                backgroundColor: "rgba(255, 255, 255, 1)",
                borderBottomWidth: 5,
                borderBottomColor: "#09ad00"
            },
            headerTintColor: "#000",
            headerBackTitleVisible: false,
            headerTitle: 'Voltar'
        }}
        />
    </AuthStack.Navigator>
    );
}

export default AuthRoutes;
