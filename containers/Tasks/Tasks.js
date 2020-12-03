import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View } from 'react-native';
import { } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
// import axios from 'axios';
import axios from './../../axios';
import TaskItem from './TaskItem';
import { AuthContext } from '../../context/authContext';


const Tasks = (props) => {

    const { user } = useContext(AuthContext);

    const [tasks, setTasks] = useState([{}]);
    // const [fetchedTasks, setFetchedTasks] = useState([{}]);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            axios.get(`/tasks?userId=${user.user._id}`).then(response => {
                // console.log(JSON.stringify(response, null, 2));
                setTasks(response.data);
            }).catch(error => {
                console.log(error);
                console.log('Unfortunately we got an error');
            })
        });
        return unsubscribe;
    }, [props.navigation]);

    useEffect(() => {
        console.log('USER OBJECT');
        console.log(JSON.stringify(user, null, 2));
        // console.log(user.user._id);
    });

    return (
        <View>
            {tasks.map(task => {
                return <TaskItem key={`${task.id}`} navigation={props.navigation} id={task.id} title={task.title} task={task.task}
                    createdAt={task.createdAt} />
            })}
        </View>
    );
};

export default Tasks;