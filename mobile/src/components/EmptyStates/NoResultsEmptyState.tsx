import { Spinner } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

interface NoResultsEmptyStateProps {
    isLoading: boolean;
}

export const NoResultsEmptyState: React.FC<NoResultsEmptyStateProps> = ({ isLoading }) => {
    return (
        <View style={styles.container}>
            {isLoading
                ? <Spinner status='warning' />
                : <Image source={require('../../assets/images/noResultsEmptyState.png')} style={styles.image} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '50%',
        aspectRatio: 1,
    }
});