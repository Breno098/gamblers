import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, StyleSheet,View, Text, TouchableOpacity} from 'react-native';

export default function List({ children, headers,  ...props }) {
    const width = headers ? 100 / headers.length : 100;
    const [direction, setDirection] = useState(false);

    return (
        <View style={ styles.main }>
            {/* TITLE */}
            { headers ? 
            <View style={ styles.header }>
                { headers ? headers.map( (column) => (
                        <TouchableOpacity 
                            onPress={() => {
                                if(column.onPress){
                                    setDirection(!direction)
                                    column.onPress();
                                }
                            }}
                            style={{ width: width + '%', flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}
                        >
                            <Text style={ styles.text }> { column.title }  </Text>
                            {
                                column.onPress 
                                ? 
                                <Icon name={direction ? 'arrow-up' : 'arrow-down'} size={10} color="rgba(0, 0, 0, 0.1)" style={{ marginLeft: 5 }}/>
                                :
                                null
                            }
                        </TouchableOpacity>
                )) : null }    
            </View>: null }
            
            {/* BODY */}
            <ScrollView nestedScrollEnabled style={ styles.core } >
            { children }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        marginBottom: 10,
        borderRadius: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }, 

    core: {

    },

    header: {
        width: '100%',
        padding: 10,
        marginBottom: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        flexDirection: 'row',
        borderBottomColor: '#09ad00',
        borderBottomWidth: 0.5,
    },  

    text: {
        color: 'black',
        textAlign: "center"
    }
});