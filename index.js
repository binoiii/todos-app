const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const colors = require("colors");
const path = require("path");
const app = express();
const { authJWT } = require("./middleware/auth");

//BODY PARSER
app.use(express.json());

//CONNECT ENV VARIABLES
dotenv.config({ path: "./config/config.env" });

//CONNECT DB
connectDB();

//MORGAN
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//ROUTERS
app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));
app.use("/api/todos", require("./routes/todos"));
app.use("/api/user", require("./routes/user"));

//SERVE STATIC ASSETS IF IN PRODUCTION
if (process.env.NODE_ENV === "production") {
  //SET STATIC FOLDER
  app.use(express.static("client/build"));

  //ANY REQUEST ASIDE FROM "/api/v1"
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//LITSEN TO PORT
const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(
    `Listening to PORT ${PORT} and running on ${process.env.NODE_ENV}.`.magenta
  )
);
