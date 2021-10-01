import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [type, setType] = useState(null);
	
    function signIn(response){
        setUser(response.user);
        setToken(response.token);
        setType(response.type);
    }

    const signOut = useCallback(async () => {
        setUser(null);
        setType(null);
        setToken(null);
      }, []);

	return (
		<AuthContext.Provider value={{ signIn, signOut, user, type, setToken, setType, setUser, token }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	const { signIn, signOut, user, type, setType, setToken, setUser, token,  } = context;
	return { signIn, signOut, user, type, setType, setToken, setUser, token  };
}
