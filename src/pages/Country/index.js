import React, { useState, useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome';
import api, { formDatas } from '../../services/api';

import { AppContext } from '../../contexts/app';

import { Container, ButtonSubmit, Header , Input, List, ListItem } from '../../components'

const Tab = createBottomTabNavigator();

function Register() {

    const { message, setMessage } = useContext(AppContext);

    const [name, setName] = useState('');
    const [countrys, setCountrys] = useState([]);

    useEffect(() => {
        loadList();
    }, []);

    function loadList(){
        api.get('/country/getAll').then(response => {
            setCountrys(response.data);
        })
    }

    function handleSubmit(){
        api.post('/country/register', formDatas({ name }))
        .then(() => {
            setMessage(`${name} registrado`);
            loadList();
        })
    }

    return (
        <Container>
            <Header message={message}/>

            <List
                data={countrys}
                renderItem={({item}) => <ListItem text={item.name}/> }
                keyExtractor={(item) => item.key }
            />

            <Input
                placeholder="Nome" 
                autoCorrect={false}
                autoCapitalize="none"
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <ButtonSubmit text="Registrar" onPress={handleSubmit}/>
        </Container>
    );    
}

function Listing() {

    const [countrys, setCountrys] = useState([]);

    useEffect(() => {
        loadList();
    }, []);

    function loadList(){
        api.get('/country/getAll').then(response => {
            setCountrys(response.data);
        })
    }

    return (
       <Container>
            <Header/>

            <List
                data={countrys}
                renderItem={({item}) => <ListItem text={item.name}/> }
                keyExtractor={(item) => item.key }
            />

       </Container>
     );
}
  
const icons = {
    Lista: {
        icon: 'list'
    },
    Registrar: {
        icon: 'pencil'
    }
}

export default function Country(){
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    const { icon } = icons[route.name]
                    return <Icon name={icon} size={size} color={color} />;
                }
            })}

            tabBarOptions={{
                activeTintColor: '#ff7213',
                inactiveTintColor: '#FFF',
                style: {
                    backgroundColor: '#131313',
                    height: 50,
                    paddingBottom: 5,
                    paddingTop: 5,
                },
                showLabel: false,
        }}>
            
            <Tab.Screen name="Registrar" component={Register} />
            <Tab.Screen name="Lista" component={Listing} />
        </Tab.Navigator>
    )
}