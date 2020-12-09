import React, { useState, useContext, useEffect } from 'react';
import api, { formDatas } from '../../services/api';
import { AppContext } from '../../contexts/app';
import { Container, Input, ListColumns, List, Divisor, Select, Button } from '../../components'

export default function Register() {

    const { setMessage } = useContext(AppContext);

    const [name, setName] = useState('');
    const [countryId, setCountryId] = useState(null);
    const [countryName, setCountryName] = useState(null);
    const [countrys, setCountrys] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        loadList();
        loadListCountry();
    }, []);

    async function loadList(){
        api.get('/team/getAll').then(response => {
            setTeams(response.data);
        })
    }

    async function loadListCountry(){
        api.get('/country/getAll').then(response => {
            setCountrys([]);
            response.data.forEach(element => {
                let datas = { text: element.name, value: element.id };
                setCountrys(oldArray => [...oldArray, datas]);
            });
        })
    }

    function handleSubmit(){
        api.post('/team/register', formDatas({ name: name, country_id: countryId }))
        .then(() => {
            insertFieds(null)
            setMessage(`${name} registrado`);
        })
    }

    function handleSubmitUpdate(){
        api.post('/team/register', formDatas({ id: 2, name: name, country_id: countryId }))
        .then(() => {
            insertFieds(null)
            setMessage(`${name} alterado`);
        })
    }

    function deleteItem(id){
        api.post('/team/delete', formDatas({ id }))
        .then(() => {
            setMessage(`${name} deletado`);
            setTeams( teams.filter((item) => item.id !== id ) );
        })
    }

    function insertFieds(item){
        setName(item ? item.name : '');
        setCountryId(item ? item.country_id.id : null);
        setCountryName(item ? item.country_id.name : null)
    }

    return (
        <Container refresh={loadList}>
            <Divisor row={40}>
                <List
                    data={teams}
                    keyExtractor={(item) => item.id }
                    //onPressItem={deleteItem(item.id)}
                    renderItem={({item}) => <ListColumns 
                        // onLongPress={() => deleteItem(item.id)} 
                        // onPress={() => insertFieds(item)}
                        key={item.id}
                        columns={[item.name, item.country_id.name]}
                    /> }
                />
            </Divisor>
            
            <Divisor row={5} top={10}>
                <Input
                    placeholder="Nome" 
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </Divisor>

            <Divisor row={5} top={10}>
                <Select items={countrys} itemPress={setCountryId} model={countryName}/>               
            </Divisor>

            <Divisor row={5} top={10} cols={2} >
                <Button text="Registar" onPress={handleSubmit} />
                <Button text="Alterar"  onPress={handleSubmitUpdate}/>
            </Divisor>

        </Container>
    );    
}