import * as React from "react";
import { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { PostCard } from "./Post";

export function SubredditCard(props) {
    const api = props.api;
    const data = props.data;

    const displayName = data.display_name;
    const prefixedName = data.display_name_prefixed;

    const post_id = data.name;
    const bannerURL = data.banner_img;
    const iconURL = data.icon_img;
    const headerURL = data.header_img;
    const short_desc = data.public_description;
    const desc = data.description;
    const subscriberCount = data.subscribers;
    const createdAt = data.created_utc;

    let [is_subed, setSub] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        setSub(data.user_is_subscriber);
    }, [isFocused]);

    async function subscribeTo() {
        let formData = new FormData();
        formData.append("sr", post_id);
        formData.append("action", "sub");
        const url = "https://oauth.reddit.com/api/subscribe";
        let res = await fetch(url, {
            method: "POST",
            headers: { Authorization: "bearer " + api.access_token },
            "User-agent": "redditech",
            body: formData,
            Accept: "application/json",
        });
        console.log(await res.text());
        data.user_is_subscriber = !is_subed;
        setSub(!is_subed);

        return res;
    }

    async function unsubscribeTo() {
        let formData = new FormData();
        formData.append("sr", post_id);
        formData.append("action", "unsub");
        const url = "https://oauth.reddit.com/api/subscribe";
        let res = await fetch(url, {
            method: "POST",
            headers: { Authorization: "bearer " + api.access_token },
            "User-agent": "redditech",
            body: formData,
        });

        data.user_is_subscriber = !is_subed;
        setSub(!is_subed);

        return res;
    }

    async function toggleSubscription() {
        if (is_subed) {
            await unsubscribeTo();
        } else {
            await subscribeTo();
        }
    }

    const round_subscribers = abbrNum(subscriberCount, 1);

    return (
        <View style={styles.card}>
            <View style={styles.statsContainer}>
                <Image
                    source={{
                        uri:
                            iconURL ||
                            "https://b.thumbs.redditmedia.com/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo.png",
                    }}
                    style={{ width: 30, height: 30, borderRadius: 15 }}
                />
                <Text style={[styles.text, { fontSize: 15 }]}>
                    {prefixedName}
                    {" - "}
                    {round_subscribers}
                    {" Subscribers"}
                    {"\n"}
                </Text>
            </View>
            <View style={{ marginLeft: 10 }}>
                <Switch
                    trackColor={{ false: "#767577", true: "#007bff" }}
                    thumbColor={is_subed ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSubscription}
                    value={is_subed}
                />
            </View>

            <View>
                <Text style={[styles.text, { fontSize: 15 }]}>
                    {short_desc}
                </Text>
            </View>
        </View>
    );
}

function abbrNum(number, decPlaces) {
    decPlaces = Math.pow(10, decPlaces);
    var abbrev = ["k", "m", "b", "t"];

    for (var i = abbrev.length - 1; i >= 0; i--) {
        var size = Math.pow(10, (i + 1) * 3);
        if (size <= number) {
            number = Math.round((number * decPlaces) / size) / decPlaces;
            if (number == 1000 && i < abbrev.length - 1) {
                number = 1;
                i++;
            }
            number += abbrev[i];
            break;
        }
    }

    return number;
}

export function Subreddit({ route, navigation }) {
    const { data, api } = route.params;

    const displayName = data.display_name;
    const prefixedName = data.display_name_prefixed;

    const url = data.url;
    const post_id = data.name;
    const bannerURL = data.banner_img;
    const iconURL = data.icon_img;
    const headerURL = data.header_img;
    const short_desc = data.public_description;
    const desc = data.description;
    const subscriberCount = data.subscribers;
    const createdAt = data.created_utc;

    let [is_subed, setSub] = useState(false);
    let [posts, setPosts] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) return;
        setSub(data.user_is_subscriber);
        fetchPosts().then(() => {});
    }, [isFocused]);

    async function subscribeTo() {
        let formData = new FormData();
        formData.append("sr", post_id);
        formData.append("action", "sub");
        const url = "https://oauth.reddit.com/api/subscribe";
        let res = await fetch(url, {
            method: "POST",
            headers: { Authorization: "bearer " + api.access_token },
            "User-agent": "redditech",
            body: formData,
            Accept: "application/json",
        });
        console.log(await res.text());
        setSub(!is_subed);

        return res;
    }

    async function unsubscribeTo() {
        let formData = new FormData();
        formData.append("sr", post_id);
        formData.append("action", "unsub");
        const url = "https://oauth.reddit.com/api/subscribe";
        let res = await fetch(url, {
            method: "POST",
            headers: { Authorization: "bearer " + api.access_token },
            "User-agent": "redditech",
            body: formData,
        });

        setSub(!is_subed);

        return res;
    }

    async function toggleSubscription() {
        if (is_subed) {
            await unsubscribeTo();
        } else {
            await subscribeTo();
        }
    }

    async function fetchPosts(sort = "best") {
        const res = await api.makeRequest(
            "https://oauth.reddit.com" + url + sort + ".json"
        );

        setPosts(res.data.children.map((v) => v.data));
    }

    let i = 0;

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
                        onPress={() => fetchPosts("best")}
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
                        onPress={() => fetchPosts("new")}
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
                        onPress={() => fetchPosts("hot")}
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
                            key={i++}
                        >
                            <PostCard
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
    card: {
        borderRadius: 15,
        borderWidth: 2,
        elevation: 3,
        backgroundColor: "#fff",
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        margin: 10,
    },
    text: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        marginBottom: 10,
        fontFamily: "HelveticaNeue",
        color: "#52575D",
        fontSize: 20,
    },
    statsContainer: {
        flexDirection: "row",
        marginTop: 10,
        marginLeft: 10,
    },

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
