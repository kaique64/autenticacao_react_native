import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './pages/Login';
import Cadastrar from './pages/Cadastrar';
import Home from './pages/Home';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const routes = () => {
    return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'Home' screenOptions = {{ headerShown: false }}>
        <Stack.Screen name = 'Home' component = { Home } />
        <Stack.Screen name = 'Login' component = { Login }/>
        <Stack.Screen name = 'Cadastrar' component = { Cadastrar }/>
      </Stack.Navigator>
    </NavigationContainer>
    )
}

export default routes;