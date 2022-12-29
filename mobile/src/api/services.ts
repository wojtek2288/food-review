import { RequestType, useAxios } from '../hooks/useAxios';
import PaginatedRequest from '../requestTypes.ts/PaginatedRequest';
import PaginatedRequestWithSearch from '../requestTypes.ts/PaginatedRequestWithSearch';
import RegisterRequest from '../requestTypes.ts/RegisterRequest';
import Dish from '../responseTypes/Dish';
import PaginatedResult from '../responseTypes/PaginatedResult';
import Restaurant from '../responseTypes/Restaurant';
import User from '../responseTypes/User';

export const useFeedQuery = (req: PaginatedRequest) => (
    useAxios<PaginatedResult<Dish>, PaginatedRequest>(RequestType.Query, 'Dishes.Feed', req)
);

export const useSearchDishesQuery = (req: PaginatedRequestWithSearch) => (
    useAxios<PaginatedResult<Dish>, PaginatedRequestWithSearch>(RequestType.Query, 'Dishes.SearchDishes', req)
);

export const useSearchRestaurantsQuery = (req: PaginatedRequestWithSearch) => (
    useAxios<PaginatedResult<Restaurant>, PaginatedRequestWithSearch>(RequestType.Query, 'Restaurants.SearchRestaurants', req)
);

export const useSearchUsersQuery = (req: PaginatedRequestWithSearch) => (
    useAxios<PaginatedResult<User>, PaginatedRequestWithSearch>(RequestType.Query, 'Users.SearchUsers', req)
);

export const useRegisterCommand = (req: RegisterRequest) => (
    useAxios<any, RegisterRequest>(RequestType.Command, 'Users.Register', req)
);