import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, View } from "react-native";
import Home from "./scenes/Home";
import Auth from "./scenes/Auth";
import Setup from "./scenes/Setup";
import Profile from "./scenes/Profile";
import useAuth from "./context/authContext";
import Ranking from "./scenes/Ranking";
import TabBarButton from "./components/TabBarButton";
import { COLORS } from "./constants";

const Stack = createNativeStackNavigator();
function StackGroup() {
    return (
        <Stack.Navigator 
            initialRouteName="Setup"
/*
            screenOptions={{
                headerStyle: {
                    margin: 20,
                    backgroundColor: COLORS.gray2, 
                    color: COLORS.yellow
                }
            }}
*/
        >   
            <Stack.Screen name='setup' component={Setup} options={{headerShown: false}}/>
            <Stack.Screen name='homeTab' component={HomeTab}  options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

//Important
/*
In React Native applications using React Navigation, the choice between using a tabBarIcon or a custom tabBarButton depends on your specific design and customization needs.
In the context of a React Navigation tab navigator, the focused prop is automatically provided by React Navigation to indicate whether a specific tab screen is currently focused or not. React Navigation manages the focus state internally and passes the focused prop to the components rendered by each tab screen.
*/

const Tab = createBottomTabNavigator();
function HomeTab ()  {
    return (
        <Tab.Navigator 
            initialRouteName="Home"

            screenOptions={{
                tabBarStyle: {
                    backgroundColor: COLORS.gray4,
                    position: 'absolute',
                    margin: 20,
                    height: 55,
                    borderRadius: 10,
                    borderTopWidth: 0,
                },                
                headerStyle: { backgroundColor: COLORS.yellow},
                headerShadowVisible: false,
                tabBarShowLabel: true,

            }}
        >
            <Tab.Screen 
                name="home" 
                component={Home} 
                options={{
                    headerTitle: "L A N G O",
                    tabBarLabel: 'Home',
//                    tabBarIcon: () => (<FontAwesome5 name="book-open" size={24} color={COLORS.gray3}/>),
                    tabBarButton: (props) => <TabBarButton {...props} name={'home'} label={'Home'}/>,
                }}
            />
            <Tab.Screen 
                name="rankings" 
                component={Ranking} 
                options={{
                    headerTitle: "Leaderboard",
                    tabBarLabel: 'LeaderBoard',
//                    tabBarIcon: () => (<MaterialIcons name="leaderboard" size={24} color={COLORS.gray3} />),
                    tabBarButton: (props) => <TabBarButton {...props} name={'bar-chart-2'} label={'Leaderboard'} />,
                }}
            />
            <Tab.Screen 
                name="profile" 
                component={Profile} 
                options={{
                    headerTitle: "Profile",
                    tabBarLabel: 'Profile',
//                    tabBarIcon: () => (<MaterialCommunityIcons name="face-man-profile" size={24} color={COLORS.gray3} />),
                    tabBarButton: (props) => <TabBarButton {...props} name={'user'} label={'Profile'}/>,
                }}
            />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    const {checkingLogged, token} = useAuth();

    if(checkingLogged){
        return (
          <View style={{flex: 1, alignContent: 'center', justifyContent: "center", backgroundColor: COLORS.gray3}}>
            <ActivityIndicator color={COLORS.yellow} size={"medium"}/>
          </View>
        )
      }

    return (
        <NavigationContainer>
            {token ? <StackGroup/> : <Auth />}
        </NavigationContainer>
    )
}
