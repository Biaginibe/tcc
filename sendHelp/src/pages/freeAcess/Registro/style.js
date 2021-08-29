import { StyleSheet } from 'react-native';

const css = StyleSheet.create({
	container: {
		marginTop: '25%',
		marginLeft: '15%',
		marginRight: '15%',
	},
	radio: {
		display: 'flex',
		flexDirection: 'row',
		alignItems:'baseline',
	},
	title: {
		fontSize: 40,
		fontWeight: 'bold',
		color: '#053165',
		textAlign: 'center',
        marginBottom: 5
	},
    subTitle: {
        color: '#A1A1A1',
        fontSize: 15,
		marginBottom: '30%',
        textAlign:'center',
        width:'100%',
        backgroundColor: '#EAEAEA',
        padding: 5,
        borderTopColor: '#C6C6C6',
        borderTopWidth: 1,
        borderBottomColor: '#C6C6C6',
        borderBottomWidth: 1,
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
