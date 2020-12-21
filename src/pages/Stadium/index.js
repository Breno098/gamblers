import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { AppContext } from '../../contexts/app';
import { Container, Row, Button, Input, List, ListColumns } from '../../components'
import firebase from '../../services/firebaseConnection';

export default function Stadium() {

    const { setMessage } = useContext(AppContext);

    const [stadiumName, setStadiumName] = useState('');
    const [stadiumKey, setStadiumKey] = useState(null);
    const [stadiums, setStadiums] = useState([]);

    const [textButton, setTextButton] = useState('Registrar');

    useEffect(() => {
        loadList();
    }, []);

    async function loadList(){
        await firebase.database().ref('app').child('stadium').orderByChild('name').on('value', (snapshot) => {
                setStadiums([]);
                snapshot.forEach( childItem => {
                    let list = { key: childItem.key, name: childItem.val().name };
                    setStadiums(oldArray => [...oldArray, list]);
                })
            })
    }

    async function handleSubmit(){
        let model = {
            name: stadiumName
        }

        if(!stadiumKey){
            let key = await firebase.database().ref('app').child('stadium').push().key;
            await firebase.database().ref('app').child('stadium').child(key).set(model)
            setMessage(`${stadiumName} registrado com sucesso.`)
        } else {
            await firebase.database().ref('app').child('stadium').child(stadiumKey).set(model)
            setMessage(`${stadiumName} alterado com sucesso.`)
        }

        clear()
    }

    async function clear(){
        setTextButton('Registrar')
        setStadiumKey(null);
        setStadiumName('');
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
        setStadiumKey(item.key);
        setStadiumName(item.name);
    }

    return (
        <Container>

            <Row height={400} cols={[8]}>
                <List headers={[{ title: 'Nome', onPress: () => setStadiums(stadiums.slice().reverse()) }]}>
                    { stadiums.map(item => (
                        <ListColumns   
                            columns={[item.name]}
                            onLongPress={() => deleteAlert(item)}
                            onPress={() => insertFieds(item) }
                        />
                    ))}
                </List>
            </Row>
           
            <Row top={10} cols={[8]}>
                <Input
                    placeholder="Nome" 
                    value={stadiumName}
                    onChangeText={(text) => setStadiumName(text)}
                />
            </Row>

            <Row cols={[6,2]}>
                <Button text={textButton} onPress={handleSubmit} />
                <Button text="Limpar" color="clean" icon="eraser" onPress={clear}/>
            </Row>

        </Container>
    );    
}