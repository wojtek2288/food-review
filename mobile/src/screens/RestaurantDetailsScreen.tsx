import { AntDesign } from '@expo/vector-icons';
import { Button, Spinner } from '@ui-kitten/components';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text, View } from 'react-native';
import { Rating } from '../components/Common/Rating';
import { TagCard } from '../components/Common/TagCard';
import { ReviewCard } from '../components/Reviews/ReviewCard';
import Colors from '../constants/Colors';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { DishCard } from '../components/Dishes/DishCard';
import { ReviewModal } from '../components/Reviews/ReviewModal';
import { defaultPageSize } from '../constants/Pagination';
import { useRestaurantDetailsQuery, useRestaurantDishesQuery, useRestaurantReviewsQuery } from '../api/services';
import RestaurantDetailsResponse from '../responseTypes/RestaurantDetailsResponse';
import UserReviewResponse from '../responseTypes/UserReviewResponse';
import Dish from '../responseTypes/Dish';

export const RestaurantDetailsScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [data, setData] = useState<any>();
  const [reviews, setReviews] = useState<UserReviewResponse[] | undefined>(undefined);
  const [dishes, setDishes] = useState<Dish[] | undefined>(undefined);
  const [reviewsCurrentPage, setReviewsCurrentPage] = useState(0);
  const [reviewsTotalCount, setReviewsTotalCount] = useState(0);
  const [dishesCurrentPage, setDishesCurrentPage] = useState(0);
  const [dishesTotalCount, setDishesTotalCount] = useState(0);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [restaurant, setRestaurant] = useState<RestaurantDetailsResponse | undefined>(undefined);
  const detailsReq = {
    restaurantId: route.params.restaurantId,
  };
  const reviewsReq = {
    pageSize: defaultPageSize,
    pageCount: reviewsCurrentPage,
    restaurantId: route.params.restaurantId,
  };
  const dishesReq = {
    pageSize: defaultPageSize,
    pageCount: dishesCurrentPage,
    restaurantId: route.params.restaurantId,
  }

  const { run: detailsRun, response: detailsResponse } = useRestaurantDetailsQuery(detailsReq);
  const { run: reviewsRun, response: reviewsResponse, isLoading: areReviewsLoading } = useRestaurantReviewsQuery(reviewsReq);
  const { run: dishesRun, response: dishesResponse, isLoading: areDishesLoading } = useRestaurantDishesQuery(dishesReq);

  useEffect(() => {
    detailsRun(detailsReq);
    reviewsRun(reviewsReq);
    dishesRun(dishesReq);
  }, []);

  useEffect(() => {
    setRestaurant(detailsResponse);
  }, [detailsResponse]);

  useEffect(() => {
    if (reviewsResponse) {
      if (reviews !== undefined) {
        setReviews([...reviews, ...reviewsResponse.items]);
      }
      else {
        setReviews(reviewsResponse.items);
      }
      setReviewsCurrentPage(reviewsCurrentPage + 1);
      setReviewsTotalCount(reviewsResponse.totalCount);
    }
  }, [reviewsResponse]);

  useEffect(() => {
    if (dishesResponse) {
      if (dishes !== undefined) {
        setDishes([...dishes, ...dishesResponse.items]);
      }
      else {
        setDishes(dishesResponse.items);
      }
      setDishesCurrentPage(dishesCurrentPage + 1);
      setDishesTotalCount(dishesResponse.totalCount);
    }
  }, [dishesResponse]);

  useEffect(() => {
    if (selectedIndex === 0 && reviews !== undefined) {
      setData(reviews);
    }
  }, [reviews])

  useEffect(() => {
    if (selectedIndex === 1 && dishes !== undefined) {
      setData(dishes);
    }
  }, [dishes])

  const onEndReached = () => {
    if (selectedIndex === 0) {
      if (reviewsCurrentPage * defaultPageSize >= reviewsTotalCount || reviewsCurrentPage == 0 || areReviewsLoading) {
        console.log("reviews count: " + reviews?.length);
        return;
      }
      console.log("reviews end reached");
      reviewsRun(reviewsReq);
    }
    else if (selectedIndex === 1) {
      if (dishesCurrentPage * defaultPageSize >= dishesTotalCount || dishesCurrentPage == 0 || areDishesLoading) {
        console.log("dishes count: " + dishes?.length);
        return;
      }
      console.log("dishes end reached");
      dishesRun(dishesReq);
    }
  };

  return (
    <>
      {restaurant === undefined
        ? <View style={styles.container}>
          <Spinner status='warning' />
        </View>
        : <View>
          <View style={styles.arrow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name='leftcircleo' size={45} color={Colors.background} />
            </TouchableOpacity>
          </View>
          {reviewModalVisible ? (
            <ReviewModal onClose={setReviewModalVisible} />
          ) : null}
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
                    <Text style={styles.dishName}>{restaurant.restaurantName}</Text>
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
                    <Button
                      style={styles.button}
                      onPress={() => setReviewModalVisible(true)}
                    >
                      Rate
                    </Button>
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
            onEndReached={onEndReached}
            ListFooterComponent={() =>
              <>
                {(areReviewsLoading && selectedIndex === 0) || (areDishesLoading && selectedIndex === 1) ?
                  <View style={styles.endOfListContainer}>
                    <Spinner status='warning' />
                  </View>
                  : null
                }
              </>
            }
          />
        </View>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endOfListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
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
