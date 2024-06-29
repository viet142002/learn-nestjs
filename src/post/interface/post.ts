import { IProduct } from './product';
import { IUser } from '~/users/interface';

export interface IPost {
    id: number;
    thumb: string;
    title: string;
    description: string;
    content: string;
    style: any;
    status: any;
    author: IUser;
    authorId: number;
    product?: IProduct;
    postId: number;
    related?: Array<IPost>;
    createdAt: string;
    updatedAt: string;
}
