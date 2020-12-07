import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View          } from 'react-native';
import { Message       } from '../../components';

export default function Header({ refresh, message }) {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={ styles.header } >
            <View style={ styles.divisor } >
                <TouchableOpacity 
                 style={ styles.buttonMenu }
                 onPress={() => { navigation.toggleDrawer() }}>
                    <Icon name="bars" color="#ff7213" size={35}/>
                </TouchableOpacity >

                <TouchableOpacity 
                 style={ styles.buttonMenu }
                 onPress={ () => { refresh() } }>
                    <Icon name="refresh" color="#ff7213" size={25} />
                </TouchableOpacity >
            </View>
            <View>
                <Message message={message}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: 60,
      marginTop: 20,
      marginBottom: 40,
    }, 
  
    divisor: {
      flexDirection: 'row', 
      width: '90%', 
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    buttonMenu: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});