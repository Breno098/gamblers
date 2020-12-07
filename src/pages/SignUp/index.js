import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import { ContainerCenter, Logo, Input, InputPass, ButtonSubmit, Message } from '../../components'


export default function SignIn() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { signUp, loadingAuth, message } = useContext( AuthContext );

  const handleSignUp = () => signUp(email, name, password, confirmPassword);

  return (
    <ContainerCenter>
      <Logo source={require('../../images/Logo.png')}/>

      <Message message={message}/>

      <Input
        placeholder="Nome" 
        autoCorrect={false}
        autoCapitalize="none"
        value={name}
        onChangeText={(text) => setName(text)}
      />

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

      <InputPass
        placeholder="Senha" 
        autoCorrect={false}
        autoCapitalize="none"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      <ButtonSubmit text="Entrar" onPress={handleSignUp} loading={loadingAuth}/>

    </ContainerCenter>
  );
}