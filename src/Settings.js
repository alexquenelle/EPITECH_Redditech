import * as React from "react";
import { StyleSheet, View, Text, SafeAreaView, Switch } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";

export function Settings({ route, navigation }) {
    const { api } = route.params;
    const [data, setData] = useState({});
    const isFocused = useIsFocused();

    let [isEnabledPM, setIsEnabledPM] = useState(false);
    let [isEnabledCR, setIsEnabledCR] = useState(false);
    let [isEnabledUSF, setIsEnabledUSF] = useState(false);
    let [isEnabledCRY, setIsEnabledCRY] = useState(false);
    let [isEnabledUM, setIsEnabledUM] = useState(false);
    let [isEnabledPR, setIsEnabledPR] = useState(false);

    useEffect(() => {
        if (isFocused)
            api.makeRequest("https://oauth.reddit.com/api/v1/me/prefs").then(
                (data) => {
                    setData(data);
                    setIsEnabledPM(data.email_private_message);
                    setIsEnabledCR(data.email_chat_request);
                    setIsEnabledUSF(data.email_user_new_follower);
                    setIsEnabledCRY(data.email_comment_reply);
                    setIsEnabledUM(data.email_username_mention);
                    setIsEnabledPR(data.email_post_reply);
                }
            );
    }, [isFocused]);

    const toggleSwitchPM = async () => {
        data.email_private_message = !isEnabledPM;
        await api.patchRequest(
            "https://oauth.reddit.com/api/v1/me/prefs",
            data
        );
        setIsEnabledPM((previousState) => !previousState);
        console.log("setIsEnabledPM");
    };

    const toggleSwitchCR = async () => {
        data.email_chat_request = !isEnabledCR;
        await api.patchRequest(
            "https://oauth.reddit.com/api/v1/me/prefs",
            data
        );
        setIsEnabledCR((previousState) => !previousState);
        console.log("setIsEnabledCR");
    };

    const toggleSwitchUSF = async () => {
        data.email_user_new_follower = !isEnabledUSF;
        await api.patchRequest(
            "https://oauth.reddit.com/api/v1/me/prefs",
            data
        );
        setIsEnabledUSF((previousState) => !previousState);
        console.log("setIsEnabledUSF");
    };

    const toggleSwitchCRY = async () => {
        data.email_comment_reply = !isEnabledCRY;
        await api.patchRequest(
            "https://oauth.reddit.com/api/v1/me/prefs",
            data
        );
        setIsEnabledCRY((previousState) => !previousState);
        console.log("setIsEnabledCRY");
    };

    const toggleSwitchdUM = async () => {
        data.email_username_mention = !isEnabledUM;
        await api.patchRequest(
            "https://oauth.reddit.com/api/v1/me/prefs",
            data
        );
        setIsEnabledUM((previousState) => !previousState);
        console.log("setIsEnabledUM");
    };

    const toggleSwitchPR = async () => {
        data.email_post_reply = !isEnabledPR;
        await api.patchRequest(
            "https://oauth.reddit.com/api/v1/me/prefs",
            data
        );
        setIsEnabledPR((previousState) => !previousState);
        console.log("setIsEnabledPR");
    };

    return (
        <SafeAreaView>
            <View style={styles.settingsSwitch}>
                <Text
                    style={[
                        styles.text,
                        { fontWeight: "200", fontSize: 24, marginLeft: 10 },
                    ]}
                >
                    Email alert private message
                </Text>
                <View style={styles.statsBox}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#ff4500" }}
                        thumbColor={isEnabledPM ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchPM}
                        value={isEnabledPM}
                    />
                </View>
            </View>
            <View
                style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    margin: 15,
                }}
            />
            <View style={styles.settingsSwitch}>
                <Text
                    style={[
                        styles.text,
                        { fontWeight: "200", fontSize: 24, marginLeft: 10 },
                    ]}
                >
                    Email alert chat request
                </Text>
                <View style={styles.statsBox}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#ff4500" }}
                        thumbColor={isEnabledCR ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchCR}
                        value={isEnabledCR}
                    />
                </View>
            </View>
            <View
                style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    margin: 15,
                }}
            />
            <View style={styles.settingsSwitch}>
                <Text
                    style={[
                        styles.text,
                        { fontWeight: "200", fontSize: 24, marginLeft: 10 },
                    ]}
                >
                    Email alert new follower
                </Text>
                <View style={styles.statsBox}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#ff4500" }}
                        thumbColor={isEnabledUSF ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchUSF}
                        value={isEnabledUSF}
                    />
                </View>
            </View>
            <View
                style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    margin: 15,
                }}
            />
            <View style={styles.settingsSwitch}>
                <Text
                    style={[
                        styles.text,
                        { fontWeight: "200", fontSize: 24, marginLeft: 10 },
                    ]}
                >
                    Email alert comment reply
                </Text>
                <View style={styles.statsBox}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#ff4500" }}
                        thumbColor={isEnabledCRY ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchCRY}
                        value={isEnabledCRY}
                    />
                </View>
            </View>
            <View
                style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    margin: 15,
                }}
            />
            <View style={styles.settingsSwitch}>
                <Text
                    style={[
                        styles.text,
                        { fontWeight: "200", fontSize: 24, marginLeft: 10 },
                    ]}
                >
                    Email alert user mention
                </Text>
                <View style={styles.statsBox}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#ff4500" }}
                        thumbColor={isEnabledUM ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchdUM}
                        value={isEnabledUM}
                    />
                </View>
            </View>
            <View
                style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    margin: 15,
                }}
            />
            <View style={styles.settingsSwitch}>
                <Text
                    style={[
                        styles.text,
                        { fontWeight: "200", fontSize: 24, marginLeft: 10 },
                    ]}
                >
                    Email alert post reply
                </Text>
                <View style={styles.statsBox}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#ff4500" }}
                        thumbColor={isEnabledPR ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchPR}
                        value={isEnabledPR}
                    />
                </View>
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
