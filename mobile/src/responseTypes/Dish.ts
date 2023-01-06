import Tag from "./Tag";

export default interface Dish {
    id: string;
    name: string;
    restaurantName: string;
    imageUrl: string;
    rating: number | null;
    description: string | null,
    tags: Tag[],
    price: number,
}