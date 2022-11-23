import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import Dish from '../../types/Dish';
import { DishCard } from './DishCard';

interface DishesListProps {
    dishes: Dish[];
}

export const DishesList: React.FC<DishesListProps> = ({ dishes }) => {
    return (
        <View style={styles.dishesContainer}>
            <FlatList
                data={dishes}
                renderItem={(dish) => {
                    return (
                        <DishCard dish={dish.item} />
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
    dishesContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '85 %'
    }
});