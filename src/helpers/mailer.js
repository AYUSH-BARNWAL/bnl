import nodemailer from "nodemailer";
import User from "../../models/userModel";
import { connect } from "../../dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, userId }) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    await User.findByIdAndUpdate(
      userId,
      {
        forgotPasswordToken: hashedToken,
        verifyPasswordExpiry: Date.now() + 3600000,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "15c29d24cfaaaf",
        pass: "2116690cb5303b",
      },
    });

    const mailOptions = {
      from: "bnl@gmail.com",
      to: email,
      subject: "Reset Password",
      html: `<a href="${process.env.BASE_URL}/reset-password?token=${hashedToken}" target="_blank">Click here to reset your password</a>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (e) {
    throw new Error(e);
  }
};
