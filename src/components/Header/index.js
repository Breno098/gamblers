import React, { useState } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { Container, ButtonMenu, DivisorContainer, MessageArea, MessageText} from './styles';

export default function Header({ refresh, message }) {

    const navigation = useNavigation();

    return (
        <Container>
            <DivisorContainer>
                <ButtonMenu onPress={() => { navigation.toggleDrawer() }}>
                    <Icon name="bars" color="#ff7213" size={35}/>
                </ButtonMenu>

                <ButtonMenu onPress={ () => { refresh() } }>
                    <Icon name="refresh" color="#ff7213" size={25} />
                </ButtonMenu>
            </DivisorContainer>
            <DivisorContainer>
                <MessageArea>
                    <MessageText> { message && message } </MessageText>
                </MessageArea>
            </DivisorContainer>
        </Container>
    );
}