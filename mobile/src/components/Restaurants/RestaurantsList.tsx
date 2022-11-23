import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import Restaurant from '../../types/Restaurant';
import { RestaurantCard } from './RestaurantCard';

interface RestaurantsListProps {
    restaurants: Restaurant[];
}

export const RestaurantsList: React.FC<RestaurantsListProps> = ({ restaurants }) => {
    return (
        <View style={styles.restaurantsContainer}>
            <FlatList
                data={restaurants}
                renderItem={(restaurant) => {
                    return (
                        <RestaurantCard restaurant={restaurant.item} />
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
    restaurantsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '85 %'
    }
});