import { getPosts } from "../models/postModel.js";

export async function listPosts(req, res) {
    const posts = await getPosts();
    res.status(200).json(posts);
}
