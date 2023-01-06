export default interface ReviewResponse {
    id: string;
    username: string;
    description: string | null;
    rating: number;
    imageUrl: string | null,
}