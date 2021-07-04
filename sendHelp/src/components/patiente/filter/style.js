import { StyleSheet } from 'react-native';

const css = StyleSheet.create({
	container: {
		flex:1,
		position:'absolute'
	},
	botao: {
		position:'absolute',
		backgroundColor: '#054070',
		borderRadius: 50,
		padding: 10,
		margin: 10,
		top: 270,
		left: 320
	},
	botaoAplica: {
		width: 	'55%',
		backgroundColor: '#054070',
		borderRadius: 15,
		padding: 5,
		margin: 10,
		
	},
	picker:{
		width: '100%',
		height: '10%',
		padding: 40,
		borderColor: '#053165',
		borderWidth: 2,
		borderStyle: 'solid' 
	},
	modal: {
		padding: 10,
		backgroundColor:'white',
		// height: '87%'
	},
	textModal: {
		color:'white',
		padding: 5,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 20
	},
	label: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	botaoCancelar: {
		width: 	'32%',
		backgroundColor:'#970000',
		borderRadius: 15,
		padding: 5,
		margin: 10
	},
	inline: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
});

export { css };
