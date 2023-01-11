import { Spinner } from '@ui-kitten/components';
import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import Dish from '../../responseTypes/Dish';
import { DishCard } from './DishCard';

interface DishesListProps {
  headerComponent?: React.ComponentType<any>;
  dishes: Dish[];
  onEndReached?: () => void;
  isLoading: boolean;
  navigation: any;
}

export const DishesList: React.FC<DishesListProps> = ({
  headerComponent,
  dishes,
  onEndReached,
  isLoading,
  navigation,
}) => {
  return (
    <View style={styles.dishesContainer}>
      <FlatList
        ListHeaderComponent={headerComponent}
        data={dishes}
        renderItem={(dish) => {
          return <DishCard dish={dish.item} navigation={navigation} />;
        }}
        keyExtractor={(item, _) => {
          return item.id.toString();
        }}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        ListFooterComponent={() => isLoading
          ? <View style={styles.container}>
            <Spinner status='warning' />
          </View>
          : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dishesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '85 %',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: '5 %',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  }
});
