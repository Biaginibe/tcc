import { StyleSheet } from 'react-native';

const css = StyleSheet.create({
    container:{
        marginBottom: 5
    },  
	nome:{
        fontSize: 20,
        fontWeight: 'bold'
    },
	valor:{
        color: 'green',
        fontSize: 22,
        position: 'absolute',
        left: '85%',
        top: '10%'
    },
	tempoSessao:{
        color: 'gray',
        fontSize: 16,
        position: 'absolute',
        left: '82%',
        bottom: '2%',
        textAlign: 'center'
    },

});

export { css };
