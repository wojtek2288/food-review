import { Spinner } from '@ui-kitten/components';
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import User from '../../responseTypes/User';
import { UserCard } from './UserCard';

interface UsersListProps {
    users: User[];
    onEndReached?: () => void;
    isLoading: boolean;
}

export const UsersList: React.FC<UsersListProps> = ({ users, onEndReached, isLoading }) => {
    return (
        <View style={styles.feedContainer}>
            {isLoading
                ? <Spinner status='warning' />
                : <FlatList
                    data={users}
                    renderItem={(user) => {
                        return (
                            <UserCard user={user.item} />
                        );
                    }}
                    keyExtractor={(item, index) => {
                        return item.id.toString();
                    }}
                    showsVerticalScrollIndicator={false}
                    onEndReached={onEndReached}
                />}

        </View>
    );
}

const styles = StyleSheet.create({
    feedContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '85 %'
    }
});