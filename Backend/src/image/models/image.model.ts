export interface Image{
    userId: string;
    author: string;
    name: string;
    image: Buffer | string;
    createdIn: string;
}