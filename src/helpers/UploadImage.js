const url = "https://api.cloudinary.com/v1_1/dhpbxygkv/image/upload";

const uploadImage = async (image, retries = 3, timeout = 5000) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'mern_upload');

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(url, {
                method: "POST",
                body: formData,
                signal: controller.signal,
            });

            clearTimeout(id);

            if (!response.ok) {
                throw new Error(`Failed to upload image: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            if (attempt === retries) {
                console.error("Error uploading image after multiple attempts:", error);
                throw error; // rethrow the error after logging it
            } else {
                console.warn(`Attempt ${attempt} failed. Retrying...`, error);
            }
        }
    }
};

export default uploadImage;
