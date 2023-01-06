import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';

interface PriceProps {
  price: number;
}

export const Price: React.FC<PriceProps> = ({ price }) => {
  return (
    <View style={styles.priceContainer}>
      <Text style={styles.priceText}>{price.toFixed(2)} zł</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.background,
    padding: 5,
  },
  priceText: {
    color: Colors.background,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
