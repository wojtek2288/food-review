/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  DishDetails: undefined;
};

export type ProfileStackParamList = {
  Register: undefined;
  MyProfile: undefined;
  Login: undefined;
  Profile: undefined;
  Modal: undefined;
};

export type FeedStackParamList = {
  Feed: undefined;
  DishDetailsScreen: undefined;
  DishCard: undefined;
  DishList: undefined;
};

export type SearchStackParamList = {
  Search: undefined;
  DishDetailsScreen: undefined;
  RestaurantDetailsScreen: undefined;
  UserDetailsScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  FeedTab: undefined;
  SearchTab: undefined;
  Login: undefined;
  Register: undefined;
  ProfileTab: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type ProfileTabScreenProps<Screen extends keyof ProfileStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<ProfileStackParamList, Screen>,
    NativeStackScreenProps<ProfileStackParamList>
  >;

export type FeedTabScreenProps<Screen extends keyof FeedStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<FeedStackParamList, Screen>,
    NativeStackScreenProps<FeedStackParamList>
  >;

export type SearchTabScreenProps<Screen extends keyof SearchStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<SearchStackParamList, Screen>,
    NativeStackScreenProps<SearchStackParamList>
  >;
