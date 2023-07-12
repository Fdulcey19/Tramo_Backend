import mongoose from 'mongoose';
import { MORNGO_URL } from './config.js';

(async()=>{
    try {
        mongoose.set("strictQuery", false);
        const db = await mongoose.connect(MORNGO_URL);
        console.log(`Conectado Correctamente a ${db.connection.name}`);
    } catch (error) {
        console.log(error);
    }
})()