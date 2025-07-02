import express from "express";
import users from "./users";
import subscriptions from "./subscriptions";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors())

// routers
app.use("/users", users)
app.use("/subscriptions", subscriptions)

app.listen(3000, () => console.log("Listening at port 3000"));