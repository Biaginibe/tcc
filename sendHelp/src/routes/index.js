import React, { useEffect } from 'react';
import { Text } from 'react-native-elements';
import { useAuth } from '../context/Auth';
import { FreeRoutes } from './freeAcess.routes';
import  PatienteRoutes  from './patiente.routes';
import  PsychologistRoutes  from './psychologist.routes';

export const Routes = () => {
	const { user, type, token } = useAuth();

	function err(){
		console.log(user)
		console.log(type)
	}

	if (!user || !token) {
		return <FreeRoutes />;
	} else {
		if (type == 'paciente' || type == 3) {
			return <PatienteRoutes />;
		} else if(type == 'psicologo' || type == 2){
			return <PsychologistRoutes/>;
		}else{
			return(
				<Text onPress={err}>Erro!! Nenhuma pagina encontrada</Text>
			)
		}
	}
};
