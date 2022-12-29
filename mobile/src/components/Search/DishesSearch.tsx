import { View } from 'react-native';
import { DishesEmptyState } from '../EmptyStates/DishesEmptyState';
import { DishesList } from '../Dishes/DishesList';
import Dish from '../../responseTypes/Dish';
import { NoResultsEmptyState } from '../EmptyStates/NoResultsEmptyState';
import PaginatedResult from '../../responseTypes/PaginatedResult';

interface DishesSearchProps {
  dishes: PaginatedResult<Dish>;
  searchPhrase: string;
  isLoading: boolean;
  navigation: any;
}

export const DishesSearch: React.FC<DishesSearchProps> = ({
  dishes,
  searchPhrase,
  isLoading,
  navigation,
}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {searchPhrase === '' ? (
        <DishesEmptyState />
      ) : dishes.items.length == 0 ? (
        <NoResultsEmptyState isLoading={isLoading} />
      ) : (
        <DishesList
          dishes={dishes.items}
          isLoading={isLoading}
          navigation={navigation}
        />
      )}
    </View>
  );
};
