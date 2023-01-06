import { RequestType, useAxios } from '../hooks/useAxios';
import DishDetailsRequest from '../requestTypes.ts/DishDetailsRequest';
import DishReviewsRequest from '../requestTypes.ts/DishReviewsRequest';
import PaginatedRequest from '../requestTypes.ts/PaginatedRequest';
import PaginatedRequestWithSearch from '../requestTypes.ts/PaginatedRequestWithSearch';
import RegisterRequest from '../requestTypes.ts/RegisterRequest';
import Dish from '../responseTypes/Dish';
import DishDetailsResponse from '../responseTypes/DishDetailsResponse';
import ReviewResponse from '../responseTypes/ReviewResponse';
import PaginatedResult from '../responseTypes/PaginatedResult';
import Restaurant from '../responseTypes/Restaurant';
import User from '../responseTypes/User';
import RestaurantDetailsRequest from '../requestTypes.ts/RestaurantDetailsRequest';
import RestaurantDetailsResponse from '../responseTypes/RestaurantDetailsResponse';
import RestaurantReviewsRequest from '../requestTypes.ts/RestaurantReviewsRequest';
import RestaurantDishesRequest from '../requestTypes.ts/RestaurantDishesRequest';

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

export const useDishDetailsQuery = (req: DishDetailsRequest) => (
    useAxios<DishDetailsResponse, DishDetailsRequest>(RequestType.Query, 'Dishes.DishDetails', req)
)

export const useDishReviewsQuery = (req: DishReviewsRequest) => (
    useAxios<PaginatedResult<ReviewResponse>, DishReviewsRequest>(RequestType.Query, 'Dishes.DishReviews', req)
)

export const useRestaurantDetailsQuery = (req: RestaurantDetailsRequest) => (
    useAxios<RestaurantDetailsResponse, RestaurantDetailsRequest>(RequestType.Query, 'Restaurants.RestaurantDetails', req)
);

export const useRestaurantReviewsQuery = (req: RestaurantReviewsRequest) => (
    useAxios<PaginatedResult<ReviewResponse>, RestaurantReviewsRequest>(RequestType.Query, 'Restaurants.RestaurantReviews', req)
);

export const useRestaurantDishesQuery = (req: RestaurantDishesRequest) => (
    useAxios<PaginatedResult<Dish>, RestaurantDishesRequest>(RequestType.Query, 'Restaurants.RestaurantDishes', req)
);

export const useRegisterCommand = (req: RegisterRequest) => (
    useAxios<any, RegisterRequest>(RequestType.Command, 'Users.Register', req)
);