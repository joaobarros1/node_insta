import express from "express";
import multer from "multer";
import {
    listPosts,
    createPost,
    uploadImage,
    updatePost,
} from "../controller/postsController.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ dest: "./uploads", storage });

const routes = app => {
    app.use(express.json());

    app.get("/posts", listPosts);

    app.post("/posts", createPost);

    app.post("/upload", upload.single("image"), uploadImage);

    app.put("/update/:id", updatePost);
};

export default routes;
