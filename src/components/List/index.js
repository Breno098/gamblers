import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Modal } from '../../components';

export default function List({ onPressItem, ...props }) {
    const [modalVisible, setModalVisible] = useState(true);

    return (
        <View>
            <Modal 
                visible={modalVisible} 
                onRequestClose={() => setModalVisible(false)}
            >
                <Text style={{ color: '#FFF', fontSize: 80 }}>
                    Breno
                </Text>

            </Modal>
            <FlatList 
                nestedScrollEnabled
                style={ styles.main } 
                onPress={() => {
                    setModalVisible(true);
                }}
                {...props}
            />
        </View>
      
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        marginBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5,
        borderColor: '#ff7213',
        borderWidth: 2,
        backgroundColor: 'rgba(0, 0, 0, 1)',
    }, 
});