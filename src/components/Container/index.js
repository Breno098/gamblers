import React, { useContext } from 'react';
import { KeyboardAvoidingView, View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../../components'
import { AppContext } from '../../contexts/app';

export default function Container({ children, refresh }) {
    const { message } = useContext(AppContext);

    return (
        <View style={ styles.container }>
            <Header message={message} refresh={refresh}/>
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
        backgroundColor: '#131313',
        width: '100%',
    }, 

    core: {
        width: '90%',
    }
});