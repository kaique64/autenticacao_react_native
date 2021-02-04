import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity, 
    ImageBackground,
    Image,
    Platform
} from 'react-native';
import * as TouchID from 'expo-local-authentication'; 
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }) {

    const [display, setDisplay] = useState('none');
    const [msg, setMsg] = useState('');
    const [cor, setCor] = useState('');

    async function autenticateID(){
        const passwordSaved = await TouchID.isEnrolledAsync();
        if(!passwordSaved) return;

        const { success, error } = await TouchID.authenticateAsync();

        if(Platform.OS === 'android' && success){
            setDisplay('flex');
            setMsg('Autentificação feita com sucesso!');
            setCor('green');

            setTimeout( () => {
                setDisplay('none');
                setCor('')
            }, 5000)
        }else if(error){
            setDisplay('flex');
            setMsg('Falha na autenticação').
            setCor('red');

            setTimeout( () => {
                setDisplay('none');
            }, 5000)
        }
    } 


    return (
        <View style={styles.container}>
            <ImageBackground
                source = {require('../../assets/images/background.jpg')}
                style={{height: 100 + '%', width: 100 + '%'}}
            >
            <View style = {styles.title}>
                <Image
                    source = {require('../../assets/images/computer2-removebg-preview.png')}
                    style={styles.imgs}
                />
                <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 15}}> 
                    Bem-vindo ao App
                </Text>
                <Text
                style={{marginTop: 10, marginRight: 20}}
                > 
                Lorem Ipsum has been the industry's standard dummy text 
                ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled
                it to make a type specimen book                
                </Text>

                <View style = {styles.displayMsg(display)}>
                    <Text style = {styles.cor(cor)}>{msg}</Text>
                </View>
            </View>
            
            <View style = {styles.btns}>
                <TouchableOpacity 
                style = {styles.digital}
                onPress = { autenticateID }
                >
                    <Ionicons
                        name = 'md-finger-print'
                        style={{ fontSize: 25, paddingRight: 10 }}
                    />
                    <Text style = {{color: '#6A0DAD'}}> Smart ID </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {styles.signin}
                    onPress = {() => navigation.navigate('Login')}
                >
                    <Text style = {{color: 'white'}}> Sign in </Text>
                    <Ionicons
                        name = 'md-arrow-forward'
                        style={{paddingLeft: 30, fontSize: 20, color: 'white'}}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                style={styles.account}
                onPress = {() => navigation.navigate('Cadastrar')}>
                <Text style = {{color: 'black'}}> Create account </Text>
            </TouchableOpacity>

            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    btns: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    digital: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(106, 13, 173, .4)',
        borderRadius: 5,
        height: 35,
        width: 150,
        marginTop: 25,
        marginRight: 50,
        marginBottom: 25
    },
    signin: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6A0DAD',
        borderRadius: 5,
        height: 35,
        width: 150,
        marginTop: 25,
        marginRight: 30,
        marginBottom: 25
    },
    account: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        marginTop: 35,
        marginLeft: 30
    },
    imgs: {
        height: 240,
        width: 240
    },
    displayMsg: (display = 'none') => ({
        display: display
    }),
    cor: (cor = '') => ({
        color: cor,
        fontSize: 15, 
        fontWeight: 'bold',
    })
});
