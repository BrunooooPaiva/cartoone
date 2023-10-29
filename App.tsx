import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/context/AuthContext";
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider />
    </NavigationContainer>
  );
}
