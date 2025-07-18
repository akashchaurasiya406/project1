import express from "express";
import {config} from 'dotenv';

import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import {dbConnection} from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import {errorMiddleware} from "./middlewares/errorMiddleware.js";
 
const app = express();
config({path: "./config/config.env"});
// console.log(process.env.FRONTEND_URL);
app.use(
    cors({
        origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/appointment" ,appointmentRouter);

dbConnection()

app.use(errorMiddleware);
export default app;
