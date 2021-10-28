// todo recuperer les subreddits du mec
//  recueprer les posts,
//  ajouter un tri

import * as React from 'react';
import {
    Button,
    StyleSheet,
    View,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Switch
} from 'react-native';
import {useEffect, useState} from 'react';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {SearchBar} from 'react-native-elements';
import {Searchbar} from 'react-native-paper';

export function Home({route, navigation}) {

    const [searchQuery, setSearchQuery] = React.useState('');
    const {api} = route.params;

    const onChangeSearch = query => {
        setSearchQuery(query)
        api.makeRequest('https://www.reddit.com/search.json?q=hello').then(console.log)
        //
    };
    console.log(searchQuery)

    return (
        <View>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                onIconPress={() => navigation.navigate('Search', {searchQuery: searchQuery})}
                value={searchQuery}
            />
            <Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    settingsSwitch: {
        flexDirection: "row",
        // alignSelf: "center",
        marginTop: 32,
        // flexDirection: "row",
        // justifyContent: "flex-end"
    },
    logo: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    containerButton: {
        marginTop: 200,
        margin: 10
    },
    button: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#FF4500',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 23,
        top: '-10%',
        color: 'white',
        fontWeight: 'bold',
    },
});