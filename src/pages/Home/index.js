import React, { useContext } from 'react';

import Header from '../../components/Header';

import { Background, Container } from  './styles';

import { AuthContext } from '../../contexts/auth'

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <Background>
      <Header/>
      <Container>

      </Container>
    </Background>
  );
}