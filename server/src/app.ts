import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
const app = express();
import bodyParser from "body-parser";

// CORS
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(
  express.json({
    limit: "16kb",
  }),
);

// JSON and URL-encoded payloads
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// static files
app.use(express.static("public"));

//define cookie parser
app.use(cookieParser());

// hndle error
app.on("error", (err) => {
  console.error(err);
  throw err;
});

//Import routes
import userRouter from "./routes/routes";

// Declare API route
app.use("/api/v1", userRouter);

// // Test route
// app.get("/", (req, res) => {
//   res.send("hello world");
// });

export default app;
