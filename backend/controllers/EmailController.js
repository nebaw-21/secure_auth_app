import RegisteredUser from '../models/user.js';
import SubscribedUser from '../models/subscribedUser.js';
import transporter from '../config/nodemailer.js';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (email, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to: ${email}`);
  } catch (error) {
    console.error(`Error sending email to: ${email}`, error);
  }
};

const sendEmailsToAllUsers = async (req, res) => {
  try {
    const registeredUsers = await RegisteredUser.find();
    const subscribedUsers = await SubscribedUser.find();

    const allUsers = [...registeredUsers, ...subscribedUsers];

    await Promise.all(
      allUsers.map(user => sendEmail(user.email, req.body.subject, req.body.text))
    );

    res.status(200).json({ message: 'Emails sent to all users' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { sendEmailsToAllUsers };
