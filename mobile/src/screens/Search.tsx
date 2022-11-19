import React, { useState } from 'react';
import Colors from '../constants/Colors';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SearchBar } from '../components/Search/SearchBar';
import { RestaurantsSearch } from '../components/Search/RestaurantsSearch';
import { DishesSearch } from '../components/Search/DishesSearch';
import { UsersSearch } from '../components/Search/UsersSearch';

export default function Search() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const Tab = createMaterialTopTabNavigator();
  const NavigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.background,
    },
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.mainContainer}>
        <View style={styles.searchContainer}>
          <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />
        </View>
        <NavigationContainer independent={true} theme={NavigationTheme}>
          <Tab.Navigator
            screenOptions={
              {
                tabBarLabelStyle:
                {
                  fontSize: 12,
                  textTransform: 'none',
                },
                tabBarStyle: {
                  backgroundColor: 'transparent'
                }
              }}>
            <Tab.Screen name="Dishes" children={() => <DishesSearch searchPhrase={searchPhrase} />} />
            <Tab.Screen name="Restaurants" children={() => <RestaurantsSearch searchPhrase={searchPhrase} />} />
            <Tab.Screen name="Users" children={() => <UsersSearch searchPhrase={searchPhrase} />} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 2
  },
  searchContainer: {
    marginTop: '15 %',
    marginHorizontal: '8 %'
  },
  navigationContainer: {
    fontSize: 10
  }
});
