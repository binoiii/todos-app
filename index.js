const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const colors = require("colors");
const path = require("path");
const app = express();

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

//PAGE NOT FOUND
// app.use((req, res, next) => {
//   res.status(404).json({
//     succes: false,
//     message: "Page Not Founded",
//   });
// });

//ROUTERS
app.use("/api/v1", require("./routes/todos"));

//SERVE STATIC ASSETS IF IN PRODUCTION
if (process.env.NODE_ENV === "production") {
  //SET STATIC FOLDER
  app.use(express.static("client/build"));

  //ANY REQUEST ASIDE FROM "/api/v1"
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(
    `Listening to PORT ${PORT} and running on ${process.env.NODE_ENV}.`.magenta
  )
);
