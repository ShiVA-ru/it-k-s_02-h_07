import nodemailer from "nodemailer";
import config from "../core/settings/config";

export const emailAdapter = {
  async sendEmail(email: string, message: string) {
    // Create a transporter
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: +config.smtpPort,
        secure: true, // Start unencrypted, upgrade via STARTTLS
        auth: {
          user: config.emailAddress,
          pass: config.emailPassword,
        },
        // tls: {
        //   rejectUnauthorized: false, // только для тестирования!
        // },
      });

      // Send a test message
      const info = await transporter.sendMail({
        from: `"Test App" <${config.emailAddress}>`,
        to: email,
        subject: "Test email",
        html: message,
      });

      console.log("Message sent: %s", info.messageId);
      return info;
    } catch (e) {
      console.error(e);
    }
  },
};
