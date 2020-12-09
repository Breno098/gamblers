import React, { useState, useContext, useEffect } from 'react';
import api, { formDatas } from '../../services/api';
import { AppContext } from '../../contexts/app';
import { Container, Input, ListColumns, List, Divisor, Select, Button } from '../../components'

export default function Register() {

    const { setMessage } = useContext(AppContext);

    const [name, setName] = useState('');
    const [countryId, setCountryId] = useState(null);
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

    function handleSubmit( datasSubmit = {}){
        api.post('/team/register', formDatas({ name: name, country_id: countryId, ...datasSubmit }))
        .then(() => {
            setMessage(`${name} registrado`);
        })
    }

    function handleSubmitUpdate(){
        handleSubmit({ id: 5 })
    }

    function deleteItem(id){
        api.post('/team/delete', formDatas({ id }))
        .then(() => {
            setMessage(`${name} deletado`);
            let newArray = teams.filter((item) => {
                return item.id !== id ;
            });
            setTeams( newArray );
        })
    }

    return (
        <Container refresh={loadList}>
            <Divisor row={40}>
                <List
                    data={teams}
                    keyExtractor={(item) => item.id }
                    renderItem={({item}) => <ListColumns 
                        onLongPress={() => deleteItem(item.id)} 
                        key={item.id}
                        columns={[item.name, item.country_id.name]}
                    /> }
                />
            </Divisor>
            
            <Divisor row={5} top={0}>
                <Input
                    placeholder="Nome" 
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </Divisor>

            <Divisor row={5} top={10}>
                <Select items={countrys} itemPress={setCountryId}/>               
            </Divisor>

            <Divisor row={5} top={10} cols={2} >
                <Button text="Registar" onPress={handleSubmit} />
                <Button text="Alterar" color="orange" onPress={handleSubmitUpdate}/>
            </Divisor>

        </Container>
    );    
}