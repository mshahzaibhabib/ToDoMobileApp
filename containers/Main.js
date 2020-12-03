import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import AddNew from './AddNew';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Task from './Tasks/Task/Task';
import { AuthProvider } from './../context/authContext';


const Stack = createStackNavigator();

const Main = () => {
    return (
        <>
            <AuthProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Todo App' }} />
                        <Stack.Screen name="NewTask" component={AddNew} options={{ title: 'New Task' }} />
                        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
                        <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Sign In' }} />
                        <Stack.Screen name="Task" component={Task} options={{ title: 'Task' }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthProvider>
        </>
    );
};

export default Main;