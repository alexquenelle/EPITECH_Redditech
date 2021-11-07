import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, IconButton } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

export function CommentCard(props) {
    const isFocused = useIsFocused();

    const api = props.api;
    const data = props.data;

    let vote = data.likes === true ? 1 : data.likes === false ? 2 : 0;
    const comment_id = props.data.name;
    const body = props.data.body;
    const authorName = props.data.author;
    const authorId = props.data.author_fullname;
    const ups = props.data.ups;
    const downs = props.data.downs;
    const score = props.data.score;

    let [voteComment, setVoteComment] = useState(0);
    let [comments, setComments] = useState([]);

    useEffect(() => {
        if (isFocused) {
            setVoteComment(vote);
        }
    }, [isFocused]);

    const toggleSwitchVoteUP = async () => {
        if (voteComment === 1) {
            setVoteComment(0);
            unVote(comment_id, api);
        } else {
            setVoteComment(1);
            upVote(comment_id, api);
        }
    };

    const toggleSwitchVoteDown = async () => {
        if (voteComment === -1) {
            setVoteComment(0);
            unVote(comment_id, api);
        } else {
            setVoteComment(-1);
            downVote(comment_id, api);
        }
    };

    async function downVote() {
        let formData = new FormData();
        formData.append("id", comment_id);
        formData.append("dir", -1);
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

    async function unVote() {
        let formData = new FormData();
        formData.append("id", comment_id);
        formData.append("dir", 0);
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

    async function upVote() {
        let formData = new FormData();
        formData.append("id", comment_id);
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

    async function sendComment(string) {
        let formData = new FormData();
        formData.append("thing_id", comment_id);
        formData.append("text", string);
        const url = "https://oauth.reddit.com/api/comment";
        let res = await fetch(url, {
            method: "POST",
            headers: { Authorization: "bearer " + api.access_token },
            "User-agent": "redditech",
        });
        res = await res.json();
        return res; // surement inutile
    }

    const round_ups = abbrNum(ups, 1);

    return (
        <View style={styles.card}>
            <Text style={[styles.text, { fontSize: 15, margin: 10 }]}>
                {`Commented by `}
                {authorName}
            </Text>
            <Text style={[styles.text, { fontSize: 15, margin: 10 }]}>
                {body}
            </Text>
            <View style={styles.circle}>
                <View style={styles.statsContainer}>
                    <IconButton
                        icon={
                            voteComment === 1 ? "thumb-up" : "thumb-up-outline"
                        }
                        color={Colors.red500}
                        size={30}
                        onPress={() => toggleSwitchVoteUP()}
                    />
                    <Text style={[styles.likes_ups, { fontSize: 15 }]}>
                        {round_ups}
                    </Text>
                    <IconButton
                        icon={
                            voteComment === -1
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
        alignSelf: "center",
        alignItems: "center",
        borderWidth: 1,
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
    likes_ups: {
        margin: 5,
        fontFamily: "HelveticaNeue",
        color: "#52575D",
    },
    text: {
        margin: 15,
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
