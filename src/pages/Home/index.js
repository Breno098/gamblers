import React, { useContext } from 'react';

import { Container } from '../../components'

import { AuthContext } from '../../contexts/auth'

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <Container>
    </Container>
  );
}