import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Auth from "./API.js";
import { Ionicons } from "@expo/vector-icons";
import { Search } from "./src/Search";
import { Settings } from "./src/Settings";
import { AccountScreen } from "./src/Account.js";
import { Login } from "./src/Login.js";
import { Home } from "./src/Home.js";
import { createStackNavigator } from "@react-navigation/stack";
import { Post } from "./src/Post";
import { Subreddit } from "./src/Subreddit";

WebBrowser.maybeCompleteAuthSession();

export function stackWrapper() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === "Home") {
                        return (
                            <Ionicons
                                name={"ios-home-outline"}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === "Account") {
                        return (
                            <Ionicons
                                name={"person-outline"}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === "Login") {
                        return (
                            <Ionicons
                                name={"log-in-outline"}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === "Settings") {
                        return (
                            <Ionicons
                                name={"settings-outline"}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === "Search") {
                        return (
                            <Ionicons
                                name={"ios-search-outline"}
                                size={size}
                                color={color}
                            />
                        );
                    }
                },
                tabBarInactiveTintColor: "gray",
                tabBarActiveTintColor: "tomato",
            })}
        >
            <Tab.Screen
                name="Login"
                component={Login}
                initialParams={{ api: API }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                initialParams={{ api: API }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                initialParams={{ api: API }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                initialParams={{ api: API }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                initialParams={{ api: API }}
            />
        </Tab.Navigator>
    );
}

const API = new Auth();

export default function App() {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ title: "Redditech" }}
                    name="App"
                    component={stackWrapper}
                />
                <Stack.Screen
                    options={{ title: "Redditech" }}
                    name="Post"
                    component={Post}
                    initialParams={{ api: API }}
                />
                <Stack.Screen
                    options={{ title: "Redditech" }}
                    name="Subreddit"
                    component={Subreddit}
                    initialParams={{ api: API }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    settingsSwitch: {
        flexDirection: "row",
        marginTop: 32,
    },
    logo: {
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D",
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10,
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16,
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32,
    },
    statsBox: {
        alignItems: "center",
        flex: 1,
    },
    containerButton: {
        marginTop: 200,
        margin: 10,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#FF4500",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 23,
        top: "-10%",
        color: "white",
        fontWeight: "bold",
    },
});
