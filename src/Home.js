import * as React from "react";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { PostCard } from "./Post";

export function Home({ route, navigation }) {
    const [searchQuery, setSearchQuery] = React.useState("");
    const { api } = route.params;
    let [posts, setPosts] = useState([]);
    let [subs, setSubs] = useState([]);

    const onChangeSearch = (query) => {
        setSearchQuery(query);
        api.makeRequest("https://www.reddit.com/search.json?q=hello").then(
            console.log
        );
    };

    async function fetchData(sort = "hot") {
        const data = await api.makeRequest(
            `https://oauth.reddit.com/${sort}.json`
        );
        const new_posts = data.data.children
            .filter((p) => p.kind === "t3")
            .map((p) => p.data);
        const new_subs = data.data.children
            .filter((p) => p.kind === "t5")
            .map((p) => p.data);

        setPosts(new_posts);
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) fetchData().then();
    }, [isFocused]);

    let i = 0;

    console.log("loaded");
    return (
        <View>
            <View style={styles.statsContainerSort}>
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
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => fetchData("best")}
                    >
                        <Text style={styles.buttonText}>{"Best"}</Text>
                    </TouchableOpacity>
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
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => fetchData("new")}
                    >
                        <Text style={styles.buttonText}>{"New"}</Text>
                    </TouchableOpacity>
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
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => fetchData("hot")}
                    >
                        <Text style={styles.buttonText}>{"Hot"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                {posts.map((element) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.push("Post", {
                                    data: element,
                                    api: api,
                                })
                            }
                            key={++i}
                        >
                            <PostCard
                                onClick={() => console.log("clicked")}
                                style={{ cursor: "pointer" }}
                                api={api}
                                data={element}
                            />
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
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
    statsContainerSort: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10,
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
