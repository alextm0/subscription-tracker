import nodemailer from "nodemailer";
import {EMAIL_PASSWORD} from "./env.js";

export const accountEmail = 'alextoma1704@gmail.com'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: accountEmail,
    pass: EMAIL_PASSWORD
  }
});

