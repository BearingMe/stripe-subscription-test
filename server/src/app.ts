import express from "express";
import users from "./users";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// routers
app.use("/users", users);

app.listen(3000, () => console.log("Listening at port 3000"));
