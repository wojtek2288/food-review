import PaginatedRequest from "./PaginatedRequest";

export default interface FeedRequest extends PaginatedRequest {
    sortBy: number;
    tagIds: string[];
}