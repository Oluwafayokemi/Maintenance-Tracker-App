/* eslint-disable class-methods-use-this */
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import db from '../models/index';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.myEmail,
    pass: process.env.myPassword,
  },
});

/**
 * @param {object} request - HTTP Request
 * @param {object} response - HTTP Response
 * @returns {object} Class instance
 * @description send email notification to admin and users
 */

class EmailNotification {
  /**
   * @param {string} userEmail - HTTP Request
   * @param {string} EmailSubject - HTTP Response
   * @returns {string} EmailText instance
   * @description send email to a recipient
   */

  async sendMail(userEmail, emailSubject, emailText) {
    const mailOptions = {
      from: 'Maintenance Tracker(Facility Department)',
      to: userEmail,
      subject: emailSubject,
      html: `<h3 style="background-color: pink; color: black; padding: .5em; width: 450px; text-align: center;">Maintenance Tracker</h3>
      <div>${emailText}</div>
      <p><strong>**Note if you are not subscribed to Maintenance Tracker, please ignore this Email.**<srong></p>`,
    };
    transporter.sendMail(mailOptions);
  }
  /**
   * @param {string} equipment - HTTP Request
   * @description sends email notification to an admin when a user creates a request
   */

  async createRequest(equipment) {
    const queryString = {
      // give the query a unique name
      name: 'fetch-user',
      text: 'SELECT email, firstname FROM users WHERE isadmin = TRUE;',
    };
    db.connect()
      .then(client => client.query(queryString)
        .then((data) => {
          client.release(data);
          const {
            email,
            firstname,
          } = data.rows[0];
          const emailBody = `<p>Dear Admin ${firstname}</p>, <p>A new request with Equipment type: <strong>${equipment}</strong>, was sent to the maintainance tracker site<\p>. <P><strong>Do attend to the request as soon as possible</strong></p>. 
          <p>Time created:${new Date()}</p>`;
          this.sendMail(email, 'Notification of a new Request sent to the maintainance tracker app', emailBody);
        })
        .catch(error => error));
  }

  /**
   * @param {string} equipment - HTTP Request
   * @description sends email to the user when an action has been made on a request by the admin
   */
  async requestStatus(requestid) {
    const query = {
      // give the query a unique name
      name: 'fetch-user',
      text: 'SELECT requests.requestid, requests.equipment, requests.status, requests.date, users.firstname, users.email FROM users, requests WHERE requests.requestid = $1 LIMIT 1;',
      values: [requestid],
    };
    db.connect()
      .then(client => client.query(query)
        .then((data) => {
          client.release(data);
          const {
            equipment,
            date,
            status,
            email,
            firstname,
          } = data.rows[0];
          const emailBody = `<p>Dear <strong>${firstname}</strong></p>, <p>The request you created on <strong>${equipment}</strong>, as at <strong>${date}</strong> has been ${status}.</p> <p>Time updated: <strong>${new Date()}</strong>`;
          this.sendMail(email, `Request ${status}`, emailBody);
        })
        .catch(error => error));
  }
}

const emailNotification = new EmailNotification();
export default emailNotification;
