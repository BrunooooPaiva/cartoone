
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RouteParams = {
  id: number; // ou o tipo correto para o parâmetro 'id'
};

const Detalhes: React.FC = () => {
  const route = useRoute<RouteProp<AppRoutesList, "Detalhes">>();
  const { id } = route.params as RouteParams;

  const [favoritos, setFavoritos] = useState<number[]>([]);

  const desenhos = [
    {
      id: 1,
      nome: 'Ben 10',
      imagem: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABYJjYUCmXJvmLkirQQTEbDpZTyKVaWPm_xkAmi2k-WNXgbOSUytlt6FRFqKEjIjysLJvMAu1OgvzixtBvzoXXkd3scZmXQsnfPlW.jpg?r=332',
      descricao: 'Ben 10 é uma popular série de desenho animado que segue as aventuras de Ben Tennyson, um garoto que pode se transformar em diversos alienígenas com a ajuda de um dispositivo chamado Omnitrix. Ele combate vilões intergalácticos enquanto viaja pelo país e pelo espaço, oferecendo uma emocionante mistura de ação e comédia para o público jovem',
    },
    {
      id: 2,
      nome: 'Tom & Jerry',
      imagem: 'https://upload.wikimedia.org/wikipedia/pt/f/fd/Tom_and_Jerry.png',
      descricao: 'Tom & Jerry é uma clássica série de desenho animado que narra as engraçadas rivalidades e travessuras entre um gato chamado Tom e um rato chamado Jerry. Os episódios são repletos de comédia física e perseguições, tornando-a uma das duplas mais icônicas da animação',
    },
    {
      id: 3,
      nome: 'Scooby Doo',
      imagem: 'https://img.olhardigital.com.br/wp-content/uploads/2023/01/scooby-doo.jpg',
      descricao: 'Scooby-Doo é uma série de desenho animado que segue um grupo de adolescentes detetives e seu adorável cão Scooby-Doo enquanto resolvem mistérios aparentemente sobrenaturais. Com sua mistura de humor, suspense e investigação, a série é conhecida por desmascarar vilões disfarçados, revelando que "os monstros" não passam de seres humanos enganando os outros.',
    },
  ];

  const desenhoSelecionado = desenhos.find((desenho) => desenho.id === id);

  if (!desenhoSelecionado) {
    return (
      <View style={styles.container}>
        <Text style={styles.headingLeft}>Desenho não encontrado</Text>
      </View>
    );
  }

  const toggleFavorito = async (desenhoId: number) => {
    if (favoritos.includes(desenhoId)) {
      const updatedFavoritos = favoritos.filter((id) => id !== desenhoId);
      setFavoritos(updatedFavoritos);
    } else {
      setFavoritos([...favoritos, desenhoId]);
    }
  };

  useEffect(() => {
    const getFavoritos = async () => {
      const favoritosData = await AsyncStorage.getItem('favoritos');
      if (favoritosData) {
        const parsedFavoritos = JSON.parse(favoritosData);
        setFavoritos(parsedFavoritos);
      }
    };

    getFavoritos();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const isFavorito = favoritos.includes(id);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={{ uri: desenhoSelecionado.imagem }} style={styles.desenhoImagem} />
        <Text style={styles.headingLeft}>{desenhoSelecionado.nome}</Text>
        <Text style={styles.paragraph}>{desenhoSelecionado.descricao}</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <AntDesign name="caretright" size={24} color="black" />
            <Text style={styles.buttonText}>COMEÇAR A ASSISTIR</Text>
          </View>
          <TouchableOpacity
            style={styles.IconFavorite}
            onPress={() => toggleFavorito(id)}
          >
            {isFavorito ? (
              <MaterialIcons name="favorite" size={24} color="black" />
            ) : (
              <MaterialIcons name="favorite-border" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.verticalRect}></View>
        <View style={styles.verticalRect}></View>
        <View style={styles.verticalRect}></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 20,
  },
  desenhoImagem: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  headingLeft: {
    marginTop: 20,
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  paragraph: {
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 27,
    alignSelf: 'flex-start',
    marginLeft: 10,
    gap: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#70C7F4',
    width: 270,
    height: 42,
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: 'black',
    marginLeft: 10,
  },
  IconFavorite: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  verticalRect: {
    width: 200,
    height: 100,
    backgroundColor: 'lightgray',
    marginTop: 30,
    marginRight: 130,
  },
});

export default Detalhes;