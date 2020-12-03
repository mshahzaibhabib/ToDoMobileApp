import React, { useState, useContext } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { FAB, Colors, Button, Surface, Card, Title, Paragraph } from 'react-native-paper';
import Tasks from './Tasks/Tasks';
import { AuthContext } from './../context/authContext';



const HomeScreen = ({ navigation }) => {

    const { user } = useContext(AuthContext);

    const [tasks, setTasks] = useState({});

    return (
        <>
            {user ? (
                <>
                    <ScrollView style={styles.view}>
                        <Tasks navigation={navigation} />
                    </ScrollView>
                    <FAB
                        style={styles.fab}
                        icon="plus"
                        onPress={() => navigation.navigate('NewTask')}
                    />
                </>
            ) : (
                    <Surface style={styles.surface}>
                        <Card>
                            <Card.Title title="You are not logged in" />
                            <Card.Content>
                                {/* <Title>Card title</Title> */}
                            </Card.Content>
                            <Card.Actions>
                                <Button onPress={() => navigation.navigate('SignUp')}>Sign Up</Button>
                                <Button mode='contained' onPress={() => navigation.navigate('SignIn')}>Sign In</Button>
                            </Card.Actions>
                        </Card>
                    </Surface>
                )}
        </>
    );
};

const styles = StyleSheet.create({
    surface: {
        margin: 30,
        elevation: 4,
    },
    view: {
        flex: 1,
        flexDirection: "column"
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
});

export default HomeScreen;