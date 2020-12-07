import React from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';

export default function Container({ children }) {
    return (
        <KeyboardAvoidingView style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#131313',
            width: '100%'
        }}>
            <View style={{ 
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center',
             }}>
                { children }
            </View>
        </KeyboardAvoidingView>
    );
}