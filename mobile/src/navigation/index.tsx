/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import Feed from '../screens/Feed';
import Search from '../screens/Search';
import {
  FeedStackParamList,
  ProfileStackParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
  SearchStackParamList,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import MyProfile from '../screens/MyProfile';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Profile from '../screens/Profile';
import { DishDetailsScreen } from '../screens/DishDetailsScreen';
import { RestaurantDetailsScreen } from '../screens/RestaurantDetailsScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const FeedStack = createNativeStackNavigator<FeedStackParamList>();
const SearchStack = createNativeStackNavigator<SearchStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}

function ProfileTab() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name='Profile'
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name='MyProfile'
        component={MyProfile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name='Login'
        component={Login}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name='Register'
        component={Register}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name='DishDetailsScreen'
        options={{ headerShown: false }}
      >
        {(props) => <DishDetailsScreen {...props} />}
      </SearchStack.Screen>
      <SearchStack.Screen
        name='RestaurantDetailsScreen'
        options={{ headerShown: false }}
      >
        {(props) => <RestaurantDetailsScreen {...props} />}
      </SearchStack.Screen>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name='Modal'
          component={ModalScreen}
          options={{ title: 'Settings' }}
        />
      </Stack.Group>
    </ProfileStack.Navigator>
  );
}

function FeedTab() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name='Feed'
        component={Feed}
        options={{ headerShown: false }}
      />
      <FeedStack.Screen
        name='DishDetailsScreen'
        options={{ headerShown: false }}
      >
        {(props) => <DishDetailsScreen {...props} />}
      </FeedStack.Screen>
    </FeedStack.Navigator>
  );
}

function SearchTab() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name='Search'
        component={Search}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name='DishDetailsScreen'
        options={{ headerShown: false }}
      >
        {(props) => <DishDetailsScreen {...props} />}
      </SearchStack.Screen>
      <SearchStack.Screen
        name='RestaurantDetailsScreen'
        options={{ headerShown: false }}
      >
        {(props) => <RestaurantDetailsScreen {...props} />}
      </SearchStack.Screen>
      <SearchStack.Screen
        name='UserDetailsScreen'
        options={{ headerShown: false }}
      >
        {(props) => <UserDetailsScreen {...props} />}
      </SearchStack.Screen>
    </SearchStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName='FeedTab'
      screenOptions={{
        tabBarActiveTintColor: Colors.lightText,
        tabBarInactiveTintColor: Colors.inActive,
        tabBarActiveBackgroundColor: Colors.background,
        tabBarInactiveBackgroundColor: Colors.background,
        headerShown: false,
        headerTintColor: Colors.darkText,
        headerStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <BottomTab.Screen
        name='FeedTab'
        component={FeedTab}
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='SearchTab'
        component={SearchTab}
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name='search' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='ProfileTab'
        component={ProfileTab}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name='user' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
