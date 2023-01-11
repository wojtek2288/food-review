import { Tag } from "./tag";

export interface DishDetails {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    restaurantId: string,
    restaurantName: string,
    price: number,
    tags: Tag[]
}