import React, { useCallback } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import Dish from '../../types/Dish';
import { DishCard } from './DishCard';

interface DishesListProps {
    dishes: Dish[];
    headerText?: string;
}

export const DishesList: React.FC<DishesListProps> = ({ dishes, headerText }) => {
    return (
        <View style={styles.dishesContainer}>
            <FlatList
                ListHeaderComponent={() =>
                    headerText == null
                        ? null
                        : <Text style={styles.headerText}>{headerText}</Text>}
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
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: '5 %',
    },
});