import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Text, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { DishCard } from '../components/Dishes/DishCard';
import { defaultPageSize } from '../constants/Pagination';
import UserDetailsResponse from '../responseTypes/UserDetailsResponse';
import UserReviewResponse from '../responseTypes/UserReviewResponse';
import { useUserDetailsQuery, useUserReviewsQuery } from '../api/services';
import { Spinner } from '@ui-kitten/components';
import { RestaurantCard } from '../components/Restaurants/RestaurantCard';

export default function UserDetailsScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [user, setUser] = useState<UserDetailsResponse | undefined>(undefined);
  const [reviews, setReviews] = useState<UserReviewResponse[] | undefined>(undefined);
  const detailsReq = {
    userId: route.params.userId,
  };
  const reviewsReq = {
    pageSize: defaultPageSize,
    pageCount: currentPage,
    userId: route.params.userId,
  };

  const { run: detailsRun, response: detailsResponse } = useUserDetailsQuery(detailsReq);
  const { run: reviewsRun, response: reviewsResponse, isLoading: areReviewsLoading } = useUserReviewsQuery(reviewsReq);

  useEffect(() => {
    detailsRun(detailsReq);
    reviewsRun(reviewsReq);
  }, []);

  useEffect(() => {
    setUser(detailsResponse);
  }, [detailsResponse]);

  useEffect(() => {
    if (reviewsResponse) {
      if (reviews !== undefined) {
        setReviews([...reviews, ...reviewsResponse.items]);
      }
      else {
        setReviews(reviewsResponse.items);
      }
      setCurrentPage(currentPage + 1);
      setTotalCount(reviewsResponse.totalCount);
    }
  }, [reviewsResponse]);

  const onEndReached = () => {
    if (currentPage * defaultPageSize >= totalCount || currentPage == 0 || areReviewsLoading) {
      return;
    }
    reviewsRun(reviewsReq);
  };

  return (
    <>
      {user === undefined ?
        <View style={styles.container}>
          <Spinner status='warning' />
        </View>
        : <>
          <View style={styles.arrow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name='leftcircleo' size={45} color={Colors.background} />
            </TouchableOpacity>
          </View>
          <FlatList
            ListHeaderComponent={() => (
              <>
                <View style={styles.container}>
                  <View style={styles.profile}>
                    <View style={styles.upperContainer}>
                      <View style={styles.avatarContainer}>
                        <Image
                          style={styles.profileAvatar}
                          source={
                            user.imageUrl == null
                              ? require('../assets/images/userEmpty.png')
                              : { uri: user.imageUrl }
                          }
                        />
                      </View>
                    </View>
                    <Text style={styles.username}>{user.username}</Text>
                    <View style={styles.desciptionContainer}>
                      <Text style={styles.description}>{user.description}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.headerText}>Reviews:</Text>
              </>
            )}
            data={reviews}
            renderItem={(review) => (
              <View style={styles.card}>
                {review.item.dishReview !== null ? <DishCard dish={review.item.dishReview} navigation={navigation} />
                  : <RestaurantCard restaurant={review.item.restaurantReview!} navigation={navigation} />}
              </View>
            )}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            showsVerticalScrollIndicator={false}
            onEndReached={onEndReached}
            ListFooterComponent={() =>
              <>
                {areReviewsLoading ?
                  <View style={styles.endOfListContainer}>
                    <Spinner status='warning' />
                  </View>
                  : null
                }
              </>
            }
          />
        </>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    flex: 1.5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightBackground,
    width: '100 %',
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    paddingTop: '10 %',
    paddingBottom: '3 %',
  },
  arrow: {
    position: 'absolute',
    left: '5 %',
    top: '5 %',
    zIndex: 999,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  upperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '3 %',
    flexDirection: 'row',
    width: '100 %',
    height: '30 %',
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.15,
  },
  profileAvatar: {
    flex: 1,
    width: '100 %',
    aspectRatio: 1,
    borderRadius: 1000,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '3 %',
    marginTop: '3 %'
  },
  desciptionContainer: {
    marginBottom: '3 %',
  },
  description: {
    marginHorizontal: '10 %',
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.background,
    width: '50 %',
    borderColor: Colors.background,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: '5 %',
    marginLeft: '7.5 %',
  },
  ratings: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '85 %',
  },
  card: {
    width: '85 %',
    alignSelf: 'center',
  },
  endOfListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
