import React, { useReducer, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';



const initialState = {
    user: null
};

AsyncStorage.getItem('@jwtToken').then(data => {
    console.log(`TOKEN : ${data}`);
    const decodedToken = jwtDecode(data);
    if (decodedToken.exp * 1000 < Date.now()) {
        return AsyncStorage.removeItem('@jwtToken')
    } else {
        initialState.user = decodedToken;
    }
}).catch(error => {
    console.log(error);
});

// if (AsyncStorage.getItem('@jwtToken')) {
//     const decodedToken = jwtDecode(AsyncStorage.getItem('@jwtToken'));

//     if (decodedToken.exp * 1000 < Date.now()) {
//         AsyncStorage.removeItem('@jwtToken');
//     } else {
//         initialState.user = decodedToken;
//     }
// }


const AuthContext = createContext({
    user: null,
    login: (userData) => { },
    logout: () => { }
});

// here we need to create a reducer, basically it receives an action with a type and a payload then 
// it determines what to do with those two depending on your functionality of your application
// it also takes an state because it needs to change the state
function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                // because we are logging in we getting some data and we want to set our user in our state
                // to this data
                user: action.payload
            }
        case 'LOGOUT':
            return {
                // when we log out we simply want to clear the data, we want to set the user back to normal
                ...state,
                user: null
            }
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // now that we have a dispatch we can use it to dispatch any action and then attach to it some type and
    // a payload and then that, when this dispatch this reducer will listen to it and then do, perform any 
    // action according to that dispatched action 
    async function login(userData) {
        await AsyncStorage.setItem("@jwtToken", userData.token);
        dispatch({
            // here we will dispatch action with
            type: 'LOGIN',
            payload: userData.data
        })
    }

    async function logout() {
        await AsyncStorage.removeItem("@jwtToken");
        dispatch({
            type: 'LOGOUT'
            // this would not have any paylod because that is how logout works
        })
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props} />
    )
}

// AuthContext - that is what we are going to use from our components to access our context
// AuthProvider - use in our app to wrap all of our application so that it would have access
// to this provider, to these functions from the context.
export { AuthContext, AuthProvider };