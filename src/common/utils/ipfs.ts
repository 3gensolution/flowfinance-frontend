
import axios from 'axios';

const PINATA_API_KEY = process.env['NEXT_PUBLIC_PINATA_API_KEY'];
const PINATA_SECRET_API_KEY = process.env['NEXT_PUBLIC_PINATA_SECRET_API_KEY'];
const JWT = process.env['NEXT_PUBLIC_PINATA_JWT'];

export const uploadToIPFS = async (file: File): Promise<string> => {
    if (!file) {
        throw new Error('No file provided');
    }

    const formData = new FormData();
    formData.append('file', file);

    // Optional: Add metadata
    const metadata = JSON.stringify({
        name: file.name,
        keyvalues: {
            uploadDate: new Date().toISOString(),
            type: "KYC_DOCUMENT"
        }
    });
    formData.append('pinataMetadata', metadata);

    // Optional: Add options
    const options = JSON.stringify({
        cidVersion: 0,
    });
    formData.append('pinataOptions', options);

    try {
        const headers: Record<string, string> = {
            'Content-Type': `multipart/form-data;`,
        };

        // Prefer JWT if available
        if (JWT) {
            headers['Authorization'] = `Bearer ${JWT}`;
        } else if (PINATA_API_KEY && PINATA_SECRET_API_KEY) {
            headers['pinata_api_key'] = PINATA_API_KEY;
            headers['pinata_secret_api_key'] = PINATA_SECRET_API_KEY;
        } else {
            throw new Error("Pinata credentials not found via JWT or API Key/Secret");
        }

        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: Infinity,
            headers: headers
        });

        return res.data.IpfsHash;
    } catch (error) {
        console.error("Error uploading to IPFS:", error);
        throw new Error("Failed to upload file to IPFS");
    }
};
