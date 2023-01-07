import Tag from "./Tag";

export default interface DishDetailsResponse {
    id: string;
    imageUrl: string;
    restaurantName: string;
    restaurantId: string;
    dishName: string;
    price: number;
    rating: number | null;
    description: string | null;
    tags: Tag[];
}