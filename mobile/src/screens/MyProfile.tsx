import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { Text, View, Image, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { ProfileTabScreenProps } from '../types';
import { Button, Popover, Spinner } from '@ui-kitten/components';
import { dishes } from '../data/dishes';
import { DishCard } from '../components/Dishes/DishCard';
import * as SecureStore from 'expo-secure-store';
import UserDetailsResponse from '../responseTypes/UserDetailsResponse';
import UserReviewResponse from '../responseTypes/UserReviewResponse';
import { defaultPageSize } from '../constants/Pagination';
import { useMyProfileQuery, useMyReviewsQuery } from '../api/services';

export default function MyProfile({
  navigation,
}: ProfileTabScreenProps<'MyProfile'>) {
  const [token, setToken] = useState('');
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [user, setUser] = useState<UserDetailsResponse | undefined>(undefined);
  const [reviews, setReviews] = useState<UserReviewResponse[] | undefined>(undefined);
  const detailsReq = {};
  const reviewsReq = {
    pageSize: defaultPageSize,
    pageCount: currentPage
  };

  const { run: detailsRun, response: detailsResponse } = useMyProfileQuery(detailsReq);
  const { run: reviewsRun, response: reviewsResponse, isLoading: areReviewsLoading } = useMyReviewsQuery(reviewsReq);

  const fetchData = async () => {
    const token = await SecureStore.getItemAsync('accessToken');
    if (token === null) {
      navigation.replace('Profile');
    }
    else {
      setToken(token);
      detailsRun(detailsReq, token);
      reviewsRun(reviewsReq, token);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(detailsResponse);
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
    reviewsRun(reviewsReq, token);
  };

  return (
    <>
      {user === undefined ?
        <View style={styles.container}>
          <Spinner status='warning' />
        </View>
        :
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
                    <View style={styles.settingsContainer}>
                      <Popover
                        anchor={() =>
                          <Pressable
                            onPress={() => setPopoverVisible(true)}
                            style={({ pressed }) => ({
                              opacity: pressed ? 0.5 : 1,
                            })}
                          >
                            <AntDesign
                              name='down'
                              size={30}
                              color={Colors.darkText}
                            />
                          </Pressable>}
                        visible={popoverVisible}
                        placement='bottom end'
                        style={styles.popover}
                        onBackdropPress={() => setPopoverVisible(false)}>
                        <View style={styles.signOutContainer}>
                          <Pressable onPress={async () => {
                            await SecureStore.deleteItemAsync('refreshToken');
                            await SecureStore.deleteItemAsync('accessToken');
                            await SecureStore.deleteItemAsync('accessTokenExpiration');
                            navigation.replace('Profile');
                          }}>
                            <Text style={styles.signOutText}>
                              Sign Out
                            </Text>
                          </Pressable>
                        </View>
                      </Popover>
                    </View>
                  </View>
                  <Text style={styles.username}>{user.username}</Text>
                  <View style={styles.desciptionContainer}>
                    <Text style={styles.description}>{user.description}</Text>
                  </View>
                  <Button
                    onPress={() => navigation.navigate('Modal')}
                    style={styles.button}
                  >
                    Edit
                  </Button>
                </View>
                <View style={styles.ratings}></View>
              </View>
              <Text style={styles.headerText}>My Reviews:</Text>
            </>
          )}
          data={dishes}
          renderItem={(dish) => (
            <View style={styles.dishCard}>
              <DishCard dish={dish.item} navigation={navigation} />
            </View>
          )}
          keyExtractor={(item, index) => {
            return item.id.toString();
          }}
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
        />}

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
    marginLeft: 55,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.15,
  },
  settingsContainer: {
    alignSelf: 'flex-start',
    marginLeft: 'auto',
    marginRight: 15,
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
  dishCard: {
    width: '85 %',
    alignSelf: 'center',
  },
  popover: {
    borderWidth: 0,
  },
  signOutContainer: {
    marginTop: 10,
    padding: '10 %',
    backgroundColor: Colors.background,
    borderRadius: 20,
  },
  signOutText: {
    fontWeight: 'bold',
    color: 'white'
  }
});
