export interface Review {
    id: string,
    restaurantId: string,
    dishId: string | undefined,
    rating: number,
    description: string
}