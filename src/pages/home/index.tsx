import { ImageBackground } from "expo-image";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppRoutesList } from "../../routes/app.routes";

const { width, height } = Dimensions.get("window");
const plataforma = Platform.OS;

export default function Home() {
  const navigation = useNavigation<NavigationProp<AppRoutesList>>();
  const [destaques, setDestaques] = useState([
    {
      id: 1,
      nome: "Ben 10",
      descricao: "descrição do ben 10",
      background:
        "https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABYJjYUCmXJvmLkirQQTEbDpZTyKVaWPm_xkAmi2k-WNXgbOSUytlt6FRFqKEjIjysLJvMAu1OgvzixtBvzoXXkd3scZmXQsnfPlW.jpg?r=332",
    },
    {
      id: 2,
      nome: "tom & jerry",
      descricao: "descrição do tom & jerry",
      background:
        "https://upload.wikimedia.org/wikipedia/pt/f/fd/Tom_and_Jerry.png",
    },
    {
      id: 3,
      nome: "scooby doo",
      descricao: "descrição do scooby doo",
      background:
        "https://img.olhardigital.com.br/wp-content/uploads/2023/01/scooby-doo.jpg",
    },
  ]);
  const [assistindo, setAssistindo] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  return (
    <FlatList
      data={assistindo}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            width: (width - 50) / 2,
            height: width * 0.25,
            backgroundColor: "red",
          }}
        ></TouchableOpacity>
      )}
      numColumns={(width - 40) / ((width - 50) / 2)}
      contentContainerStyle={{
        gap: 10,
      }}
      columnWrapperStyle={{
        gap: 10,
        paddingHorizontal: 20,
        flexWrap: "wrap",
        // flexGrow: 2,
        justifyContent: "space-between",
      }}
      ListHeaderComponent={
        <FlatList
          data={destaques}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate("Detalhes", { id: item.id })}
            >
              <ImageBackground
                source={{ uri: item.background }}
                style={{
                  width,
                  height: plataforma === "web" ? height - 64 : width * 0.7,
                  overflow: "hidden",
                }}
                contentFit="cover"
                cachePolicy={"memory-disk"}
              >
                <LinearGradient
                  colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={{
                      color: "#70C7F4",
                      fontSize: 25,
                      fontWeight: "bold",
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.nome}
                  </Text>
                  <Text
                    numberOfLines={3}
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      textAlign: "center",
                      fontWeight: "300",
                    }}
                  >
                    {item.descricao}
                  </Text>
                </LinearGradient>
              </ImageBackground>
            </Pressable>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      }
    />
  );
}
