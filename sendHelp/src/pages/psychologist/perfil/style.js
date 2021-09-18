import { StyleSheet } from 'react-native';

const css = StyleSheet.create({
	container: {
		paddingTop: '10%',
		backgroundColor: 'white',
		height: '100%',
	},
	containerLateral:{
		paddingHorizontal: '10%'
	},
	inline: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'baseline',
		justifyContent: 'space-between',
		paddingHorizontal: '5%',
		marginBottom: '8%',
	},
	header: {
		fontSize: 26,
		// fontWeight: 'bold',
		color: 'gray',
	},
	name: {
		fontWeight: 'bold',
		fontSize: 30,
	},
	info: {
		paddingHorizontal: '2%',
		fontSize: 16,
		marginBottom: 5,
	},
	infoNull: {
		paddingHorizontal: '2%',
		fontSize: 16,
		marginBottom: 5,
		color: 'gray',
	},
	desc: {
		borderColor: '#C2C2C2',
		borderWidth: 1,
		borderRadius: 2,
		marginTop: 5,
		width: '95%',
		marginLeft: 5,
        padding: 10,
	},
	btnSave:{
		backgroundColor:'#053165',
		width: '50%',
		marginHorizontal: '25%',
		borderRadius: 5,
		marginVertical: '15%'
	},
	txtSave:{
		textAlign: 'center',
		color:'white',
		paddingVertical: 8,
		fontSize: 18
	},
	input:{
		fontSize: 16,
		paddingHorizontal: 5
	},
	borderInput:{
		borderColor: '#C2C2C2',
		borderWidth: 1,
		paddingVertical: '1.5%',
		borderRadius: 5,
		marginBottom: 15
	}
});

export { css };
