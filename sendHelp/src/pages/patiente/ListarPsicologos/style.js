import { StyleSheet } from 'react-native';

const css = StyleSheet.create({
    bigContainer: {
        backgroundColor: '#F9f9f9',

    },

    inline: {
        width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
	},
    container:{
        marginBottom: 5,
    },  
	nome:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    input: {
		paddingVertical: 10,
		height: 45,
		borderColor: '#C6C6C6',
		borderWidth: 1,
		borderStyle: 'solid',
		borderRadius: 5,
		marginVertical: 15,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
        fontSize: 17
	},
	valor:{
        color: 'green',
        fontSize: 22,
    },
	tempoSessao:{
        color: 'gray',
        fontSize: 16,
        position: 'absolute',
        left: '76.5%',
        bottom: '2%',
        textAlign: 'center'
    },

});

export { css };
