import path from 'path';
import express, { Express, Request, Response } from "express";
import cors from 'cors';
import SwaggerUI from "swagger-ui";
import cluster from "cluster";
import os from "os";
import { config } from 'dotenv';
import routing from './routers/routes';

config();
//create express app
const app: Express = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,)))
app.use('/api/v1', routing)
// Port 
const PORT = process.env.PORT || 3000;

//API

app.get('/', (req: Request, res: Response) => {
    return res.json({ is_success: true, message: "working" })
})


//utilize maximum cors of cpu
if (cluster.isMaster) {
    for (let i: number = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
    cluster.on('end', () => {
        cluster.fork();
    })
}
else app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})