import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure cloudinary when this module is first used
const configureCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
};

const uploadOnCloudinary = async (localFilePath) => {
    try {
        configureCloudinary(); // Ensure config is loaded
        
        if (!localFilePath) return null;
        
        // Convert backslashes to forward slashes for cross-platform compatibility
        const normalizedPath = localFilePath.replace(/\\/g, '/');
        
        const response = await cloudinary.uploader.upload(normalizedPath, {
            resource_type: "auto",
        });
        console.log("File is uploaded on cloudinary", response.url);
        
        // Delete the local file after successful upload
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        
        return response;
    } catch (error) {
        console.error("Cloudinary upload error:", error.message);
        // Delete the local file even if upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};

export { uploadOnCloudinary };
