import Tag from "./Tag";

export default interface Restaurant {
    id: string;
    name: string;
    imageUrl: string;
    rating: number | null;
    description: string | null;
    tags: Tag[]
}