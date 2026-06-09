import express from "express";
import redirect from "./controllers/redirects.controller";
import urlRouter from "./controllers/url.controller";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/hello", (req, res) => {
  res.status(200).json({ Message: "Hi! The server is running" });
});

app.use("/", redirect);
app.use("/api/url", urlRouter);

export default app;
