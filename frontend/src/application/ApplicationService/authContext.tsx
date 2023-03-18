import { ReactNode, createContext, useState, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { Center } from '@mantine/core';
import { auth } from './firebase';

export type UserType = User | null;

export type AuthContextProps = {
  user: UserType;
};

export type AuthProps = {
  children: ReactNode;
};

const AuthContext = createContext<Partial<AuthContextProps>>({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProps) => {
  const router = useRouter();
  const [user, setUser] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAvailableForViewing =
    router.pathname === '/' ||
    router.pathname === '/login/student' ||
    router.pathname === '/login/teacher' ||
    router.pathname === '/login/school';
  const value = {
    user,
  };

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (userData) => {
      setUser(userData);
      setIsLoading(false);
      !userData && !isAvailableForViewing && (await router.push('/'));
    });
    return () => {
      authStateChanged();
    };
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <Center>ただいま、読み込み中です</Center> : children}
    </AuthContext.Provider>
  );
};
