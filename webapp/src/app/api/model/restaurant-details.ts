import { Tag } from "./tag";

export interface RestaurantDetails {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    isVisible: boolean,
    tags: Tag[]
}