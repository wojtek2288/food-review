import { View } from 'react-native';
import { users } from '../../data/users';
import { UsersEmptyState } from '../EmptyStates/UsersEmptyState';
import { UsersList } from '../Users/UsersList';

interface UsersSearchProps {
    searchPhrase: string;
}

export const UsersSearch: React.FC<UsersSearchProps> = ({ searchPhrase }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {searchPhrase === '' ? <UsersEmptyState /> : <UsersList users={users} />}
        </View>
    );
}