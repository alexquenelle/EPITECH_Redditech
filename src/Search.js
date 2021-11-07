import * as React from "react";
import { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { PostCard } from "./Post";
import { SubredditCard } from "./Subreddit";

export function Search({ route, navigation }) {
    const { api, searchQuery } = route.params;
    const [data, setData] = useState();
    const isFocused = useIsFocused();
    const [newSeachQuery, setSearchQuery] = React.useState("");
    const [autoCompleteVals, setAutoComplete] = React.useState([]);

    const sort = ["relevance", "hot", "top", "new", "comments"];
    const t = ["hour", "day", "week", "month", "year", "all"];

    async function autoComplete(query) {
        api.makeRequest(
            "https://oauth.reddit.com/api/subreddit_autocomplete_v2?include_profiles=false&limit=10&query=" +
                encodeURI(query)
        ).then((res) => {
            setAutoComplete(res.data.children /*.map(v => v.data)*/);
        });
        setSearchQuery(query);
    }

    return (
        <View>
            <Searchbar
                placeholder="Search"
                onChangeText={autoComplete}
                defaultValue={searchQuery}
                value={newSeachQuery}
            />
            <ScrollView>
                {autoCompleteVals.map((v) => {
                    if (v.kind === "t3")
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.push("Post", {
                                        data: v.data,
                                        api: api,
                                    })
                                }
                                key={Math.random()}
                            >
                                <PostCard api={api} data={v.data} />
                            </TouchableOpacity>
                        );
                    else if (v.kind === "t5")
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.push("Subreddit", {
                                        data: v.data,
                                        api: api,
                                    })
                                }
                                key={Math.random()}
                            >
                                <SubredditCard
                                    api={api}
                                    data={v.data}
                                    key={Math.random()}
                                />
                            </TouchableOpacity>
                        );
                })}
            </ScrollView>
        </View>
    );
}
