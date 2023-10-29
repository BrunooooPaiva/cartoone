import { createContext, useState } from "react";
import { IUsuario } from "../types/interfaces";
import AppRoutes from "../routes/app.routes";

type AuthContextProps = {
  token: string | null;
  usuario: IUsuario | null;
};

export const AuthContext = createContext<AuthContextProps>(null!);

export default function AuthProvider() {
  const [token, setToken] = useState<string | null>("asdasdasdasd");
  const [usuario, setUsuario] = useState<IUsuario | null>({
    id: 1,
    nome: "Bruno Paiva",
  });
  return (
    <AuthContext.Provider value={{ token, usuario }}>
      {!token || !usuario ? <></> : <AppRoutes />}
    </AuthContext.Provider>
  );
}
