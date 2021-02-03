<p align="center">
  <h3 align="center"> Fut Gamblers </h3>
</p>

<p align="center">
  <h4 align="center"> Telas de autenticação </h4>
</p>

<table>
  <tr>
    <td>
      <img src="https://github.com/Breno098/gamblers/blob/master/readme_images/login_screen.jpeg" width="210" height="390">
    </td>
    <td>
      <img src="https://github.com/Breno098/gamblers/blob/master/readme_images/create_user_screen.jpeg" width="210" height="390">
    </td>
  </tr>
</table>

<p align="center">
  <h4 align="center"> Telas do aplicativo </h4>
</p>

<table>
  <tr>
    <td>
        <img src="https://github.com/Breno098/gamblers/blob/master/readme_images/home_screen.jpeg" width="210" height="390">
    </td>
    <td>
        <img src="https://github.com/Breno098/gamblers/blob/master/readme_images/side_menu.jpeg" width="210" height="390">
    </td>
    <td>
        <img src="https://github.com/Breno098/gamblers/blob/master/readme_images/ranking_screen.jpeg" width="210" height="390">
    </td>
    <td>
        <img src="https://github.com/Breno098/gamblers/blob/master/readme_images/register_screen.jpeg" width="210" height="390">
    </td>
  </tr>
  <tr>
    <td>
        <img src="https://github.com/Breno098/gamblers/blob/master/readme_images/oficial_game_screen.jpeg" width="210" height="390">
    </td>
    <td>
        <img src="https://github.com/Breno098/gamblers/blob/master/readme_images/bets_screen.jpeg" width="210" height="390">
    </td>
    <td>
        <img src="https://github.com/Breno098/gamblers/blob/master/readme_images/bet_screen.jpeg" width="210" height="390">
    </td>
    <td>
        <img src="https://github.com/Breno098/gamblers/blob/master/readme_images/oficial_game_calc_screen.jpeg" width="210" height="390">
    </td>
  </tr>
</table>

## Tabela de Conteúdo

- [Sobre o Projeto](#sobre-o-projeto)
  - [Feito Com](#feito-com)
  - [Edição](#edi%C3%A7%C3%A3o)
- [Contato](#contato)

## Sobre o Projeto

Este projeto visa a criação de um template que possa ser utilizado no momento de criação de projetos utilizando React Native, visto que o processo de instalação e configuração das libs no início de um projeto podem gerar certa complexidade e muitas vezes até erros que atrasam o processo, atrapalhando assim o fluxo de desenvolvimento.

### Feito Com

Abaixo segue o que foi utilizado na criação deste template:

- [Expo](https://docs.expo.io/) 
- [React Native](http://facebook.github.io/react-native/)
- [React Navigation](https://reactnavigation.org)
- [React Native Gesture Handler](https://kmagiera.github.io/react-native-gesture-handler/)
- [Firebase](https://firebase.google.com/)

### Edição

Nesta seção haverão instruções caso você queira editar o template, explicando para que os diretórios são utilizados e também os arquivos de configuração.

- **assets** - Diretório contendo logos;

- **src** - Diretório contendo todos os arquivos da aplicação, é criado um diretório `src` para que o código da aplicação possa ser isolado em um diretório e facilmente portado para outros projetos, se necessário;

  - **components** - Diretório para armazenar os componentes utilizar na aplicação, como forma de padronizar os estilos e itens como botôes, listas, entre outros elementos;

  - **contexts** - Diretório de contextos (providers) utilizados na aplicação;
  
  - **images** - Diretório para armazenar imagens em geral que possam ser utilizadas na aplicação;
  
  - **pages** - Diretório onde ficam as páginas (telas) da aplicação, como forma de padronização e boas práticas toda página fica dentro de um diretório com seu nome;
  
  - **routes** - Diretório com as configurações de navegação da aplicação;
  
  - **secret** - Diretório com os token e informações de acessos da aplicação;
  
  - **services** - Diretório onde serão criados os arquivos relacionados a serviços utilizados na aplicação, por exemplo, requisições HTTP, autenticação com Firebase ou qualquer outro serviço que for utilizado;

- **App.js** - Arquivo raiz da aplicação, também chamado de _Entry Point_, é o primeiro arquivo chamado no momento do build e execução da aplicação, nele é chamado o arquivo `src/index.js` que por sua vez chama as rotas da aplicação;

- **app.json** - Arquivo de configuração de construção projeto; 

- **package.json** - Diferente dos projetos comuns, esse arquivo tem as configurações necessárias para a publicação do Template no NPM, para saber mais sobre isso veja a seção abaixo.

## Contato

Breno - [Github](https://github.com/Breno098) - **Breno 098**
