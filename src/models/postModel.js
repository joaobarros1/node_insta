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

export async function getPosts() {
    const posts = await connection
        .db("node_insta")
        .collection("posts")
        .find({})
        .toArray();
    return posts;
}
