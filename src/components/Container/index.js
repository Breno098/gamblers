import React, { useContext } from 'react';
import { KeyboardAvoidingView, View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../contexts/app';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Container({ children }) {
    const navigation = useNavigation();
    const { message } = useContext(AppContext);

    return (
        <View style={ styles.container }>
            <SafeAreaView style={ styles.header } >
                    <TouchableOpacity style={ styles.buttonMenu } onPress={() => { navigation.toggleDrawer() }}>
                        <Icon name="bars" color="#ff7213" size={35}/>
                    </TouchableOpacity >
                    <TouchableOpacity style={ styles.messageArea }>
                        <Text style={ styles.text }> { message ?? message } </Text>
                    </TouchableOpacity>
            </SafeAreaView>
            <ScrollView style style={ styles.core }>
                <KeyboardAvoidingView>
                { children }
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: '100%',
    }, 

    core: {
        width: '90%',
    },

    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        height: 70,
        flexDirection: 'row',
    },

    buttonMenu: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    messageArea: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: '100%',
        marginBottom: 15,
    }, 

    text: {
        fontSize: 15, 
        color: 'black', 
        fontWeight: 'bold'
    }
});