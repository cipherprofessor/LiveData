import dotenv from "dotenv";
import { createServer } from "http";
import app from "./server/app";


dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const server = createServer(app);

server.listen(PORT, () => {
	// Runtime log only
	console.log(`API listening on http://localhost:${PORT}`);
});
