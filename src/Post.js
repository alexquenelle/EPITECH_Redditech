import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { useEffect, useState } from "react";
import { Video } from "expo-av";
import { CommentCard } from "./Comment";
import { Colors, IconButton } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

export function PostCard(props) {
    const { api, data } = props;

    let [isVoteUp, setIsVoteUp] = useState(false);
    let [isVoteDown, setIsVoteDown] = useState(false);
    const isFocused = useIsFocused();
    if (!data) {
        return (
            <View>
                <Text>{"buffer"}</Text>
            </View>
        );
    }

    let vote = data.likes === true ? 1 : data.likes === false ? 2 : 0;

    const subreddit = data.subreddit_name_prefixed;
    const title = data.title;
    const ups = data.ups;
    const downs = data.downs;
    const score = data.score;
    let mediaValue = undefined;
    const post_id = data.name;
    const desc = data.selftext;
    const authorName = data.author;
    const authorId = data.author_fullname;

    let [postVote, setPostVote] = useState(0);

    let mediaType = undefined;
    switch (data.post_hint) {
        case "hosted:video":
            mediaType = "video";
            mediaValue = data.media.reddit_video.scrubber_media_url;
            break;
        case "image":
            mediaType = "image";
            mediaValue = data.url;
            break;
        case "self":
            mediaType = "self";
            mediaValue = data.selftext;
            break;
    }

    useEffect(() => {
        if (isFocused) {
            setPostVote(vote);
        }
    }, [isFocused]);

    const toggleSwitchVoteUP = async () => {
        if (postVote === 1) {
            setPostVote(0);
            unVote(post_id, api).then(() => (data.likes = 0));
        } else {
            setPostVote(1);
            upVote(post_id, api).then(() => (data.likes = 1));
        }
    };

    const toggleSwitchVoteDown = async () => {
        if (postVote === -1) {
            setPostVote(0);
            unVote(post_id, api).then(() => (data.likes = 0));
        } else {
            setPostVote(-1);
            downVote(post_id, api).then(() => (data.likes = -1));
        }
    };

    const round_ups = abbrNum(ups, 1);

    return (
        <View style={styles.card}>
            <Text style={[styles.text, { fontSize: 15 }]}>
                {`Made by `}
                {authorName}
                {` on subreddit `}
                {subreddit}
                {"\n"}
                {"\n"}
                {title}
            </Text>
            <RenderURL type={mediaType} value={mediaValue}></RenderURL>
            <View style={styles.circle}>
                <View style={styles.statsContainer}>
                    <IconButton
                        icon={postVote === 1 ? "thumb-up" : "thumb-up-outline"}
                        color={Colors.red500}
                        size={30}
                        onPress={() => toggleSwitchVoteUP()}
                    />
                    <Text style={[styles.likes_ups, { fontSize: 15 }]}>
                        {round_ups}
                    </Text>
                    <IconButton
                        icon={
                            postVote === -1
                                ? "thumb-down"
                                : "thumb-down-outline"
                        }
                        color={Colors.red500}
                        size={30}
                        onPress={() => toggleSwitchVoteDown()}
                    />
                </View>
            </View>
        </View>
    );
}

async function upVote(post_id, api) {
    let formData = new FormData();
    formData.append("id", post_id);
    formData.append("dir", 1);
    const url = "https://oauth.reddit.com/api/vote";
    let res = await fetch(url, {
        method: "POST",
        headers: { Authorization: "bearer " + api.access_token },
        "User-agent": "redditech",
        body: formData,
    });
    res = await res.json();
    console.log("up voted");
    return res; // surement inutile
}

async function downVote(post_id, api) {
    let formData = new FormData();
    formData.append("id", post_id);
    formData.append("dir", -1);
    const url = "https://oauth.reddit.com/api/vote";
    let res = await fetch(url, {
        method: "POST",
        headers: { Authorization: "bearer " + api.access_token },
        "User-agent": "redditech",
        body: formData,
    });
    res = await res.json();
    console.log("down voted");
    return res; // surement inutile
}

async function unVote(post_id, api) {
    let formData = new FormData();
    formData.append("id", post_id);
    formData.append("dir", 0);
    const url = "https://oauth.reddit.com/api/vote";
    let res = await fetch(url, {
        method: "POST",
        headers: { Authorization: "bearer " + api.access_token },
        "User-agent": "redditech",
        body: formData,
    });
    res = await res.json();
    console.log("un voted");
    return res; // surement inutile
}

function displayBar(props) {
    if (props.type == "video") {
        const video = React.useRef(null);
        const [status, setStatus] = React.useState({});
        return (
            <View
                style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    marginRight: 10,
                    marginLeft: 10,
                    marginBottom: 10,
                }}
            />
        );
    } else if (props.type == "image") {
        return (
            <View
                style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    marginRight: 10,
                    marginLeft: 10,
                    marginBottom: 10,
                }}
            />
        );
    } else {
        return <Text></Text>;
    }
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

function RenderURL(props) {
    if (props.type == "video") {
        const video = React.useRef(null);
        const [status, setStatus] = React.useState({});
        return (
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: props.value,
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
        );
    } else if (props.type == "image") {
        return (
            <Image
                source={{ uri: props.value }}
                style={{ height: 350, borderRadius: 15, margin: 10 }}
            />
        );
    } else {
        return <Text></Text>;
    }
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        elevation: 3,
        borderWidth: 2,
        backgroundColor: "#fff",
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        margin: 10,
    },
    circle: {
        flex: 1,
        borderWidth: 1,
        alignSelf: "center",
        alignItems: "center",
        width: 180,
        height: 65,
        borderRadius: 45,
        elevation: 3,
        backgroundColor: "#fff",
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 1,
        shadowRadius: 2,
        marginHorizontal: 4,
        margin: 10,
    },
    text: {
        margin: 15,
        fontFamily: "HelveticaNeue",
        color: "#52575D",
    },
    likes_ups: {
        margin: 5,
        fontFamily: "HelveticaNeue",
        color: "#52575D",
    },
    video: {
        alignSelf: "center",
        width: 320,
        height: 200,
        borderRadius: 15,
        margin: 10,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 10,
    },
});

export function Post({ route, navigation }) {
    const { data, api } = route.params;

    if (!data) {
        return (
            <View>
                <Text>{"buffer"}</Text>
            </View>
        );
    }
    let [sort, setSort] = useState("best");
    let [comments, setComments] = useState([]);

    const subreddit = data.subreddit_name_prefixed;
    const url = data.url;
    const title = data.title;
    const ups = data.ups;
    const downs = data.downs;
    const score = data.score;
    let mediaValue = undefined;
    const post_id = data.name;
    const id = data.id;
    const desc = data.selftext;
    const authorName = data.author;
    const authorId = data.author_fullname;

    let mediaType = undefined;
    switch (data.post_hint) {
        case "hosted:video":
            mediaType = "video";
            mediaValue = data.media.reddit_video.scrubber_media_url;
            break;
        case "image":
            mediaType = "image";
            mediaValue = data.url; // todo
            break;
        case "self":
            mediaType = "self";
            mediaValue = data.selftext;
            break;
    }

    async function sendComment(string) {
        let formData = new FormData();
        formData.append("thing_id", post_id);
        formData.append("text", string);
        const url = "https://oauth.reddit.com/api/comment";
        let res = await fetch(url, {
            method: "POST",
            headers: { Authorization: "bearer " + api.access_token },
            "User-agent": "redditech",
            body: formData,
        });
        res = await res.json();
        if (!res.error) {
            state.comments.push(res);
            setState(state);
        }
        return res; // surement inutile
    }

    async function changeSort(new_sort) {
        setSort(new_sort);
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) fetchComments();
    }, [isFocused]);

    async function fetchComments() {
        let data = await api.makeRequest(
            `https://www.reddit.com/${subreddit}/${id}.json?sort=${sort}`
        );

        setComments(
            data
                .map((v) => v.data.children)
                .flat(1)
                .filter((v) => v.kind === "t1")
                .map((v) => v.data)
        );
    }

    return (
        <View>
            <ScrollView>
                <Text style={[styles.text, { fontSize: 20 }]}>{title}</Text>
                {comments.map((comment) => {
                    return (
                        <CommentCard
                            data={comment}
                            api={api}
                            key={Math.random()}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}
