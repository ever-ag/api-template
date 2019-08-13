import { RequestHandler } from 'express';
import PostService from '../services/post';

export const index: RequestHandler = (req, res) => {
    const posts = PostService.all(req.context);
    return res.json(posts);
};

export const show: RequestHandler = (req, res) => {
    const post = PostService.find(req.context, req.params.id);
    return res.json(post);
};

export const create: RequestHandler = (req, res) => {
    const newPost = PostService.create(req.context, req.body);
    return res.json(newPost);
};

export const update: RequestHandler = (req, res) => {
    const updatedPost = PostService.update(req.context, req.params.id, req.body.post);
    return res.json(updatedPost);
};

export const destroy: RequestHandler = (req, res) => {
    PostService.delete(req.context, req.params.id);
    return res.status(201).end();
};
