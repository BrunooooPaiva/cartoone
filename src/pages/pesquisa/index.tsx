import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Pesquisa: React.FC = () => {
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [desenhosFiltrados, setDesenhosFiltrados] = useState([]);

  const desenhos = [
    { id: 1, nome: 'Ben 10', imagem: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABYJjYUCmXJvmLkirQQTEbDpZTyKVaWPm_xkAmi2k-WNXgbOSUytlt6FRFqKEjIjysLJvMAu1OgvzixtBvzoXXkd3scZmXQsnfPlW.jpg?r=332' },
    { id: 2, nome: 'Tom & Jerry', imagem: 'https://upload.wikimedia.org/wikipedia/pt/f/fd/Tom_and_Jerry.png' },
    { id: 3, nome: 'Scooby Doo', imagem: 'https://img.olhardigital.com.br/wp-content/uploads/2023/01/scooby-doo.jpg'},
  ];

  const navigation = useNavigation();

  const filtrarDesenhos = () => {
    const termo = termoPesquisa.toLowerCase();
    const desenhosFiltrados = desenhos.filter((desenho) =>
      desenho.nome.toLowerCase().includes(termo)
    );
    setDesenhosFiltrados(desenhosFiltrados);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ver todos os desenhos</Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Octicons name="search" size={20} color="black" />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar um desenho animado"
          placeholderTextColor="rgba(0,0,0,0.5)"
          value={termoPesquisa}
          onChangeText={(text) => setTermoPesquisa(text)}
          onBlur={filtrarDesenhos}
        />
      </View>
      <FlatList
        data={desenhosFiltrados.length > 0 ? desenhosFiltrados : desenhos}
        keyExtractor={(desenho) => desenho.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              // Navegue para a tela de "Detalhes" e passe os detalhes do desenho selecionado
              navigation.navigate('Detalhes', { id: item.id });
            }}
          >
            <View style={styles.desenhoContainer}>
              <Image source={{ uri: item.imagem }} style={styles.desenhoImagem} />
              <Text style={styles.desenhoNome}>{item.nome}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 43,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 36,
    backgroundColor: '#DBF1FD',
    borderRadius: 20,
    padding: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'black',
  },
  desenhoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  desenhoImagem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  desenhoNome: {
    fontSize: 16,
    color: 'black',
  },
});

export default Pesquisa;
