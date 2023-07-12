import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const MORNGO_URL = process.env.MORNGO_URL;
export const JWT_SECRET = process.env.JWT_SECRET;

export const PROJECTID_FBS = process.env.PROJECTID_FBS;
export const CLIENTEMAIL_FBS = process.env.CLIENTEMAIL_FBS;
export const PRIVATEKEY_FBS = process.env.PRIVATEKEY_FBS;
