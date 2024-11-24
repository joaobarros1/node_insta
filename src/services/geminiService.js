import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function generateDescriptionGemini(imageBuffer) {
    const prompt = "Generate a description for the next image";

    try {
        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/png",
            },
        };
        const res = await model.generateContent([prompt, image]);
        return res.response.text() || "Description not available.";
    } catch (error) {
        console.error(error, error.message, error);
        throw new Error("Error obtaining description from Gemini.");
    }
}
