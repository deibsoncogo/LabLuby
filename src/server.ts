import express from "express";
import { indexRouter } from "./routes";

const app = express();

app.use(express.json());
app.use(indexRouter);

app.listen(3333, () => console.log("Server is running on port 3333"));
