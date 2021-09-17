import { StyleSheet } from 'react-native';

const css = StyleSheet.create({
	container: {
		marginBottom: 5,
        
	},
	dia: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	checkbox: {
        position: 'absolute',
        right: 20,
    },
	trash: {
        position: 'absolute',
        right: 0,
    },
	btnAdd: {
        position: 'relative',
        top: 0,
		display:'flex',
		alignContent:'center',
		alignItems:'center',
		flexDirection: 'row',
    },
	textAdd: {
        color:'green',
		fontSize: 14
    },
	modal: {
		padding: 10,
		backgroundColor:'white',
	},
	botao: {
		width: 	'57%',
		backgroundColor: '#054070',
		borderRadius: 15,
		padding: 5,
		margin: 10
	},
	botaoCancelar: {
		width: 	'32%',
		backgroundColor:'#970000',
		borderRadius: 15,
		padding: 5,
		margin: 10
	},
	textModal: {
		color:'white',
		padding: 5,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 20
	},
	inline: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	radio: {
		display: 'flex',
		flexDirection: 'row',
		alignItems:'baseline',
	},
	textRadio: {
		fontSize: 16
	},
	label: {
		paddingStart:10,
		fontSize: 18,
		fontWeight: 'bold',
	},
	input:{
		padding: 10,
		height: 35,
		borderColor: 'grey',
		borderWidth: 1,
		borderStyle: 'solid',
		borderRadius: 5,
		marginBottom: 10,
		marginHorizontal: 10
	},
	btnCallNext:{
		backgroundColor:'#053165',
		width: '50%',
		marginHorizontal: '25%',
		borderRadius: 5,
		marginVertical: '5%'
	},
	txtCallNext:{
		textAlign: 'center',
		color:'white',
		paddingVertical: 8
	},
});

export { css };
