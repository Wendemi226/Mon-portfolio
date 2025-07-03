const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configure your email transporter (using Gmail as example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // replace with your email
    pass: 'your-email-password'   // replace with your email password or app password
  }
});

app.post('/send-appointment', (req, res) => {
  const { name, email, date, time, subject } = req.body;

  if (!name || !email || !date || !time || !subject) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  const mailOptions = {
    from: email,
    to: 'kfabrice292@gmail.com', // your email to receive notifications
    subject: `Nouvelle demande de rendez-vous de ${name}`,
    text: `
      Nom complet: ${name}
      Email: ${email}
      Date: ${date}
      Heure: ${time}
      Objet: ${subject}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
    } else {
      console.log('Email envoyé: ' + info.response);
      return res.status(200).json({ message: 'Demande envoyée avec succès.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});
