import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: "dvcwdjwr6",
    api_key: "843711656981742",
    api_secret: "Vsly369g-Rcuzjsx5i1TVg1uBIk"
})

export const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: 'tramo'
    }
})