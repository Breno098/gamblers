import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth'

import { Container, Logo, Input, InputPass, ButtonSubmit, Message, TextLink } from '../../components'

export default function SignIn() {
  const navigation = useNavigation();
  const { signIn, loadingAuth, message } = useContext( AuthContext );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => signIn(email, password);

  return (
    <Container>
      <Logo source={require('../../images/Logo.png')}/>

      <Message message={message}/>

      <Input
        placeholder="Email" 
        autoCorrect={false}
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <InputPass
        placeholder="Senha" 
        autoCorrect={false}
        autoCapitalize="none"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <ButtonSubmit text="Entrar" onPress={handleLogin} loading={loadingAuth}/>

      <TextLink text="Criar uma conta" onPress={() => navigation.navigate('SignUp')}/>
    </Container>
  );
}