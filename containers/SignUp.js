import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, List } from 'react-native-paper';
import axios from './../axios';
import { AuthContext } from '../context/authContext';



const SignUp = ({ navigation }) => {

    const context = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [userName, setUsernName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [submitErrors, setSubmitErrors] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);

    const signUpHandler = async () => {

        setShowSpinner(true);

        const res = await axios({
            method: 'POST',
            url: '/auth/signup',
            data: {
                email,
                userName,
                password,
                passwordConfirm
            }
        });

        console.log('SignUp Response');
        console.log(JSON.stringify(res, null, 2));

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

        // context.login(res.data).then(() => {
        //     navigation.navigate('Home');
        // }).catch(error => {
        //     console.log(error);
        // });
    };

    return (
        <View style={styles.view}>
            <TextInput style={styles.inputs} label="Email Address" value={email} onChangeText={(email) => { setEmail(email) }} />
            <TextInput style={styles.inputs} label="Username" value={userName} onChangeText={(userName) => { setUsernName(userName) }} />
            <TextInput style={styles.inputs} secureTextEntry={true} label="Password" value={password}
                onChangeText={(password) => { setPassword(password) }} />
            <TextInput style={styles.inputs} secureTextEntry={true} label="Confirm Password" value={passwordConfirm}
                onChangeText={(passwordConfirm) => { setPasswordConfirm(passwordConfirm) }} />
            {submitErrors ? (
                <List.Item
                    title={submitErrors}
                // left={props => <List.Icon {...props} icon="folder" />}
                />
            ) : null}
            <Button style={styles.submitBtn} mode="contained" loading={showSpinner} onPress={() => signUpHandler()}>
                Sign Up
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

export default SignUp;