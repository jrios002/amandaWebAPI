const transporter = require('./MailConfig');

const handleEmailSend = (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const mailOptions = {
            to: 'jrios4177@gmail.com',
            subject: subject,
            html: 'From: ' + email + '\nName: ' + name + '\nMessage: ' + message
        };

        transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            res.status(500).send({
                success: false,
                message: 'Something went wrong. Try again later'
            });
        } else {
            res.send({
                success: true,
                message: 'Thanks for your message. Mrs. Rios will contact you shortly.'
            });
        }
    });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Something went wrong. Try again later'
        });
    }
}

module.exports = {handleEmailSend: handleEmailSend};