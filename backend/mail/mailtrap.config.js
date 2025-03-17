import { MailtrapClient } from "mailtrap";
import { config } from "dotenv";
config()


export const mailtrapClient = new MailtrapClient({
    token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
    email: "hello@demomailtrap.co",
    name: "Mailtrap",
};

// const recipients = [
//     {
//         email: "danh.vo.2110@gmail.com",
//     }
// ];

// client
//     .send({
//         from: sender,
//         to: recipients,
//         subject: "You are awesome!",
//         text: "Congrats for sending test email with Mailtrap!",
//         category: "Integration Test",
//     })
//     .then(console.log, console.error);