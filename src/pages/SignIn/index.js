import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth'

import { ContainerCenter, Logo, Input, InputPass, ButtonSubmit, Message, TextLink, Divisor } from '../../components'


export default function SignIn() {
  const navigation = useNavigation();
  const { signIn, loadingAuth, message } = useContext( AuthContext );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => signIn(email, password);

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
        <ButtonSubmit text="Entrar" onPress={handleLogin} loading={loadingAuth}/>
      </Divisor>

      <TextLink text="Criar uma conta" onPress={() => navigation.navigate('SignUp')}/>
    </ContainerCenter>
  );
}