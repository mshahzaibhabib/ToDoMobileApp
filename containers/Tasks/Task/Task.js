import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Card, Title, Paragraph, IconButton, Button, Colors, Avatar, TextInput } from 'react-native-paper';
// import axios from 'axios';
import axios from './../../../axios';



const Task = ({ route, navigation }) => {

    const { id, createdAt } = route.params;

    const [title, setTitle] = useState(route.params.title);
    const [task, setTask] = useState(route.params.task);

    const deleteTaskHandler = async () => {
        const res = await axios({
            method: 'DELETE',
            url: `/tasks/${id}`
        });

        if (res.status === 200) {
            console.log('Task Deleted');
            navigation.navigate('Home');
        }
    }

    const updateTaskHandler = async () => {
        const res = await axios({
            method: 'PATCH',
            url: `/tasks/${id}`,
            data: {
                title,
                task
            }
        });

        if (res.status === 200) {
            console.log('Task Updated');
            navigation.navigate('Home');
        }
    }

    return (
        <Surface style={styles.surface}>
            <Card style={{ flex: 1 }}>
                <Card.Title title="Task" subtitle={createdAt} />
                <Card.Content>
                    {/* <Paragraph style={styles.paragraph}>Some task that needs to be completed. Some task that needs to be completed. Some task that needs to be completed. Some task that needs to be completed.</Paragraph> */}
                    <TextInput
                        autoFocus={false}
                        value={title}
                        onChangeText={title => setTitle(title)} />
                    <TextInput
                        multiline
                        autoFocus={false}
                        value={task}
                        onChangeText={task => setTask(task)} />
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => updateTaskHandler()}>Update</Button>
                    <Button onPress={() => deleteTaskHandler()} mode="contained">Delete</Button>
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

export default Task;




// {/* <Surface style={styles.surface}>
//             <Card style={{ flex: 1 }}>
//                 <Card.Title title={JSON.stringify(id)} />
//                 <Card.Content>
//                     {/* <Paragraph style={styles.paragraph}>Some task that needs to be completed. Some task that needs to be completed. Some task that needs to be completed. Some task that needs to be completed.</Paragraph> */}
//                     <TextInput
//                         multiline
//                         autoFocus={false}
//                         value="Some task that needs to be completed. Some task that needs to be completed. Some task that needs to be completed. Some task that needs to be completed. Some task that needs to be completed. Some task that needs to be completed. Some task that needs to be completed. Some task that needs to be completed." />
//                 </Card.Content>
//                 <Card.Actions>
//                     <Button>Update</Button>
//                     <Button onPress={() => navigation.navigate('Home')} mode="contained">Delete</Button>
//                 </Card.Actions>
//             </Card>
//         </Surface> */}