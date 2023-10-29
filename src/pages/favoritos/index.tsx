import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Favoritos: React.FC = ({ route }) => {
  const navigation = useNavigation();
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const desenhos = [
    { id: 1, nome: 'Ben 10', imagem: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABYJjYUCmXJvmLkirQQTEbDpZTyKVaWPm_xkAmi2k-WNXgbOSUytlt6FRFqKEjIjysLJvMAu1OgvzixtBvzoXXkd3scZmXQsnfPlW.jpg?r=332' },
    { id: 2, nome: 'Tom & Jerry', imagem: 'https://upload.wikimedia.org/wikipedia/pt/f/fd/Tom_and_Jerry.png' },
    { id: 3, nome: 'Scooby Doo', imagem: 'https://img.olhardigital.com.br/wp-content/uploads/2023/01/scooby-doo.jpg'},
  ];

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

  const adicionarFavorito = async (desenhoId: number) => {
    setFavoritos((prevFavoritos) => [...prevFavoritos, desenhoId]);

    // Atualize o AsyncStorage com os novos Favoritos
    await AsyncStorage.setItem('favoritos', JSON.stringify([...favoritos, desenhoId]));
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Favoritos</Text>
        <Fontisto name="favorite" size={25} color="black" />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          // Navegue para a tela de "Pesquisa"
          // Não é necessário passar detalhes do desenho aqui
          navigation.navigate('Pesquisa');
        }}
      >
        <Text style={styles.buttonText}>Adicionar desenho</Text>
      </TouchableOpacity>
      <View>
        {favoritos.map((desenhoId) => {
          const desenho = desenhos.find((item) => item.id === desenhoId);

          if (!desenho) return null;

          return (
            <View key={desenhoId} style={styles.desenhoContainer}>
              <Image source={{ uri: desenho.imagem }} style={styles.desenhoImagem} />
              <Text style={styles.desenhoNome}>{desenho.nome}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 37,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 37,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#70C7F4',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 43,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  desenhoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  desenhoImagem: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  desenhoNome: {
    fontSize: 16,
  },
});

export default Favoritos;
