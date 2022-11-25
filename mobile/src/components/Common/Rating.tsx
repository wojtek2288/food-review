import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';

interface RatingProps {
    rating: number;
}

export const Rating: React.FC<RatingProps> = ({ rating }) => {

    const color = getRatingColor(rating);

    return (
        <View style={styles(color).ratingContainer}>
            <Text style={styles(color).ratingText}>{rating}</Text>
        </View>
    );
}


const getRatingColor = (rating: number): string => {
    let color: string;
    if (rating < 5) {
        color = 'red';
    }
    else if (rating >= 5 && rating < 7.5) {
        color = 'orange';
    }
    else {
        color = 'green';
    }

    return color;
};

const styles = (color: string) => StyleSheet.create({
    ratingContainer: {
        width: '80 %',
        aspectRatio: 1,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    ratingText: {
        color: Colors.lightText,
        fontWeight: 'bold',
    }
});
