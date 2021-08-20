import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { instance } from '../config/axios';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [type, setType] = useState(null);

	useEffect(() => {
		async function loadStoragedData() {
			const [storagedUser, storagedToken, storagedType] =
				await AsyncStorage.multiGet([
					'@sendHelp:user',
					'@sendHelp:token',
					'@sendHelp:type',
				]);
			
			async function isTokenValid() {
				return await instance
					.post('/valid', {
						token: JSON.parse(storagedToken[1]),
					})
					.then((response) => {
						console.log(response.data.valid)
						if (response.data.valid) {
							console.log('to aqui no if')
							instance.defaults.headers.Authorization = `Bearer ${storagedToken[1]}`;
							setToken(JSON.parse(storagedToken[1]));
							setUser(JSON.parse(storagedUser[1]));
							setType(JSON.parse(storagedType[1]));
							console.log('\n\nCONTEXT\n' + user, token, type);
						} else {
							setUser(null);
							setType(null);
							setToken(null);
							AsyncStorage.clear();
						}
					})
					.catch((err) => {
						return;
					});
			}
			isTokenValid();
		}
		loadStoragedData();
	}, []);

    function signIn(response){
		console.log('estou no metodo');
		// console.log(response)
        setUser(response.user);
        setToken(response.token);
        setType(response.type);
		
        instance.defaults.headers["Authorization"] = `Bearer ${response.token}`;
        AsyncStorage.setItem("@sendHelp:user", JSON.stringify(response.user));
        AsyncStorage.setItem("@sendHelp:type", JSON.stringify(response.type));
        AsyncStorage.setItem("@sendHelp:token", JSON.stringify(response.token));
    }

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@sendHelp:token','@sendHelp:user', '@sendHelp:type']);
        setUser(null);
        setType(null);
        setToken(null);
        AsyncStorage.clear();
      }, []);

	return (
		<AuthContext.Provider value={{ signIn, signOut, user, type, setToken, setType, setUser, token }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	const { signIn, signOut, user, type, setType, setToken, setUser, token } = context;
	return { signIn, signOut, user, type, setType, setToken, setUser, token };
}
