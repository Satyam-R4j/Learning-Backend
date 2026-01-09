import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: './.env'
});

(async () => {
    try {
        await connectDB();
    } catch (error) {
        console.error("Failed to start application:", error);
        process.exit(1);
    }
})();