import express from "express";
import cors from "cors";

const app = express();


app.use(express.json());

app.use(cors(
    {
        origin:"*"
    }
));

app.get("/", (req, res) => {
    fetch("http://localhost:3003").then((data) => {
        res.json(data)
    })
})

app.listen("3005", () => {
    console.log("http://localhost:3005")
});