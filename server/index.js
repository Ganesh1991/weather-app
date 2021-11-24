import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import * as path from "path";

import cors from "cors";

import userRouter from "./routes/user.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRouter);

const CONNECTION_URL =
  "mongodb+srv://rohansd:w4PYfEEKTHZA34j@cluster0.bpied.mongodb.net/test22?retryWrites=true&w=majority";
console.log(CONNECTION_URL);
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("/app", (req, res) => {
  app.use(express.static(process.cwd() + "/" + "build"));
  res.sendFile(path.join(process.cwd() + "/" + "build" + "/index.html"));
});
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
