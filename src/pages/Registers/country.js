import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { AppContext } from '../../contexts/app';
import { Container, Divisor, Button, Input, List, ListColumns } from '../../components'
import firebase from '../../services/firebaseConnection';

export default function Country() {

    const { setMessage } = useContext(AppContext);

    const [countryName, setCountryName] = useState('');
    const [countryKey, setCountryKey] = useState(null);
    const [countrys, setCountrys] = useState([]);

    const [textButton, setTextButton] = useState('Registrar');

    useEffect(() => {
        loadList();
    }, []);

    async function loadList(){
        await firebase.database().ref('app').child('country').orderByChild('name').on('value', (snapshot) => {
                setCountrys([]);
                snapshot.forEach( childItem => {
                    let list = { key: childItem.key, name: childItem.val().name };
                    setCountrys(oldArray => [...oldArray, list]);
                })
            })
    }

    async function handleSubmit(){
        let model = {
            name: countryName
        }

        if(!countryKey){
            let key = await firebase.database().ref('app').child('country').push().key;
            await firebase.database().ref('app').child('country').child(key).set(model)
            setMessage(`${countryName} registrado com sucesso.`)
        } else {
            await firebase.database().ref('app').child('country').child(countryKey).set(model)
            setMessage(`${countryName} alterado com sucesso.`)
        }

        clear()
    }

    async function clear(){
        setTextButton('Registrar')
        setCountryKey(null);
        setCountryName('');
    }

    function deleteAlert(item){
        Alert.alert(
            'Confirmar exclusão?',
            item.name,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Deletar', onPress: () => deleteItem(item) }
            ],
        );
    }

    async function deleteItem(item){
        await firebase.database().ref('app').child('country').child(item.key).remove();
        setMessage(`${item.name} deletado com sucesso.`)
        clear();
    }

    function insertFieds(item){
        setTextButton('Alterar')
        setCountryKey(item.key);
        setCountryName(item.name);
    }

    return (
        <Container>

            <Divisor row={40}>
                <List headers={[{ title: 'Nome', onPress: () => setCountrys(countrys.slice().reverse()) }]}>
                    { countrys.map(item => (
                        <ListColumns   
                            columns={[item.name]}
                            onLongPress={() => deleteAlert(item)}
                            onPress={() => insertFieds(item) }
                        />
                    ))}
                </List>
            </Divisor>
           
            <Divisor row={5} top={10}>
                <Input
                    placeholder="Nome" 
                    value={countryName}
                    onChangeText={(text) => setCountryName(text)}
                />
            </Divisor>

            <Divisor row={5} top={10} cols={2} >
                <Button text={textButton} onPress={handleSubmit} />
                <Button text="Limpar" color="clean" icon="eraser" onPress={clear}/>
            </Divisor>

        </Container>
    );    
}