import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';
import Tag from '../../responseTypes/Tag';

interface TagCardProps {
  tag: Tag;
}

export const TagCard: React.FC<TagCardProps> = ({ tag }) => {
  return (
    <View style={styles(tag.colorHex).ratingContainer}>
      <Text style={styles(tag.colorHex).ratingText}>{tag.name}</Text>
    </View>
  );
};

const styles = (color: string) =>
  StyleSheet.create({
    ratingContainer: {
      borderRadius: 8,
      borderWidth: 2,
      borderColor: color,
      marginRight: '3 %',
      marginBottom: '3 %',
      padding: 5,
    },
    ratingText: {
      color: color,
      fontWeight: 'bold',
      fontSize: 15,
    },
  });
