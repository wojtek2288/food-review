import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import User from '../../types/User';
import { UserCard } from './UserCard';

interface UsersListProps {
    users: User[];
}

export const UsersList: React.FC<UsersListProps> = ({ users }) => {
    return (
        <View style={styles.feedContainer}>
            <FlatList
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
            />
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