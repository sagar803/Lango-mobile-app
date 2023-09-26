import { NavigationContainer } from "@react-navigation/native";
import Home from "./scenes/Home";
import Auth from "./scenes/Auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileWidget from "./components/ProfileWidget";
import { useState } from "react";
import useAuth from "./context/authContext";
import { ActivityIndicator, View } from "react-native";
import Setup from "./scenes/Setup";

const Stack = createNativeStackNavigator();
function StackGroup() {
    return (
        <Stack.Navigator initialRouteName="Setup">
            <Stack.Screen name='setup' component={Setup} options={{headerShown: false}}/>
            <Stack.Screen name='homeTab' component={HomeTab}  options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();
function HomeTab ()  {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen 
                name="home" 
                component={Home} 
                options={{
                    headerTitle: "LANGO"
                }}
            />
            <Tab.Screen 
                name="rankings" 
                component={ProfileWidget} 
                options={{
                    headerTitle: "Leaderboard"
                }}
            />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    const {checkingLogged, token} = useAuth();

    if(checkingLogged){
        return (
          <View style={{flex: 1, alignContent: 'center', justifyContent: "center"}}>
            <ActivityIndicator />
          </View>
        )
      }

    return (
        <NavigationContainer>
            {token ? <StackGroup/> : <Auth />}
        </NavigationContainer>
    )
}
