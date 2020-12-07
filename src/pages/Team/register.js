import React, { useState, useContext, useEffect } from 'react';
import api, { formDatas } from '../../services/api';
import { AppContext } from '../../contexts/app';
import { DataTable } from 'react-native-paper';

import { Container, ButtonSubmit, Header , Input, List, ListItem } from '../../components'

export default function Register() {

    const { message, setMessage } = useContext(AppContext);

    const [name, setName] = useState('');
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        loadList();
    }, []);

    function loadList(){
        api.get('/team/getAll').then(response => {
            setTeams(response.data);
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

            <DataTable style={{ backgroundColor: '#FFF', marginBottom: 10 }}>
                <DataTable.Header>
                    <DataTable.Title sortDirection='descending'> Nome</DataTable.Title>
                    <DataTable.Title numeric>País</DataTable.Title>
                </DataTable.Header>
                { teams.map(item => (
                    <DataTable.Row>
                        <DataTable.Cell> { item.name } </DataTable.Cell>
                        <DataTable.Cell> { item.country_id.name} </DataTable.Cell>
                    </DataTable.Row>
                )) }
          
                <DataTable.Pagination
                    page={1}
                    numberOfPages={3}
                    onPageChange={page => {
                        console.log(page);
                    }}
                    label="1-2 of 6"
                />
            </DataTable>

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