require("dotenv").config();
//dependencies
const express = require("express");
const app = express();
const port = process.env.PORT ;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/web/v1/user.route")
const db = require("./config/db")
// Middlewares
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.set(db());
app.use(cookieParser())
app.use(cors({origin : "http://localhost:3002" , credentials : true}));

// cors origin --> allows you that website that mention into origin group , ex. bakend only res when localhost 3000 and send request , other than give cors error 
// localhost 3000 --> req --> accept --> give response
// localhost 3002 --> req --> cors error  --> don't give response
// in origin you mention frontends urls (developments , productions , both)


//Routes
app.use("/user" , userRouter );


app.listen(port, () => {
  console.log(`server run at port ${port}`);
  console.log(`http://localhost:${port}/`);
});
