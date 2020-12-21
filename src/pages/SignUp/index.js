import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import { ContainerCenter, Logo, Input, InputPass, ButtonSubmit, Message, Row } from '../../components'


export default function SignIn() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { signUp, loadingAuth } = useContext( AuthContext );

  async function handleSignUp() {
    await signUp(email, name, password, confirmPassword);
  }

  return (
    <ContainerCenter>
      <Row cols={[8]} center={true} height={150}>
        <Logo source={require('../../images/Logo.png')}/>
      </Row>

      <Row cols={[8]} top={20}>
        <Message/>
      </Row>

      <Row cols={[8]}>
        <Input
          placeholder="Nome" 
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </Row>

      <Row cols={[8]}>
        <Input
          placeholder="Email" 
          autoCorrect={false}
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </Row>

      <Row cols={[8]}>
        <InputPass
          placeholder="Senha" 
          autoCorrect={false}
          autoCapitalize="none"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </Row>

      <Row cols={[8]}>
        <InputPass
          placeholder="Senha" 
          autoCorrect={false}
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
       </Row>

      <Row cols={[8]}>
        <ButtonSubmit text="Entrar" onPress={handleSignUp} loading={loadingAuth}/>
      </Row>

    </ContainerCenter>
  );
}