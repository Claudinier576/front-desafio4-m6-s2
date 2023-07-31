import { Axios } from "axios";
import "dotenv/config"

export const api = new Axios({ baseURL: process.env.API_BASE_URL|| "http://localhost:3000/" });


