import express from "express";
import users from "./users";
import subscriptions from "./subscriptions";
import cors from "cors";

const app = express();

app.use(cors())
app.use(express.json());

// routers
app.use("/users", users)
app.use("/subscriptions", subscriptions)

app.listen(3000, () => console.log("Listening at port 3000"));