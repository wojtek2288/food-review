import { Tag } from "./tag";

export interface EditDialogData {
    name: string,
    description: string,
    imageUrl: string,
    tags: Tag[]
}