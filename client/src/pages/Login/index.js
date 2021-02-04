//import liraries
import React, { useState } from 'react';
import { 
    View,
    Text, 
    TextInput,
    StyleSheet,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableOpacity, 
} from 'react-native';

const Login = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [display, setDisplay] = useState('none');
    const [msg, setMsg] = useState('');
    const [cor, setCor] = useState('');

    async function handleLogin(){
        if(email === '' || senha === ''){
            setDisplay('flex')
            setMsg('Preencha todos os dados!');
            setCor('red');
            await AsyncStorage.clear();
            
            setTimeout( () => {
                setDisplay('none');
            }, 5000)
        }else{
            let res = await fetch('http://192.168.1.13:5000/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha 
              })
            })
                const json = await res.json();

                console.log(json);

                if(json.status === 1){
                    setDisplay('flex');
                    setCor('green');
                    setMsg('Logado com sucesso');
                    setEmail('');
                    setSenha('');

                    setTimeout( () => {
                        setDisplay('none');
                        navigation.navigate('Home')
                    }, 2500)
                }else if(json.status === 2){
                    setDisplay('flex');
                    setCor('red');
                    setMsg(json.err);
                    
                    setTimeout( () => {
                        setDisplay('none');
                    }, 2500)
                }
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
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
                    Login 
                </Text>

                <Text
                style={{marginTop: 10, marginRight: 25, fontSize: 15}}
                > 
                Logar com email e senha 
                </Text>

                <View style={styles.msg(display)}>
                    <Text style={styles.cor(cor)}> {msg} </Text>
                </View>
            </View>
                <View style = {styles.form}>
                    <TextInput
                    placeholder = 'Email'
                    style = {styles.input}
                    value = {email}
                    onChangeText = { text => setEmail(text) }
                    />
                    <TextInput
                    placeholder = 'Senha'
                    secureTextEntry = {true}
                    style = {styles.input}
                    value = {senha}
                    onChangeText = { text => setSenha(text)}
                    />
                    <TouchableOpacity 
                    style = {styles.signin}
                    onPress = {handleLogin}
                    >
                    <Text style = {{color: 'white'}}> Sign on </Text>
                    
                </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    form:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: 360,
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    signin: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6A0DAD',
        borderRadius: 5,
        height: 35,
        width: 360,
        marginTop: 15,
    },
    title: {
        marginTop: 35,
        marginLeft: 30
    },
    imgs: {
        height: 240,
        width: 240
    },
    msg:(text = 'none')=>({
        display: text,
        fontWeight: 'bold',
        fontSize: 20,
        margin: 0
    }),
    cor:(cor = '') => ({
        color: cor,
        fontWeight: 'bold',
    })
});

//make this component available to the app
export default Login;
