import Tag from "./Tag";

export default interface DishDetailsResponse {
    imageUrl: string;
    restaurantName: string;
    dishName: string;
    price: number;
    rating: number | null;
    description: string | null;
    tags: Tag[];
}