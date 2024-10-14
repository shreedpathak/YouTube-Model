import {v2 as Cloudinary} from "cloudinary" // use to deploy data to server from local server
import fs from "fs" //file system

 // Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY,  
    api_secret: yD50sVDw1s5EYwAunCGCUQ7NLnE // Click 'View API Keys' above to copy your API secret
});

const uploadOnCLoudinary = async (filepath) => {
    try{
        if(!filepath) return null;
        const response = Cloudinary.uploader.upload(filepath, {
            resource_type: "auto"
        });
        console.log("File uploaded successfully,", response.url);
        return response;
    }catch{
        fs.unlinkSync(filepath); // remove the locally saved temporary file as the upload operation got
        return null;
    }
};