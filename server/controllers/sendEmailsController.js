const nodemailer = require('nodemailer')
const smtptransport = require('nodemailer-smtp-transport')
const fs = require('fs')
const appRoute = require('app-root-path')
const handlebars = require('handlebars')
const ActivationCode = require('../models/activation_codes')
const ForgetPassCode = require('../models/forget_pass_code')
const bcrypt = require('bcrypt')
const Phone = require('../models/phone')
const email = process.env.SENDER_EMAIL;
const pass = process.env.SENDER_PASS;

var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

const transporter = nodemailer.createTransport(smtptransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: pass

    }
}))

const sendLocationEmail = ()

const sendActivationEmail = async (req, res) => {
    try {
        const otpcode = Math.floor(Math.random() * (10000 - 1000) + 1000).toString()
        const salt = await bcrypt.genSalt(10);
        const hashedCode = await bcrypt.hash(otpcode, salt);
        let phone = null
        let activationdoc = null
        phone = await Phone.findOne({ email: req.body.receiver_email })
        if (phone == null) {
            activationdoc = await ActivationCode.findOne({ email: req.body.receiver_email })
            if (activationdoc == null) {
                const newDoc = await ActivationCode.create({
                    email: req.body.receiver_email,
                    code: hashedCode
                })
            }
            else {
                activationdoc.code = hashedCode
                activationdoc.save()
            }
            readHTMLFile(appRoute + '/views/send-location-template.html', function (err, html) {
                if (err) {
                    console.log("cannot read file: " + err)
                    res.json({
                        message: "An error occurred"
                    })
                }
                else {
                    var template = handlebars.compile(html)
                    var replacements = {
                        otpcode: otpcode
                    }
                    var htmlToSend = template(replacements)
                    const mailInfo = {
                        from: {
                            name: 'Phonee Help',
                            address: email
                        },
                        to: req.body.receiver_email,
                        subject: 'Phonee Org. - Account Verification',
                        html: htmlToSend
                    }

                    transporter.sendMail(mailInfo, function (err, data) {
                        if (err) {
                            console.log("cannot send email: " + err)
                            res.json({
                                message: "An error occurred"
                            })
                        }
                        else {
                            res.json({ message: "Email Sent Successfully" })
                        }
                    })
                }
            })
        }
        else {
            res.json({
                message: "Email is already taken!"
            })
        }
    } catch (err) {
        console.log(err)
        res.json({
            message: "An error occurred"
        })
    }
}

const sendForgetPasswordEmail = async (req, res) => {
    try {
        const otpcode = Math.floor(Math.random() * (10000 - 1000) + 1000).toString()
        const salt = await bcrypt.genSalt(10);
        const hashedCode = await bcrypt.hash(otpcode, salt);
        let forgetpassdoc = null
        forgetpassdoc = await ForgetPassCode.findOne({ email: req.body.receiver_email })
        if (forgetpassdoc == null) {
            const newDoc = ForgetPassCode.create({
                email: req.body.receiver_email,
                code: hashedCode
            })
        }
        else {
            forgetpassdoc.code = hashedCode
            forgetpassdoc.save()
        }
        readHTMLFile(appRoute + '/views/forget-pass-mail-template.html', function (err, html) {
            if (err) {
                console.log("cannot read file: " + err)
                res.json({
                    message: "An error occurred"
                })
            }
            else {
                var template = handlebars.compile(html)
                var replacements = {
                    otpcode: otpcode
                }
                var htmlToSend = template(replacements)
                const mailInfo = {
                    from: {
                        name: 'Phonee Help',
                        address: email
                    },
                    to: req.body.receiver_email,
                    subject: 'Phonee Org. - Forget Password',
                    html: htmlToSend
                }

                transporter.sendMail(mailInfo, function (err, data) {
                    if (err) {
                        console.log("cannot send email: " + err)
                        res.json({
                            message: "An error occurred"
                        })
                    }
                    else {
                        res.json({ message: "Email Sent Successfully" })
                    }
                })
            }
        })
    } catch (err) {
        console.log(err)
        res.json({
            message: "An error occurred"
        })
    }
}

module.exports = {
    sendActivationEmail,
    sendForgetPasswordEmail
}