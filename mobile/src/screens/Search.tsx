import React, { useEffect, useMemo, useState } from 'react';
import Colors from '../constants/Colors';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SearchBar } from '../components/Search/SearchBar';
import { RestaurantsSearch } from '../components/Search/RestaurantsSearch';
import { DishesSearch } from '../components/Search/DishesSearch';
import { UsersSearch } from '../components/Search/UsersSearch';
import { defaultPageSize } from '../constants/Pagination';
import {
  useSearchDishesQuery,
  useSearchRestaurantsQuery,
  useSearchUsersQuery,
} from '../api/services';
import _ from 'lodash';

export default function Search({ navigation }: any) {
  const [searchPhrase, setSearchPhrase] = useState('');
  const Tab = createMaterialTopTabNavigator();
  const NavigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.background,
    },
  };

  const req = {
    pageSize: defaultPageSize,
    pageCount: 0,
    searchPhrase: searchPhrase,
  };

  const dishes = useSearchDishesQuery(req);
  const restaurants = useSearchRestaurantsQuery(req);
  const users = useSearchUsersQuery(req);

  const debounce = useMemo(
    () =>
      _.debounce((_searchPhrase: string) => {
        const req = {
          pageSize: defaultPageSize,
          pageCount: 0,
          searchPhrase: _searchPhrase,
        };
        dishes.run(req);
        restaurants.run(req);
        users.run(req);
      }, 500),
    []
  );

  useEffect(() => {
    debounce(searchPhrase);
  }, [searchPhrase]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
        />
      </View>
      <NavigationContainer independent={true} theme={NavigationTheme}>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 12,
              textTransform: 'none',
            },
            tabBarStyle: {
              backgroundColor: 'transparent',
            },
            swipeEnabled: true,
          }}
          initialRouteName='Dishes'
        >
          <Tab.Screen
            name='Dishes'
            children={() => (
              <DishesSearch
                dishes={
                  dishes.response
                    ? dishes.response
                    : { items: [], totalCount: 0 }
                }
                searchPhrase={searchPhrase}
                isLoading={dishes.isLoading}
                navigation={navigation}
              />
            )}
          />
          <Tab.Screen
            name='Restaurants'
            children={() => (
              <RestaurantsSearch
                restaurants={
                  restaurants.response
                    ? restaurants.response
                    : { items: [], totalCount: 0 }
                }
                isLoading={restaurants.isLoading}
                searchPhrase={searchPhrase}
                navigation={navigation}
              />
            )}
          />
          <Tab.Screen
            name='Users'
            children={() => (
              <UsersSearch
                users={
                  users.response ? users.response : { items: [], totalCount: 0 }
                }
                isLoading={users.isLoading}
                searchPhrase={searchPhrase}
                navigation={navigation}
              />
            )}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 2,
  },
  searchContainer: {
    marginTop: '15 %',
    marginHorizontal: '8 %',
  },
  navigationContainer: {
    fontSize: 10,
  },
});
