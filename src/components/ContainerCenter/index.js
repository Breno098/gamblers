import React from 'react';
import { KeyboardAvoidingView, View, StyleSheet} from 'react-native';

export default function ContainerCenter({ children }) {
    return (
        <KeyboardAvoidingView style={ styles.container }>
            <View style style={ styles.core }>
                { children }
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: '100%'
    }, 
  
    core: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});