import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Dimensions } from 'react-native';
import Button from '../Button';
import { useNavigation  } from '@react-navigation/native';


export default function CardInfos() {

  const navigation = useNavigation();
  const [randomInfos, setRandomInfos] = useState([]);

  useEffect(() => {
    setRandomInfos(infos.sort( () => .5 - Math.random()));
  }, [])
  
  const infos = [{
    image: require('../../images/card_infos/liverpool_card_infos.jpg'),
    text: "A taça foi conquistada de forma invicta apenas 12 vezes, por 10 clubes diferentes. Destes 10, somente , FC Porto, Ajax, Benfica, Liverpool e Manchester United conseguiram por mais de 1 vez;"
  }, {
    image: require('../../images/card_infos/real_madrid_card_infos.jpg'),
    text: "O clube com mais títulos é o Real Madrid, que ganhou a competição em treze ocasiões."
  }, {
    image: require('../../images/card_infos/real_madrid_x_frankfurt_card_infos.jpg'),
    text: "O maior público de uma final de Copa/Liga dos Campeões foi de 127.621 pessoas no Hampden Park, em Glasgow, na Escócia. Isso aconteceu na decisão de 1960, vencida pelo Real Madrid por 7 x 3 em jogo contra o Eintracht Frankfurt."
  },  {
    image: require('../../images/card_infos/francisco_gente_card_infos.jpg'),
    text: "O espanhol Francisco Gento é o o recordista de Títulos da Copa/Liga dos Campeões. Ele venceu seis vezes com o Real Madrid nos anos de 1956, 1957, 1958, 1959, 1960 e 1966."
  },  {
    image: require('../../images/card_infos/milan_final_champions_card_infos.jpg'),
    text: "O Milan é o time que mais jogou finais de UEFA Champions League depois de 1992. No total, ele jogou 6 finais: 1993, 1994, 1995, 2003, 2005 e 2007."
  },  {
    image: require('../../images/card_infos/juventus_champions_1996_card_infos.jpg'),
    text: "Apenas duas equipes venceram finais de Champions League em seu país: o Borussia Dortmund foi campeão em 1997 jogando em Munique, e a Juventus foi campeã em Roma em 1996."
  },  {
    image: require('../../images/card_infos/euros_card_infos.jpg'),
    text: "Desde 2017, ficou estipulado que o clube vencedor ganhará €19.000.000 e o time que ficar em segundo lugar recebetá o valor de €15.000.000 ."
  }, {
    image: require('../../images/card_infos/champions.jpg'),
    text: "Os maiores campeões da competição são o Real Madrid com 13 títulos, Milan com 7, Liverpool e Bayer de Munique com 6 e Barcelona, com 5 taças."
  }, {
    image: require('../../images/card_infos/campeos_espanhois.jpg'),
    text: "Os clubes espanhóis acumularam o maior número de vitórias (18 vitórias), seguido da Inglaterra (13 vitórias) e Itália (12 vitórias)."
  }, {
    image: require('../../images/card_infos/champions_ajax.jpg'),
    text: "O Amsterdamsche Football Club Ajax é tetra-campeão da principal competição de clubes da Europa, levantando o troféu nos anos de 1970–71, 1971–72, 1972–73 e 1994–95, ficando em segundo lugar em 2008-09 e 2010-11."
  }, {
    image: require('../../images/card_infos/champions_bayer_players.jpg'),
    text: "As ultimas três finais foram entre PSG e Bayern, sendo 1 a 0 para os alemães, Totthenhan e Liverpool, com dois gols do time do Liverpool, Real Madrid e Liverpool, com a taça erguida pelos espanhóis, que ganharam de 3 a 1 dos ingleses."
  }, {
    image: require('../../images/card_infos/campeos_juve_stadium.jpg'),
    text: "A Juventus Football Club conquistou 2 títulos da Liga dos Campeões da Europa nas temporadas 1984–85 e 1995–96. Foi 7 vezes segundo colocado nas temporadas de 1972-73, 1982-83, 1996-97, 1997-98, 2002-03, 2014–15 e 2016–17."
  }, {
    image: require('../../images/card_infos/champions_manchester_campeos.jpg'),
    text: "O inglês Manchester United Football Club já ergueu a taça da Liga dos Campeões 3 vezes, nas temporadas de 1967–68, 1998–99 e 2007–08, sendo vice-campeão em 2008-09 e 2010-11. Os diabos vermelhos se tornou em 2017 um dos cinco times de futebol a conquistar as três grandes principais competições da UEFA."
  }, {
    image: require('../../images/card_infos/gol_cristiano.jpg'),
    text: "Lista com os maiores artilheiros da história da Liga dos Campeões desde a primeira edição, em 1955/56 (à 01/2021): Cristiano Ronaldo (131), Messi(118), Raúl González(71), Robert Lewandowski(70) e Benzema(67)."
  }, {
    image: require('../../images/card_infos/more_goals.jpg'),
    text: "Os clubes que mais marcaram na competição (até 01/2021) são o Juventus em 5º colocado, com 455 gols, Man. United em 4º com 521 gols, Barcelona em 3º com 651, Bayern em 2º colocado com 742 e o Real Madrid em 1º lugar, contando com 984 gols marcados."
  }, {
    image: require('../../images/card_infos/primeiro_jogo_champions.jpg'),
    text: "O primeiro jogo da competição foi em 4 de Setembro de 1955 e terminou com um empate por 3–3 entre Sporting e Partizan. O primeiro gol da história da competição foi marcado por João Baptista Martins do Sporting."
  }, {
    image: require('../../images/card_infos/taca_champions.jpg'),
    text: "O troféu atual tem 74 cm de altura, é de prata e pesa 11 kg. Foi desenhado por Jörg Stadelmann, joalheiro de Berna, na Suíça, depois que o original foi entregue ao Real Madrid em 1966, em reconhecimento dos seus seis títulos até à data. O troféu custa 10 mil francos suíços."
  }];

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          Não há apostas nesse momento !
        </Text>
        <Text style={styles.subtitle}>
          Enquanto isso, veja curiosidades sobre a UEFA Champions League.
        </Text>
      </View>
      <ScrollView 
        horizontal={true} 
        style={{ marginBottom: 15 }} 
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          event.nativeEvent.contentOffset.x = 0
        }}
      >
        { randomInfos.length > 0 ? randomInfos.map((info, index) => (
          <View style={styles.card} key={index}>
            <Image 
                source={info.image}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.text}> 
              { info.text }
            </Text>
          </View>
        )) : null}
      </ScrollView>

      <Button text="Ver ranking" onPress={() => navigation.navigate('Ranking')} icon="star"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between'
  }, 

  title: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 10,
    color: '#c96f00'
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20
  },

  card: {
    width: Dimensions.get('window').width - 100,
    height: '100%',
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
  },

  text: {
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
    padding: 15,
    marginTop: 20
  },

  image: {
    width: '100%',
    height: 175,
  }
});