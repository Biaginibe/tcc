import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { instance } from '../config/axios';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [type, setType] = useState(null);
	const [psychologist, setPsychologist] = useState('');

	useEffect(() => {
		async function loadStoragedData() {
			const [storagedUser, storagedToken, storagedType, storagedPsychologist] =
				await AsyncStorage.multiGet([
					'@sendHelp:user',
					'@sendHelp:token',
					'@sendHelp:type',
					'@sendHelp:psychologist',
				]);
			
			async function isTokenValid() {
				return await instance
					.post('/valid', {
						token: JSON.parse(storagedToken[1]),
					})
					.then((response) => {
						if (response.data.valid) {
							instance.defaults.headers.Authorization = `Bearer ${storagedToken[1]}`;
							setToken(JSON.parse(storagedToken[1]));
							setUser(JSON.parse(storagedUser[1]));
							setType(JSON.parse(storagedType[1]));
							setPsychologist(JSON.parse(storagedPsychologist[1]));
						} else {
							setUser(null);
							setType(null);
							setToken(null);
							setPsychologist('');
							AsyncStorage.clear();
						}
					})
					.catch((err) => {
						return console.log(err);
					});
			}
			isTokenValid();
		}
		loadStoragedData();
	}, []);

    function signIn(response){
        setUser(response.user);
        setToken(response.token);
        setType(response.type);
		const data = response.psychologist[0]
        setPsychologist(data);
		
        instance.defaults.headers["Authorization"] = `Bearer ${response.token}`;
        AsyncStorage.setItem("@sendHelp:user", JSON.stringify(response.user));
        AsyncStorage.setItem("@sendHelp:type", JSON.stringify(response.type));
        AsyncStorage.setItem("@sendHelp:token", JSON.stringify(response.token));
        AsyncStorage.setItem("@sendHelp:psychologist", JSON.stringify(data));
    }

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@sendHelp:token','@sendHelp:user', '@sendHelp:type', '@sendHelp:psychologist']);
        setUser(null);
        setType(null);
        setToken(null);
        setPsychologist('');
        AsyncStorage.clear();
      }, []);

	return (
		<AuthContext.Provider value={{ signIn, signOut, user, type, setToken, setType, setUser, token, psychologist, setPsychologist }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	const { signIn, signOut, user, type, setType, setToken, setUser, token, psychologist, setPsychologist } = context;
	return { signIn, signOut, user, type, setType, setToken, setUser, token, psychologist, setPsychologist };
}
