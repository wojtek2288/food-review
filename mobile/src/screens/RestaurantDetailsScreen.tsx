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
import { Rating } from '../components/Common/Rating';
import { TagCard } from '../components/Common/TagCard';
import { ReviewCard } from '../components/Reviews/ReviewCard';
import Colors from '../constants/Colors';
import { restaurants } from '../data/restaurants';
import { reviews } from '../data/reviews';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { useState } from 'react';
import Dish from '../responseTypes/Dish';
import Review from '../responseTypes/Review';
import { DishCard } from '../components/Dishes/DishCard';
import { dishes } from '../data/dishes';

export const RestaurantDetailsScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { restaurantId } = route.params;
  const [data, setData] = useState<any>(reviews);
  const restaurant = restaurants[2];

  return (
    <View>
      <View style={styles.arrow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='leftcircleo' size={45} color={Colors.background} />
        </TouchableOpacity>
      </View>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View style={styles.imageContainer}>
              <Image
                style={styles.dishImage}
                source={{ uri: restaurant.imageUrl }}
              />
            </View>
            <View style={styles.descriptionContainer}>
              <View style={styles.ratingContainer}>
                <Text style={styles.dishName}>{restaurant.name}</Text>
                <View style={styles.rating}>
                  <Rating rating={restaurant.rating} />
                </View>
              </View>
              {restaurant.description === null ? null : (
                <View style={styles.dishDescriptionContainer}>
                  <Text style={styles.dishDescription}>
                    {restaurant.description}
                  </Text>
                </View>
              )}
              <View style={styles.tagsContainer}>
                {restaurant.tags.map((tag) => (
                  <TagCard key={tag.id} tag={tag} />
                ))}
              </View>
              <View style={styles.rateContainer}>
                <Button style={styles.button}>Rate</Button>
              </View>
            </View>
            <BottomNavigation
              selectedIndex={selectedIndex}
              onSelect={(index) => {
                if (index === 1) {
                  setData(dishes);
                } else if (index === 0) {
                  setData(reviews);
                }
                setSelectedIndex(index);
              }}
              indicatorStyle={{ backgroundColor: Colors.background }}
              style={styles.navigator}
            >
              <BottomNavigationTab
                title={(evaProps) => (
                  <Text {...evaProps} style={styles.navigatorTab}>
                    Reviews
                  </Text>
                )}
              />
              <BottomNavigationTab
                title={(evaProps) => (
                  <Text {...evaProps} style={styles.navigatorTab}>
                    Dishes
                  </Text>
                )}
              />
            </BottomNavigation>
          </>
        )}
        data={data}
        renderItem={(data) => {
          return (
            <View style={styles.reviewContainer}>
              {selectedIndex === 0 ? (
                <ReviewCard review={data.item} key={data.item.id} />
              ) : (
                <DishCard
                  dish={data.item}
                  key={data.item.id}
                  navigation={navigation}
                />
              )}
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
  navigator: {
    backgroundColor: '#00000000',
  },
  navigatorTab: {
    color: Colors.darkText,
  },
});
