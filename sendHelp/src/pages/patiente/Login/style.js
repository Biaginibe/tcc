import { StyleSheet } from 'react-native';

const css = StyleSheet.create({
	container: {
		marginTop: '50%',
		marginLeft: '15%',
		marginRight: '15%',
	},
	title: {
		fontSize: 40,
		fontWeight: 'bold',
		color: '#053165',
		marginBottom: '25%',
		textAlign: 'center',
	},
	btn: {
		width: '100%',
		backgroundColor: 'rgba(5,49,101,81)',
		borderRadius: 5,
		marginTop: 35,
        padding: '2%'
	},
	btnTxt: {
		color: 'white',
		textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
	},
	input: {
		padding: 10,
		height: 35,
		borderColor: 'grey',
		borderWidth: 1,
		borderStyle: 'solid',
		borderRadius: 5,
		marginBottom: 25,
	},
});

export { css };
