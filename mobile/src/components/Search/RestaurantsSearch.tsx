import { View } from 'react-native';
import { RestaurantsEmptyState } from '../EmptyStates/RestaurantsEmptyState';
import { RestaurantsList } from '../Restaurants/RestaurantsList';
import { restaurants } from '../../data/restaurants';

interface RestaurantsSearchProps {
    searchPhrase: string;
}

export const RestaurantsSearch: React.FC<RestaurantsSearchProps> = ({ searchPhrase }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {searchPhrase === '' ? <RestaurantsEmptyState /> : <RestaurantsList restaurants={restaurants} />}
        </View>
    );
}