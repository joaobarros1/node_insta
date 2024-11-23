import express from "express";
import routes from "./src/routes/postRoutes.js";

async function startServer() {
    const app = express();

    routes(app);

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

startServer().catch(err => {
    console.error("Failed to start server:", err);
});
