import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./scenes/Home";
import Auth from "./scenes/Auth";
import Setup from "./scenes/Setup";
import ProfileWidget from "./components/ProfileWidget";
import useAuth from "./context/authContext";
import { ActivityIndicator, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
import Ranking from "./scenes/Ranking";
import { FontAwesome5 } from '@expo/vector-icons';

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
        <Tab.Navigator 
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: { position: 'absolute' },                
                tabBarActiveBackgroundColor: '#11111115'
            }}
        >
            <Tab.Screen 
                name="home" 
                component={Home} 
                options={{
                    headerTitle: "LANGO",
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (<FontAwesome5 name="book-open" size={24} color="black" />)
                }}
            />
            <Tab.Screen 
                name="rankings" 
                component={Ranking} 
                options={{
                    headerTitle: "Leaderboard",
                    tabBarLabel: 'LeaderBoard',
                    tabBarIcon: () => (<MaterialIcons name="leaderboard" size={24} color="black" />)
                }}
            />
            <Tab.Screen 
                name="profile" 
                component={ProfileWidget} 
                options={{
                    headerTitle: "Profile",
                    tabBarLabel: 'Profile',
                    tabBarIcon: () => (<MaterialCommunityIcons name="face-man-profile" size={24} color="black" />)
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
