import React, { useState } from 'react';
import { Modal as ModalNative, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

export default function Modal({ children, ...props }) {

    return (
        <View style={styles.centeredView}>
          <ModalNative
            animationType="slide"
            transparent={true}
            {...props}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  { children }
              </View>
            </View>
          </ModalNative>
        </View>
      );
}


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: '100%'
    },
    modalView: {
      width: '87%',
      height: 200,
      backgroundColor: 'rgba(0,0,0,0.92)',
      borderColor: '#09ad00',
      borderWidth: 1,
      borderRadius: 7,
      padding: 3,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  