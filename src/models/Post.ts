import modelFilterFactory from '../helpers/modelFilterFactory';

type UserId = string | number;

export interface Post {
    id: number;
    userId: UserId;
    title: string;
    content: string;
    public: boolean;
    createdAt: Date;
}

type NewPost = Partial<Omit<Post, 'id'>> & {
    title: string;
    content: string;
    userId: UserId;
};

export default class UserModel {
    /** Get all posts */
    public static all() {
        return this.posts;
    }

    /** Add a post */
    public static create(newPost: NewPost) {
        const defaultValues = { public: true, createdAt: new Date() };
        const serverValues = { id: this.nextPostId };
        const post: Post = { ...defaultValues, ...newPost, ...serverValues };
        this.posts.push(post);
        this.nextPostId++;
        return post;
    }

    /** Delete a post */
    public static delete(postId: number) {
        this.posts = this.posts.filter(post => post.id !== postId);
    }

    /** Get a post by ID */
    public static find(id: number) {
        return this.posts.find(post => post.id === id);
    }

    /** Get a post by a filter */
    public static findBy(filter: Partial<Post>) {
        const filterFunction = modelFilterFactory(filter);
        return this.posts.find(filterFunction);
    }

    /** Update a post by ID */
    public static update(postId: number, updatedPost: Partial<Post>) {
        this.posts = this.posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    ...updatedPost,
                    id: post.id,
                    userId: post.userId,
                };
            }
            return post;
        });
    }

    /** Get posts by a filter */
    public static where(filter: Partial<Post>) {
        const filterFunction = modelFilterFactory(filter);
        return this.posts.filter(filterFunction);
    }

    private static posts: Post[] = [
        {
            id: 1,
            userId: 1,
            title: 'Post 1',
            content: 'This is the first post. It is public.',
            createdAt: new Date(),
            public: true,
        },
        {
            id: 2,
            userId: 1,
            title: 'Post 2',
            content: 'This is the second post. It is public.',
            createdAt: new Date(),
            public: true,
        },
        {
            id: 3,
            userId: 2,
            title: 'Post 3',
            content: 'This is the third post. It is not public.',
            createdAt: new Date(),
            public: false,
        },
        {
            id: 4,
            userId: 1,
            title: 'Post 4',
            content: 'This is the fourth post. It is not public.',
            createdAt: new Date(),
            public: false,
        },
    ];
    private static nextPostId = 5;
}
