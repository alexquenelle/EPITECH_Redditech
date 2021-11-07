import * as React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import Auth from "../API.js";

const url = {
    authorizationEndpoint: "https://www.reddit.com/api/v1/authorize.compact",
    tokenEndpoint: "https://www.reddit.com/api/v1/access_token",
};

export function Login({ route, navigation }) {
    const { api } = route.params;
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: "e3t0ixFSw5lrApAqVPrGMA",
            scopes: Auth.scopes,
            redirectUri: makeRedirectUri({
                native: "myapp://redirect",
            }),
        },
        url
    );

    useEffect(() => {
        if (response?.type === "success") {
            const { code } = response.params;
            api.getAccessToken(code).then((token) => {
                navigation.navigate("Home");
            });
        }
    }, [response]);

    return (
        <SafeAreaView>
            <View style={styles.logo}>
                <Image source={require("./../assets/reddit_logo.png")} />
            </View>
            <View style={styles.containerButton}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => promptAsync()}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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