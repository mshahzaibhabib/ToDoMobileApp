import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Card, Title, Paragraph, IconButton, Button, Colors, Avatar, TextInput } from 'react-native-paper';
// import axios from 'axios';
import axios from './../axios';
import { AuthContext } from './../context/authContext';



const AddNew = ({ navigation }) => {

    const { user } = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [task, setTask] = useState('');

    const submitTask = async () => {
        const res = await axios({
            method: 'POST',
            url: '/tasks',
            data: {
                title,
                task,
                userId: user.user._id
            }
        });

        if (res.status === 201) {
            console.log(`Task created with ID ${JSON.stringify(res.data)}`);
            navigation.navigate('Home')
        }
    }

    return (
        <Surface style={styles.surface}>
            <Card style={{ flex: 1 }}>
                <Card.Title title="Add New Task" />
                <Card.Content>
                    <TextInput
                        autoFocus={false}
                        label="Title"
                        value={title}
                        onChangeText={title => setTitle(title)} />
                    <TextInput
                        multiline
                        autoFocus={false}
                        label="You task goes here"
                        value={task}
                        onChangeText={task => setTask(task)} />
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => navigation.navigate('Home')}>Discard</Button>
                    <Button onPress={() => submitTask()} mode="contained">Save</Button>
                </Card.Actions>
            </Card>
        </Surface>
    );
};

const styles = StyleSheet.create({
    surface: {
        flex: 1,
        margin: 5,
        elevation: 4
    },
    paragraph: {
        fontSize: 15
    }
});

export default AddNew;