import express, { Application, Request, Response} from "express"
import dotenv from "dotenv"
import userRouter from "./routes/signup-route";
import dbConnect from "./config/database-connection";
import cors from "cors"

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

dbConnect();

app.use(express.json());
app.use(cors());

app.use("/v1/user", userRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Working");
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});