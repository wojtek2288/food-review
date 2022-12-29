import { View } from 'react-native';
import { RestaurantsEmptyState } from '../EmptyStates/RestaurantsEmptyState';
import { RestaurantsList } from '../Restaurants/RestaurantsList';
import Restaurant from '../../responseTypes/Restaurant';
import React from 'react';
import { NoResultsEmptyState } from '../EmptyStates/NoResultsEmptyState';
import PaginatedResult from '../../responseTypes/PaginatedResult';

interface RestaurantsSearchProps {
  restaurants: PaginatedResult<Restaurant>;
  searchPhrase: string;
  isLoading: boolean;
  navigation: any;
}

export const RestaurantsSearch: React.FC<RestaurantsSearchProps> = ({
  restaurants,
  searchPhrase,
  isLoading,
  navigation,
}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {searchPhrase === '' ? (
        <RestaurantsEmptyState />
      ) : restaurants.items.length == 0 ? (
        <NoResultsEmptyState isLoading={isLoading} />
      ) : (
        <RestaurantsList
          restaurants={restaurants.items}
          isLoading={isLoading}
          navigation={navigation}
        />
      )}
    </View>
  );
};
