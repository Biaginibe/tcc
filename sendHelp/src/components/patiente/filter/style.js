import { StyleSheet } from 'react-native';

const css = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		justifyContent: 'center',
		height: '10%'
	},
	botao: {
		backgroundColor: '#053165',
		borderRadius: 50,
		padding: 10,
	},
	position: {
		flex: 1,
		position: 'absolute',
		bottom: '5%',
		right: '5%',
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
		padding: 5,
		backgroundColor:'white',
		height: '50%'
	},
	textModal: {
		color:'white',
		padding: 5,
		textAlign: 'center'
	}
});

export { css };
