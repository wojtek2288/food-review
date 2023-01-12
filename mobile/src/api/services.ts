import { RequestType, useAxios } from '../hooks/useAxios';
import DishDetailsRequest from '../requestTypes.ts/DishDetailsRequest';
import DishReviewsRequest from '../requestTypes.ts/DishReviewsRequest';
import PaginatedRequest from '../requestTypes.ts/PaginatedRequest';
import PaginatedRequestWithSearch from '../requestTypes.ts/PaginatedRequestWithSearch';
import RegisterRequest from '../requestTypes.ts/RegisterRequest';
import Dish from '../responseTypes/Dish';
import DishDetailsResponse from '../responseTypes/DishDetailsResponse';
import MyReviewResponse from '../responseTypes/MyReviewResponse';
import PaginatedResult from '../responseTypes/PaginatedResult';
import Restaurant from '../responseTypes/Restaurant';
import User from '../responseTypes/User';
import RestaurantDetailsRequest from '../requestTypes.ts/RestaurantDetailsRequest';
import RestaurantDetailsResponse from '../responseTypes/RestaurantDetailsResponse';
import RestaurantReviewsRequest from '../requestTypes.ts/RestaurantReviewsRequest';
import RestaurantDishesRequest from '../requestTypes.ts/RestaurantDishesRequest';
import UserDetailsRequest from '../requestTypes.ts/UserDetailsRequest';
import UserDetailsResponse from '../responseTypes/UserDetailsResponse';
import UserReviewsRequest from '../requestTypes.ts/UserReviewsRequest';
import ReviewResponse from '../responseTypes/ReviewResponse';
import AddReviewRequest from '../requestTypes.ts/AddReviewRequest';
import EditMyDescriptionRequest from '../requestTypes.ts/EditMyDescriptionRequest';
import UserReviewResponse from '../responseTypes/UserReviewResponse';
import DeleteReviewRequest from '../requestTypes.ts/DeleteReviewRequest';
import EditReviewRequest from '../requestTypes.ts/EditReviewRequest';
import FeedRequest from '../requestTypes.ts/FeedRequest';
import Tag from '../responseTypes/Tag';
import PhotoUploadLinkRequest from '../requestTypes.ts/PhotoUploadLinkRequest';

export const useFeedQuery = (req: FeedRequest) => (
    useAxios<PaginatedResult<Dish>, FeedRequest>(RequestType.Query, 'Dishes.Feed', req)
);

export const useTagsQuery = (req: {}) => (
    useAxios<Tag[], {}>(RequestType.Query, 'Common.Tags', req)
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
);

export const useUserDetailsQuery = (req: UserDetailsRequest) => (
    useAxios<UserDetailsResponse, UserDetailsRequest>(RequestType.Query, 'Users.UserDetails', req)
);

export const useUserReviewsQuery = (req: UserReviewsRequest) => (
    useAxios<PaginatedResult<UserReviewResponse>, UserReviewsRequest>(RequestType.Query, 'Users.UserReviews', req)
);

export const useMyProfileQuery = (req: {}) => (
    useAxios<UserDetailsResponse, {}>(RequestType.Query, 'Users.MyProfile', req)
);

export const useMyReviewsQuery = (req: PaginatedRequest) => (
    useAxios<PaginatedResult<MyReviewResponse>, PaginatedRequest>(RequestType.Query, 'Users.MyReviews', req)
)

export const usePhotoUploadLinkQuery = (req: PhotoUploadLinkRequest) => (
    useAxios<string, PhotoUploadLinkRequest>(RequestType.Query, 'Users.PhotoUploadLink', req)
);

export const useAddReviewCommand = (req: AddReviewRequest) => (
    useAxios<any, AddReviewRequest>(RequestType.Command, 'Reviews.AddReview', req)
)

export const useRestaurantDetailsQuery = (req: RestaurantDetailsRequest) => (
    useAxios<RestaurantDetailsResponse, RestaurantDetailsRequest>(RequestType.Query, 'Restaurants.RestaurantDetails', req)
);

export const useRestaurantReviewsQuery = (req: RestaurantReviewsRequest) => (
    useAxios<PaginatedResult<MyReviewResponse>, RestaurantReviewsRequest>(RequestType.Query, 'Restaurants.RestaurantReviews', req)
);

export const useRestaurantDishesQuery = (req: RestaurantDishesRequest) => (
    useAxios<PaginatedResult<Dish>, RestaurantDishesRequest>(RequestType.Query, 'Restaurants.RestaurantDishes', req)
);

export const useRegisterCommand = (req: RegisterRequest) => (
    useAxios<any, RegisterRequest>(RequestType.Command, 'Users.Register', req)
);

export const useEditMyDescriptionCommand = (req: EditMyDescriptionRequest) => (
    useAxios<any, EditMyDescriptionRequest>(RequestType.Command, 'Users.EditMyDescription', req)
);

export const useDeleteReviewCommand = (req: DeleteReviewRequest) => (
    useAxios<any, DeleteReviewRequest>(RequestType.Command, 'Reviews.DeleteReview', req)
);

export const useEditReviewCommand = (req: EditReviewRequest) => (
    useAxios<any, EditReviewRequest>(RequestType.Command, 'Reviews.EditReview', req)
);

export const useDeleteMyAccountCommand = (req: {}) => (
    useAxios<any, {}>(RequestType.Command, "Users.DeleteMyAccount", req)
);