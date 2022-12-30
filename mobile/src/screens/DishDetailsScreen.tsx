import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Button } from '@ui-kitten/components';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Text, View } from 'react-native';
import { Price } from '../components/Common/Price.';
import { Rating } from '../components/Common/Rating';
import { TagCard } from '../components/Common/TagCard';
import { ReviewCard } from '../components/Reviews/ReviewCard';
import { ReviewModal } from '../components/Reviews/ReviewModal';
import Colors from '../constants/Colors';
import { dishes } from '../data/dishes';
import { reviews } from '../data/reviews';

export const DishDetailsScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { dishId } = route.params;
  const dish = dishes[2];
  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  return (
    <View>
      <View style={styles.arrow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='leftcircleo' size={45} color={Colors.background} />
        </TouchableOpacity>
      </View>
      {reviewModalVisible ? (
        <ReviewModal onClose={setReviewModalVisible} />
      ) : null}
      <FlatList
        nestedScrollEnabled={true}
        ListHeaderComponent={() => (
          <>
            <View style={styles.imageContainer}>
              <Image style={styles.dishImage} source={{ uri: dish.imageUrl }} />
            </View>
            <View style={styles.descriptionContainer}>
              <View style={styles.restaurantNameContainer}>
                <Text style={styles.restaurantName}>{dish.restaurantName}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.dishName}>{dish.name}</Text>
                <View style={styles.price}>
                  <Price price={dish.price} />
                </View>
                <View style={styles.rating}>
                  <Rating rating={dish.rating} />
                </View>
              </View>
              {dish.description === null ? null : (
                <ScrollView
                  nestedScrollEnabled={true}
                  contentContainerStyle={styles.dishDescriptionContainer}
                >
                  <Text style={styles.dishDescription}>{dish.description}</Text>
                </ScrollView>
              )}
              <View style={styles.tagsContainer}>
                {dish.tags.map((tag) => (
                  <TagCard key={tag.id} tag={tag} />
                ))}
              </View>
              <View style={styles.rateContainer}>
                <Button
                  style={styles.button}
                  onPress={() => setReviewModalVisible(true)}
                >
                  Rate
                </Button>
              </View>
            </View>
            <Text style={styles.headerText}>Reviews:</Text>
          </>
        )}
        data={reviews}
        renderItem={(review) => {
          return (
            <View style={styles.reviewContainer}>
              <ReviewCard review={review.item} key={review.item.id} />
            </View>
          );
        }}
        keyExtractor={(item, index) => {
          return item.id.toString();
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get('window').height / 3.5,
  },
  dishImage: {
    flex: 1,
    width: '100 %',
    height: '100 %',
  },
  descriptionContainer: {
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: '7.5 %',
  },
  reviewContainer: {
    flex: 1,
    width: '85 %',
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: '5 %',
    marginLeft: Dimensions.get('window').width * 0.075,
  },
  arrow: {
    position: 'absolute',
    left: '5 %',
    top: '5 %',
    zIndex: 999,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  restaurantNameContainer: {
    marginTop: '5 %',
  },
  ratingContainer: {
    height: Dimensions.get('window').height * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3 %',
    paddingVertical: 10,
    flexWrap: 'wrap',
  },
  rating: {
    height: '100 %',
    aspectRatio: 1,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: '200',
  },
  dishName: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    marginRight: '5 %',
  },
  dishDescriptionContainer: {
    marginTop: '3 %',
  },
  dishDescription: {
    fontSize: 15,
  },
  rateContainer: {
    alignItems: 'center',
    marginVertical: '3 %',
  },
  button: {
    backgroundColor: Colors.background,
    width: '100 %',
    borderColor: Colors.background,
    borderRadius: 10,
  },
});
