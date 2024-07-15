const url = "https://api.cloudinary.com/v1_1/dhpbxygkv/image/upload";

const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'mern_upload');

        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to upload image: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error; // rethrow the error after logging it
    }
};

export default uploadImage;
