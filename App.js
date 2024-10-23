import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from "./view/screen/Login";
import Register from "./view/screen/Register";
import Verify from "./view/screen/Verify";


const Stack = createStackNavigator();

function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login} // Đảm bảo đây là thành phần hợp lệ
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Register"
                    component={Register} // Đảm bảo đây là thành phần hợp lệ
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Verify"
                    component={Verify} // Đảm bảo đây là thành phần hợp lệ
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );

}

export default App;
