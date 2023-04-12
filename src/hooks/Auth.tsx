/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useCallback, useContext, useState } from "react";
import { api } from "../services/api";

export interface UserProps {
  id: string;
  username: string;
}

interface AuthState {
  token: string;
  user: UserProps;
}

interface signInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: UserProps;
  signIn(credentials: signInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthProviderData {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<AuthProviderData> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@Web-chat:token");
    const user = localStorage.getItem("@Web-chat:user");

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }: signInCredentials) => {
    const response = await api.post("login", {
      username,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    localStorage.setItem("@Web-chat:token", token);
    localStorage.setItem("@Web-chat:user", JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@Web-chat:token");
    localStorage.removeItem("@Web-chat:user");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an context");
  }

  return context;
}
