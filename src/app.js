import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser()) 
/*
app.use(express.cookieParser()) 
C:\Users\muska\express-project\main-project\node_modules\express\lib\express.js:112
      throw new Error('Most middleware (like ' + name + ') is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.');
            ^

Error: Most middleware (like cookieParser) is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.       


then i was trying to uninstall it but the problem was cookieparser is not bundled with express and i was using it like express.cookieparser

*/


//importing routes
import userRouter from './routes/user.routes.js';

app.use("/api/v1/users",userRouter)
export {app}