import express from "express";
import { listPosts } from "../controller/postsController.js";

const routes = app => {
    app.use(express.json());

    app.get("/posts", listPosts);
};

// app.get("/posts/:id", (req, res) => {
//     const post = posts.find(post => post.id === parseInt(req.params.id));
//     if (!post) {
//         res.status(404).send("Post not found");
//     }
//     res.status(200).json(post);
// });

export default routes;
