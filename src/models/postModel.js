import { ObjectId } from "mongodb";
import connectToDatabase from "../config/db.js";

let connection;
try {
    console.log("Attempting to connect to the database...");
    connection = await connectToDatabase();
    if (!connection) {
        throw new Error("Failed to connect to the database");
    }
} catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
}

export async function getPostsModel() {
    const posts = await connection
        .db("node_insta")
        .collection("posts")
        .find({})
        .toArray();
    return posts;
}

export async function newPostModel(newPostBody) {
    const post = await connection
        .db("node_insta")
        .collection("posts")
        .insertOne(newPostBody);
    return post;
}

export async function newImageModel(newImageBody) {
    const image = await connection
        .db("node_insta")
        .collection("posts")
        .insertOne(newImageBody);
    return image;
}

export async function updatePostModel(id, updatedPostBody) {
    const objId = ObjectId.createFromHexString(id);
    await connection
        .db("node_insta")
        .collection("posts")
        .updateOne({ _id: new ObjectId(objId) }, { $set: updatedPostBody });
}
