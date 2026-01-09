import express, { Application, Request, Response} from "express"
import dotenv from "dotenv"

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

app.use(express.json());


app.get("/", (req: Request, res: Response) => {
    res.send("Working");
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})