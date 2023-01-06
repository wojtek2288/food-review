export default interface Review {
    id: string;
    username: string;
    review: string | null;
    rating: number;
    avatarUrl: string | null,
}