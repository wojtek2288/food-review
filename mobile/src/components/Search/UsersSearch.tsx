import React from 'react';
import { View } from 'react-native';
import User from '../../responseTypes/User';
import { NoResultsEmptyState } from '../EmptyStates/NoResultsEmptyState';
import { UsersEmptyState } from '../EmptyStates/UsersEmptyState';
import { UsersList } from '../Users/UsersList';
import PaginatedResult from '../../responseTypes/PaginatedResult';

interface UsersSearchProps {
  users: PaginatedResult<User>;
  searchPhrase: string;
  isLoading: boolean;
  navigation: any;
}

export const UsersSearch: React.FC<UsersSearchProps> = ({
  users,
  searchPhrase,
  isLoading,
  navigation,
}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {searchPhrase === '' ? (
        <UsersEmptyState />
      ) : users.items.length == 0 ? (
        <NoResultsEmptyState isLoading={isLoading} />
      ) : (
        <UsersList
          users={users.items}
          isLoading={isLoading}
          navigation={navigation}
        />
      )}
    </View>
  );
};
