import Tag from "./Tag";

export default interface RestaurantDetailsResponse {
    imageUrl: string;
    restaurantName: string;
    rating: number | null;
    description: string | null;
    tags: Tag[];
}