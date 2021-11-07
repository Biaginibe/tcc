import { StyleSheet } from 'react-native';

const css = StyleSheet.create({
	container: {
		paddingTop: '12%',
        backgroundColor: '#F9f9f9',
        height: '100%'
	},
    title:{
        paddingBottom: '15%',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#A0A0A0',
        textAlign:'center'
    },
    btnCallNext:{
		backgroundColor:'#053165',
		width: '60%',
		marginHorizontal: '20%',
		borderRadius: 5,
		marginVertical: '5%'
	},
	txtCallNext:{
		textAlign: 'center',
		color:'white',
		paddingVertical: 8,
        fontSize: 18,
        paddingHorizontal: 15
	},
    check:{
        marginBottom: '30%',
        display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
        maxWidth:'100%',
        marginLeft: '5%'
    },
    txt:{
        textAlign:'center',
        marginTop: '25%',
        fontSize: 16
    }
});

export { css };
