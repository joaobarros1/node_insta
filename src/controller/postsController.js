import fs from "fs";
import {
    getPostsModel,
    newPostModel,
    newImageModel,
    updatePostModel,
} from "../models/postModel.js";
import generateDescriptionGemini from "../services/geminiService.js";
import { title } from "process";

export async function listPosts(req, res) {
    const posts = await getPostsModel();
    res.status(200).json(posts);
}

export async function createPost(req, res) {
    const newPostBody = req.body;
    try {
        const post = await newPostModel(newPostBody);
        res.status(201).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to create post" });
    }
}

export async function uploadImage(req, res) {
    const newImageBody = {
        imageUrl: req.file.originalname,
        // description: req.body.description,
        // alt: req.body.alt,
    };

    try {
        const image = await newImageModel(newImageBody);
        const imageExtension = req.file.originalname.split(".").pop();
        const updatedImage = `uploads/${image.insertedId}.${imageExtension}`;
        fs.renameSync(req.file.path, updatedImage);
        res.status(201).json(image);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to upload image" });
    }
}

export async function updatePost(req, res) {
    const { id } = req.params;

    try {
        const files = fs.readdirSync("uploads");
        const file = files.find(file => file.startsWith(id));
        if (!file) {
            throw new Error("File not found");
        }
        const imageBuffer = fs.readFileSync(`uploads/${file}`);
        const description = await generateDescriptionGemini(imageBuffer);

        const updatedPostBody = {
            title: req.body.title,
            description: description,
            alt: req.body.alt,
            imageUrl: `http://localhost:3000/${file}`,
        };

        await updatePostModel(id, updatedPostBody);
        res.status(200).json({ message: "Post updated" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to update post" });
    }
}
