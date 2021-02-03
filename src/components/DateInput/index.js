import React from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function DateInput({ ...props }) {

    return (
        <View style={{ width: '100%', borderRadius: 3, backgroundColor: 'rgba(0, 0, 0, 0.1)', height: 45 }}>
            <DatePicker
                { ...props }
                style={{ width: '100%' }}
                format="DD/MM/YY"
                mode="date"
                iconComponent={<Icon name="calendar" color="#000" size={25} style={{ marginRight: 5 }}/>}
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                    },
                    dateInput: {
                        borderWidth: 0,
                        padding: 21
                    }
                }}
            />
        </View>
       
    );
}