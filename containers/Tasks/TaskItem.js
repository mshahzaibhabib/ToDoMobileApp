import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Surface, IconButton, Colors } from 'react-native-paper';


const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const TaskItem = (props) => {

    const taskObj = {
        id: props.id,
        title: props.title,
        task: props.task,
        createdAt: props.createdAt
    }

    return (
        <Surface style={styles.surface}>
            <Card onPress={() => props.navigation.navigate('Task', taskObj)}>
                <Card.Title title={props.title} />
                <Card.Content>
                    <Paragraph style={styles.paragraph}>{props.task}</Paragraph>
                </Card.Content>
                {/* <Card.Actions>
                    <Button>Delete</Button>
                </Card.Actions> */}
            </Card>
        </Surface>
    );
};

const styles = StyleSheet.create({
    surface: {
        margin: 5,
        // padding: 8,
        // height: 80,
        // width: 80,
        // alignItems: 'center',
        // justifyContent: 'center',
        elevation: 4,
    },
    paragraph: {
        fontSize: 15
    }
});

export default TaskItem;