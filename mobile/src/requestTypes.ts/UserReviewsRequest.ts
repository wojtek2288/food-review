import PaginatedRequest from "./PaginatedRequest";

export default interface UserReviewsRequest extends PaginatedRequest {
    userId: string;
}