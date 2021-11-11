import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv'; 

dotenv.config(); 

const PORT = process.env.PORT || 3000; 
const app: 