'use strict'

const createGeneratethemailsendrequest = require("./controller/MailSendController")

const getBody = require('./libraries/body')


let body = getBody()
createGeneratethemailsendrequest(body) ;

