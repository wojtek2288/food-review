import { Spinner } from '@ui-kitten/components';
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import Restaurant from '../../responseTypes/Restaurant';
import { RestaurantCard } from './RestaurantCard';

interface RestaurantsListProps {
  restaurants: Restaurant[];
  onEndReached?: () => void;
  isLoading: boolean;
  navigation: any;
}

export const RestaurantsList: React.FC<RestaurantsListProps> = ({
  restaurants,
  onEndReached,
  isLoading,
  navigation,
}) => {
  return (
    <View style={styles.restaurantsContainer}>
      {isLoading ? (
        <Spinner status='warning' />
      ) : (
        <FlatList
          data={restaurants}
          renderItem={(restaurant) => {
            return (
              <RestaurantCard
                restaurant={restaurant.item}
                navigation={navigation}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id.toString();
          }}
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  restaurantsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '85 %',
  },
});
