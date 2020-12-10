import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { AuthContext } from '../../contexts/auth';

export default function CustomDrawer(props) {

    const { user, signOut } = useContext( AuthContext );

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
                <Image 
                    source={require('../../images/Logo.png')}
                    style={{ width: 100, height: 100 }}
                    resizeMode="contain"
                />

                <Text style={{ color: '#000', fontSize: 17, fontWeight: 'bold', paddingBottom: 10 }}> 
                    { user && user.name }
                </Text>
            </View>

            <DrawerItemList {...props}/>

            <DrawerItem  
                {...props}
                label="Sair"
                inactiveBackgroundColor="rgba(0, 0, 0, 0.2)"
                onPress={ () => signOut() }
            />

        </DrawerContentScrollView>
    );
}