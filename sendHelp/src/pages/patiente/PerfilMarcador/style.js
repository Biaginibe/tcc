import { StyleSheet } from 'react-native';

const css = StyleSheet.create({
	container: {
        marginTop: '10%',
        paddingTop: '5%',
        backgroundColor: 'white',
        height: '97%'
    },
    inline: {
        width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
	},
    name: {
        fontWeight: 'bold',
        fontSize: 30,
        maxWidth:'70%'
    },
    value: {
        fontSize: 26,
        color: '#0BBF59'
    },
    infos: {
        paddingLeft: 15,
    },
    infoContentTitle: {
        fontSize: 18
    },
    infoContent: {
        fontSize: 16,
        marginBottom: 12
    },
    btn: {
        marginTop: '10%',
        marginBottom: '10%',
        textAlign: 'center',
        width: '65%',
        marginHorizontal: '18%',
        backgroundColor: '#0BBF59', //#EDEDED
        borderRadius: 10,
        padding: 7,
    },
    btnInsertQueue: {
        marginTop: '10%',
        marginBottom: '10%',
        width: '65%',
        marginHorizontal: '18%',
        backgroundColor: '#053165', //#EDEDED
        borderRadius: 10,
        padding: 7,
    },
    btnQuitQueue: {
        marginTop: '10%',
        marginBottom: '10%',
        width: '65%',
        marginHorizontal: '18%',
        backgroundColor: '#B22235', //#EDEDED
        borderRadius: 10,
        padding: 7,
    },

    btnTxtQueue: {
        fontSize: 18,
        textAlign:'center',
        fontWeight: 'bold',
        color: 'white'
    }, 
    btnTxt: {
        fontSize: 16,
        paddingLeft: '10%',
        fontWeight: 'bold',
        color: 'white'
    }, 

    btnZap: {
        paddingRight: '8%'
    },

    scheduleTitle: {
        fontSize: 20,
        paddingLeft: 30,
        marginTop: 12,
        marginBottom: 12
    },

    scheduleSubtitle:{
        fontSize: 18,
        paddingLeft: 30,
        // marginBottom: 5,
    },

    schedules: {
        fontSize: 16,
    },
    
    schedulesTouchable: {
        backgroundColor:'#EDEDED',
        marginLeft: 15,
        padding: 8,
        borderRadius: 5,
    },

    inactiveSchedule: {
        paddingLeft: 18,
        color: 'gray'
    },
    grayText: {
        paddingBottom: 25,
        color: 'gray',
        fontSize: 18,
        width: '100%',
        textAlign: 'center'
    }
});

export { css };
