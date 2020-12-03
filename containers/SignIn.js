import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, List, ActivityIndicator, Colors } from 'react-native-paper';
// import axios from 'axios';
import axios from './../axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { AuthContext } from '../context/authContext';



const SignIn = ({ navigation }) => {

    const context = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitErrors, setSubmitErrors] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);

    const signInHandler = async () => {

        setShowSpinner(true);

        const res = await axios({
            method: 'POST',
            url: '/auth/login',
            data: {
                email,
                password
            }
        });

        console.log('RESPONSE OBJECT');
        console.log(JSON.stringify(res, null, 2));

        // console.log('RESPONSE DATA');
        // console.log(JSON.stringify(res.data, null, 2));

        // console.log('RESPONSE TOKEN');
        // console.log(JSON.stringify(res.data.token, null, 2));

        if (res.data.status == 'Success') {
            context.login(res.data).then(() => {
                navigation.navigate('Home');
            }).catch(error => {
                console.log(error);
            });
            setShowSpinner(false);
        } else if (res.data.status == 'Fail') {
            console.log(res.data.statusMessage);
            setSubmitErrors(res.data.statusMessage);
            setShowSpinner(false);
        }

    };

    return (
        <View style={styles.view}>
            <TextInput
                style={styles.inputs}
                label="Email Address"
                value={email}
                onChangeText={email => setEmail(email)} />
            <TextInput
                style={styles.inputs}
                secureTextEntry={true} label="Password"
                value={password}
                onChangeText={password => setPassword(password)} />
            {submitErrors ? (
                <List.Item
                    title={submitErrors}
                // left={props => <List.Icon {...props} icon="folder" />}
                />
            ) : null}
            {/* <ActivityIndicator style={{ marginBottom: 10 }} animating={showSpinner} /> */}
            <Button
                style={styles.submitBtn}
                mode="contained" onPress={() => signInHandler()}
                loading={showSpinner}>
                Sign In
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'flex-end',
    },
    inputs: {
        width: '90%',
        alignSelf: 'center',
        marginBottom: 10
    },
    submitBtn: {
        width: 110,
        alignSelf: "center"
    }
});

export default SignIn;