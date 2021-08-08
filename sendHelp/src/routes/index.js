import React from 'react';
import { useAuth } from '../context/Auth';
import { FreeRoutes } from './freeAcess.routes';
import { PatienteRoutes } from './patiente.routes';
import { PsychologistRoutes } from './psychologist.routes'

export const Routes = () => {
    const {user, type} = useAuth();
    if(!user){
        return <FreeRoutes/>
    }else if(type === 'paciente'){
        return <PatienteRoutes/>
    }else if(type === 'psicologo'){
        return <PsychologistRoutes/>
    }
}