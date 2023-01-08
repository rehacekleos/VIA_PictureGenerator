export interface Image{
    imageId: string
    userId: string;
    author?: string;
    name: string;
    image: Buffer | string;
    createdIn: string;
    rating: number[];
}