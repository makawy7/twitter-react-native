import { createContext, useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Device from 'expo-device';
import axiosInstance from '../utils/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        loading,
        login: (email, password) => {
          setLoading(true);
          axiosInstance
            .post('/login', {
              email,
              password,
              device_name: Device.deviceName,
            })
            .then((res) => {
              const userResponse = {
                token: res.data.token,
                id: res.data.user.id,
                name: res.data.user.name,
                email: res.data.user.email,
                username: res.data.user.username,
                avatar: res.data.user.avatar,
              };
              setUser(userResponse);
              SecureStore.setItemAsync('user', JSON.stringify(userResponse));
              setError(null);
              setLoading(false);
            })
            .catch((err) => {
              console.log(err.response.data.message);
              setError(err.response.data.message);
              setLoading(false);
            });
        },
        logout: () => {
          setLoading(true);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${user.token}`;
          axiosInstance
            .post('/logout')
            .then((res) => {
              setError(null);
            })
            .catch((err) => {
              setError(err.response.data.message);
            })
            .finally(() => {
              setUser(null);
              setLoading(false);
              SecureStore.deleteItemAsync('user');
            });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
