import express from "express";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// app.use("/api/test", (req, res) => {
//     res.send("Hello World");
// })

// app.use("/api/auth/register", (req, res) => {
//     res.send("Hello World");
// })

// app.use("/api/auth/login", (req, res) => {
//     res.send("Hello World");
// })

// app.use("/api/auth/logout", (req, res) => {
//     res.send("Hello World");
// })

// app.use("/api/posts", (req, res) => {
//     res.send("Hello World");
// })

// app.use("/api/posts", (req, res) => {
//     res.send("Hello World");
// })

// app.use("/api/posts/12312", (req, res) => {
//     res.send("Hello World");
// })

// console.log("Hello World");

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.listen(8800, () => {
//     console.log("Server is running on port 3000");
// });
