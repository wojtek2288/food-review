import { Spinner } from '@ui-kitten/components';
import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import Dish from '../../responseTypes/Dish';
import { DishCard } from './DishCard';

interface DishesListProps {
  headerText?: string;
  dishes: Dish[];
  onEndReached?: () => void;
  isLoading: boolean;
  navigation: any;
}

export const DishesList: React.FC<DishesListProps> = ({
  headerText,
  dishes,
  onEndReached,
  isLoading,
  navigation,
}) => {
  return (
    <View style={styles.dishesContainer}>
      {isLoading ? (
        <Spinner status='warning' />
      ) : (
        <FlatList
          ListHeaderComponent={() =>
            headerText == null ? null : (
              <Text style={styles.headerText}>{headerText}</Text>
            )
          }
          data={dishes}
          renderItem={(dish) => {
            return <DishCard dish={dish.item} navigation={navigation} />;
          }}
          keyExtractor={(item, _) => {
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
});
