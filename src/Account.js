import * as React from "react";
import { useEffect, useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SubredditCard } from "./Subreddit";

export function AccountScreen({ route, navigation }) {
    const [data, setData] = useState({
        icon_img:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/2048px-Solid_white.svg.png",
    });

    let [description, setDescription] = useState();
    let [subreddits, setSubreddits] = useState([]);
    const { api } = route.params;

    const isFocused = useIsFocused();

    async function getSubreddits() {
        let subs = await api.makeRequest(
            "https://oauth.reddit.com/subreddits/mine.json"
        );
        setSubreddits(subs.data.children.map((v) => v.data));
    }

    useEffect(() => {
        if (isFocused) {
            getSubreddits();
            api.makeRequest("https://oauth.reddit.com/api/v1/me").then(
                (data) => {
                    setData(data);
                    setDescription(data.subreddit.public_description);
                }
            );
        }
    }, [isFocused]);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image
                            source={{
                                uri: data.icon_img.replace(/&amp;/g, "&"),
                            }}
                            style={styles.image}
                            resizeMode="cover"
                        ></Image>
                    </View>
                    <View style={styles.active}></View>
                </View>
                <View style={styles.infoContainer}>
                    <Text
                        style={[
                            styles.text,
                            { fontWeight: "200", fontSize: 36 },
                        ]}
                    >
                        {data.name}
                    </Text>
                    <Text
                        style={[
                            styles.text,
                            { color: "#AEB5BC", fontSize: 14 },
                        ]}
                    >
                        Reddit
                    </Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>
                            {data.coins}
                        </Text>
                        <Text style={[styles.text, styles.subText]}>Coins</Text>
                    </View>
                    <View
                        style={[
                            styles.statsBox,
                            {
                                borderColor: "#DFD8C8",
                                borderLeftWidth: 1,
                                borderRightWidth: 1,
                            },
                        ]}
                    >
                        <Text style={[styles.text, { fontSize: 24 }]}>
                            {data.total_karma}
                        </Text>
                        <Text style={[styles.text, styles.subText]}>Karma</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>
                            {data.num_friends}
                        </Text>
                        <Text style={[styles.text, styles.subText]}>
                            Friends
                        </Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text
                        style={[
                            styles.text,
                            { color: "#AEB5BC", fontSize: 20, margin: 20 },
                        ]}
                    >
                        Profile Description :
                    </Text>
                    <Text
                        style={[
                            styles.text,
                            {
                                fontWeight: "200",
                                fontSize: 36,
                                marginBottom: 15,
                            },
                        ]}
                    >
                        {description}
                    </Text>
                </View>
                <View
                    style={{
                        borderBottomColor: "black",
                        borderBottomWidth: 2,
                        marginLeft: 15,
                        marginRight: 15,
                        marginTop: 15,
                    }}
                />
                <View style={styles.infoContainer}>
                    <Text
                        style={[
                            styles.text,
                            { color: "#AEB5BC", fontSize: 20, margin: 20 },
                        ]}
                    >
                        Your Subreddits :
                    </Text>
                </View>
                {subreddits.map((data) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.push("Subreddit", {
                                    data: data,
                                    api: api,
                                })
                            }
                            key={Math.random()}
                        >
                            <SubredditCard api={api} data={data} />
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
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
