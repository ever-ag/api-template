import { Request } from 'express';
import PostModel, { Post } from '../models/Post';
import { HttpError } from '../helpers/HttpError';

type CreateBody = {
    title?: string;
    content?: string;
    public?: boolean;
};

export default class PostService {
    public static all(context: Request['context']) {
        if (context && context.id) {
            return PostModel.where({});
        }
        return PostModel.where({ public: true });
    }

    public static create(context: Request['context'], newPost: CreateBody) {
        const { title, content } = newPost;
        if (!title) {
            throw new HttpError(400, 'Post title is required');
        }
        if (!content) {
            throw new HttpError(400, 'Post content is required');
        }
        return PostModel.create({
            title,
            content,
            ...newPost,
            userId: context.id,
        });
    }

    public static delete(context: Request['context'], postId: number) {
        const post = PostModel.findBy({ userId: context.id, id: postId });
        if (!post) {
            throw new HttpError(401, 'Invalid permissions');
        }
        return PostModel.delete(postId);
    }

    public static find(context: Request['context'], postId: number) {
        let post: Post | undefined;
        if (context && context.id) {
            post = PostModel.find(postId);
        } else {
            post = PostModel.findBy({ public: true, id: postId });
        }
        if (!post) {
            throw new HttpError(404);
        }
        return post;
    }

    public static update(context: Request['context'], postId: number, updatedPost: Partial<Post>) {
        const post = PostModel.findBy({ userId: context.id, id: postId });
        if (!post) {
            throw new HttpError(401, 'Invalid permissions');
        }
        return PostModel.update(postId, updatedPost);
    }
}
