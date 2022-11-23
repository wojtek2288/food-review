import { View } from 'react-native';
import { dishes } from '../../data/dishes';
import { DishesEmptyState } from '../EmptyStates/DishesEmptyState';
import { DishesList } from '../Dishes/DishesList';

interface DishesSearchProps {
    searchPhrase: string;
}

export const DishesSearch: React.FC<DishesSearchProps> = ({ searchPhrase }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {searchPhrase === '' ? <DishesEmptyState /> : <DishesList dishes={dishes} />}
        </View>
    );
}