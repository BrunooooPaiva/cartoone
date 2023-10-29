import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pesquisa from "../pages/pesquisa";
import Home from "../pages/home";
import Favoritos from "../pages/favoritos";
import Detalhes from "../pages/detalhes";
import { Image } from "expo-image";
import pkg from "../../package.json";
import { Ionicons } from '@expo/vector-icons';
import { Platform, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons'; 


const plataforma = Platform.OS;

export type AppRoutesList = {
  Home: undefined;
  Pesquisa: { id?: number };
  Favoritos: { id?: number };
  Detalhes: { id: number };
};

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesList>();

export default function AppRoutes() {
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const renderHeaderTitle = (routeName: string) => {
    if (routeName === 'Home') {
      return (
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 50, height: 50 }}
          contentFit="contain"
          cachePolicy={"memory-disk"}
        />
      );
    } else {
      return (
        <TouchableOpacity onPress={navigateToHome}>
          <Image
            source={require("../../assets/logo.png")}
            style={{ width: 50, height: 50 }}
            contentFit="contain"
            cachePolicy={"memory-disk"}
          />
        </TouchableOpacity>
      );
    }
  };

  return (
    <Navigator
      screenOptions={({ route }) => ({
        headerTitle: () => renderHeaderTitle(route.name),
        headerRight: () => {
          if (route.name === "Home") {
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                {/* Ícones para Favoritos, Pesquisa e Perfil */}
                <TouchableOpacity onPress={() => navigation.navigate('Pesquisa')}>
                  <Ionicons name="search" size={24} color="black" style={{ marginRight: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Favoritos')}>
                  <Fontisto name="favorite" size={24} color="black" style={{ marginRight: 10 }}/>
                </TouchableOpacity>
                <Ionicons name="person-circle-outline" size={plataforma === 'web' ? 35 : 30} color="black" style={{ marginRight: plataforma === 'web' ? 20 : undefined }} />
              </View>
            );
          } else {
            return null; // Não exibir nenhum ícone na barra de cabeçalho
          }
        },
        headerTitleAlign: route.name === "Home" ? "left" : "center",
        contentStyle: {
          backgroundColor: "#fff",
        },
        animation: "slide_from_right",
      })}
      initialRouteName="Home"
    >
      <Screen name="Home" component={Home} options={{ title: pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1) }} />
      <Screen name="Pesquisa" component={Pesquisa} />
      <Screen name="Favoritos" component={Favoritos} />
      <Screen name="Detalhes" component={Detalhes} />
    </Navigator>
  );
}
