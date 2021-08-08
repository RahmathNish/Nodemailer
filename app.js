const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// Engine setup


app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

app.use('/public',express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/', (req,res) => {
    res.render('contact',{layout:false});
});

app.post('/send',(req,res) => {
    const output= `
    <p>You have a new contact registration</p>
    <h3>Contact Details:</h3>
    <ul>
    <li>Name:${req.body.name}</li>
    <li>Company:${req.body.company}</li>
    <li>Email:${req.body.email}</li>
    <li>Phone:${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
      `;


// hotmail using
let transporter = nodemailer.createTransport({
  
  service:"hotmail",
  auth: {
    user:'asperaham2015@outlook.com',
    pass:'aspersabila2015'
  },
  tls: {
    rejectUnauthorized:false
  }
});

let mailOptions = {
  from: '"Node Contact" <asperaham2015@outlook.com>',
  to:'rahmathnish89@gmail.com',
  subject: 'Sending mail through NodeJS',
  text:'Hello',
  html: output
};

transporter.sendMail(mailOptions,function (err,info) {
  if(err) {
    console.log(err);
    return;
  } 
  console.log('Message Sent: %s',info.messageId);
  console.log('Preview URL: %s',nodemailer.getTestMessageUrl(info));

  res.render('contact',{msg: 'Email has been sent'});

});

});

app.listen(8080, () => {console.log('Server started on port 8080'); 
});
