import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import { ContainerCenter, Logo, Input, InputPass, ButtonSubmit, Message, Divisor } from '../../components'


export default function SignIn() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { signUp, loadingAuth, message } = useContext( AuthContext );

  const handleSignUp = () => signUp(email, name, password, confirmPassword);

  return (
    <ContainerCenter>
      <Divisor center={true}>
        <Logo source={require('../../images/Logo.png')}/>
      </Divisor>

      <Divisor row={5} top={10}>
        <Message message={message}/>
      </Divisor>

      <Divisor row={5} top={10}>
        <Input
          placeholder="Nome" 
          autoCorrect={false}
          autoCapitalize="none"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </Divisor>

      <Divisor row={5} top={10}>
        <Input
          placeholder="Email" 
          autoCorrect={false}
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </Divisor>

      <Divisor row={5} top={10}>
        <InputPass
          placeholder="Senha" 
          autoCorrect={false}
          autoCapitalize="none"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </Divisor>

      <Divisor row={5} top={10}>
        <InputPass
          placeholder="Senha" 
          autoCorrect={false}
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
       </Divisor>

      <Divisor row={5} top={10}>
        <ButtonSubmit text="Entrar" onPress={handleSignUp} loading={loadingAuth}/>
      </Divisor>

    </ContainerCenter>
  );
}