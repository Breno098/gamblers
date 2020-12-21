import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth'

import { ContainerCenter, Logo, Input, InputPass, ButtonSubmit, Message, TextLink, Row } from '../../components'


export default function SignIn() {
  const navigation = useNavigation();
  const { signIn, loadingAuth } = useContext( AuthContext );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => signIn(email, password);

  return (
    <ContainerCenter>
      <Row cols={[8]} height={200} center={true}>
        <Logo source={require('../../images/Logo.png')}/>
      </Row>

      <Row cols={[8]}>
        <Message/>
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
        <ButtonSubmit text="Entrar" onPress={handleLogin} loading={loadingAuth}/>
      </Row>

      <TextLink text="Criar uma conta" onPress={() => navigation.navigate('SignUp')}/>
    </ContainerCenter>
  );
}