//import liraries
import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TextInput,
    ImageBackground,
    Image,
    TouchableOpacity ,
    KeyboardAvoidingView
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

// create a component
const Cadastrar = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [display, setDisplay] = useState('none');
    const [msg, setMsg] = useState('');
    const [cor, setCor] = useState('');
    
    async function handleSubmit(){
        if(nome === '' || email === '' || cpf === '' || senha === ''){
            setDisplay('flex');
            setMsg('Preencha todos os dados!');
            setCor('red');

            setTimeout( () => {
                setDisplay('none');
            }, 5000)
        }else{
          await fetch('http://192.168.1.13:5000/cadastrar', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                cpf: cpf,
                senha: senha 
          })
        }).then( res => {
            if(res.status === 200){
                setDisplay('flex');
                setMsg('Cadastrado com sucesso');
                setCor('green'); 
                setNome('');
                setEmail('');
                setCpf('');
                setSenha('');
                
                setTimeout( () => {
                    setDisplay('none');
                }, 5000)
            }else if(res.status === 500){
                setDisplay('flex');
                setMsg('CPF já cadastrado');
                setCor('green'); 

                setTimeout( () => {
                    setDisplay('none');
                }, 5000)
            }
        }).catch( err => console.log('Erro: ' + err));
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
                    Register 
                </Text>

                <Text
                style={{marginTop: 10, marginRight: 25, fontSize: 15}}
                > 
                Cadastre para aproveitar e logar com sua digital ou email e senha 
                </Text>

                <View style={styles.msg(display)}>
                    <Text style={styles.cor(cor)}> {msg} </Text>
                </View>
            </View>
                <View style = {styles.form}>
                    <TextInput 
                        placeholder = 'Nome' 
                        style = {styles.input}
                        value = {nome}
                        onChangeText = { text => setNome(text)}
                    />
                    <TextInput 
                        placeholder = 'Email' 
                        style = {styles.input}
                        value = {email}
                        onChangeText = { text => setEmail(text)}
                    />
                    <TextInputMask 
                        placeholder = 'CPF' 
                        style = {styles.input}
                        type = {'cpf'}
                        value={cpf}
                        onChangeText={text => {
                            setCpf(text)
                         }}
                    />
                    <TextInput 
                        placeholder = 'Senha' 
                        style = {styles.input}
                        secureTextEntry = {true}
                        value = {senha}
                        onChangeText = {text => setSenha(text)}
                    />

                    <TouchableOpacity 
                    style = {styles.signin}
                    onPress = {handleSubmit}
                    >
                    <Text style = {{color: 'white'}}> Sign in </Text>
                    
                </TouchableOpacity>
                </View>
        </ImageBackground>
        </KeyboardAvoidingView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        marginTop: 35,
        marginLeft: 30
    },
    imgs: {
        height: 240,
        width: 240
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
    msg:(text = 'none')=>({
        display: text,
        fontWeight: 'bold',
        fontSize: 20
    }),
    cor:(cor = '') => ({
        color: cor,
        fontWeight: 'bold'
    })
});

//make this component available to the app
export default Cadastrar;
