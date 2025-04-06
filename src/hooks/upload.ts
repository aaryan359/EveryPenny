import { useState } from "react";
import axios from "axios";
import { Platform } from "react-native";
import * as mime from "mime";

interface CloudinaryUploadResult {
  url: string;
  secure_url: string;
  original_filename: string;
}

const useCloudinaryUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadToCloudinary = async (fileUri: string): Promise<CloudinaryUploadResult> => {
    setIsUploading(true);
    setUploadError(null);

    const url = "https://api.cloudinary.com/v1_1/djddegk6o/upload";
    const formData = new FormData();
    
    // Extract filename & MIME type
    const fileName = fileUri.split("/").pop();
    const mimeType = mime.getType(fileUri) || "image/jpeg";

    formData.append("file", {
      uri: fileUri,
      name: fileName,
      type: mimeType,
    } as any); // React Native requires explicit typing
    
    formData.append("upload_preset", "The Planet Reserve");

    try {
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      setUploadError("Failed to upload file. Please try again.");
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadToCloudinary, isUploading, uploadError };
};

export default useCloudinaryUpload;
