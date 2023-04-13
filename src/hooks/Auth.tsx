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

interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

interface AuthContextData {
  user: UserProps;
  signIn(credentials: signInCredentials): Promise<boolean>;
  signOut(): void;
  signUp(credentials: SignUpCredentials): Promise<boolean>;
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

  const signIn = useCallback(async ({ username, password }: signInCredentials): Promise<boolean> => {
    const response = await api.post("login", {
      username,
      password,
    });

    if(response.status === 401) {
      return false;
    }

    const { token, user } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    localStorage.setItem("@Web-chat:token", token);
    localStorage.setItem("@Web-chat:user", JSON.stringify(user));

    setData({ token, user });

    return true;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@Web-chat:token");
    localStorage.removeItem("@Web-chat:user");

    setData({} as AuthState);
  }, []);

  const signUp = useCallback(async ({email, password, username}: SignUpCredentials): Promise<boolean> => {
    const response = await api.post("user/", {
      username,
      email,
      password,
    });

    if(response.status === 400) {
      return false;
    }

    const signInSuccessful = await signIn({username, password});

    return signInSuccessful;
  }, [signIn]);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, signUp }}>
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
