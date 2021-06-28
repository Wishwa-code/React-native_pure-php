import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function HomeScreen({navigation,route}) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])
    const [users, setUsers] = useState([])

    const entityRef = firebase.firestore().collection('entities')
    const userID = route.params.user.id

    const userRef = firebase.firestore().collection('users')

    useEffect(() => {
        entityRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    useEffect(() => {
        userRef
            .orderBy('email', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newUsers = []
                    querySnapshot.forEach(doc => {
                        const user = doc.data()
                        user.id = doc.id
                        newUsers.push(user)
                    });
                    setUsers(newUsers)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const onLogOutPress = () => {
        firebase
            .auth()
            .signOut()
            .then(() => 
                console.log('User signed out!'))
                navigation.navigate('Login');
    }


    const renderEntity = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {index}. {item.text}
                </Text>
            </View>
        )
    }

    const renderUser = ({item}) => {
        return (
            <View style={styles.entityContainer}>
                <Image style={styles.images} source={{uri:item.url}} />
                <Text style={styles.userText}>
                    {item.fullName}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greetingText}>Good Morning</Text>
                <Text style={styles.userName}>Chathuri Subhashini</Text>
            </View>
            <View style={styles.featuredList}>
                    <FlatList
                        horizontal
                        data={users}
                        renderItem={renderUser}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add new entity'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityText(text)}
                    value={entityText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={onLogOutPress}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
            { entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
        </View>
    )
}
