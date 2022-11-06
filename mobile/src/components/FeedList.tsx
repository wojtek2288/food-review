import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import FeedDish from '../types/FeedDish';
import { FeedItem } from './FeedItem';

interface FeedListProps {
    dishes: FeedDish[];
}

export const FeedList: React.FC<FeedListProps> = ({ dishes }) => {
    return (
        <View style={styles.feedContainer}>
            <FlatList
                data={dishes}
                renderItem={(dish) => {
                    return (
                        <FeedItem dish={dish.item} />
                    );
                }}
                keyExtractor={(item, index) => {
                    return item.id.toString();
                }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    feedContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '8 %',
        width: '85 %'
    }
});