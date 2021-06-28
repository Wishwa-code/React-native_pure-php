import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 80,
        top: 29,
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        paddingLeft: 30
    },
    userName:{
        fontWeight: 'bold',
        fontSize: 26,
        lineHeight: 26,
        color: 'lightblue'
    },
    greetingText: {
        fontWeight: '500',
        fontSize: 26,
        lineHeight: 26
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 77,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    images: {
        width:260,
        height:300,
        borderWidth:2,
        borderColor:'#d35647',
        resizeMode:'contain',
        margin:8
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    featuredList: {
        marginTop: 20,
        paddingLeft: 30
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    },
    userText: {
        fontSize: 20,
        color: '#333333'
    }
})
