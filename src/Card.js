import { StyleSheet, View, Text } from "react-native";
import * as React from "react";

export default function Card() {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Text>okok</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        borderWidth: 2,
        elevation: 3,
        backgroundColor: "#fff",
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
    },
    cardContent: {},
});
