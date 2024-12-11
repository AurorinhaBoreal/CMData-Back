const { StatusCodes, ReasonPhrases} = require('http-status-codes')
const User = require('../model/user')
const { Router } = require('express');

const route = Router();

route.get('/list', async (req, res) => {
    User.findAll()
        .then((response) => {
            return res.status(StatusCodes.OK).send({
                errorStatus: false,
                messageStatus: ReasonPhrases.OK,
                data: response
            })
        })
        .catch((error) => {
            return res.status(StatusCodes.BAD_REQUEST).send({
                errorStatus: true,
                messageStatus: "Error listing users!",
                errorObject:error
            })
        })
})

route.post('/register', async (req, res) => {

    const { email, password, firstName, lastName, nickname, avatar_url} = req.body;

    User.create({
        email,
        password,
        firstName,
        lastName,
        nickname,
        avatar_url
    })
        .then(()=>{
            return res.status(StatusCodes.CREATED).send({
                errorStatus: false,
                messageStatus: ReasonPhrases.CREATED,
                message: "You have been successful registered! Redirecting..."
            })
        })
        .catch((error) => {
            return res.status(StatusCodes.BAD_REQUEST).send({
                errorStatus: true,
                messageStatus: ReasonPhrases.BAD_REQUEST,
                errorObject:error
            })
        })
})

route.post('/login', async (req, res) => {

    const { email, password} = req.body;

    try {
        const userFound = await User.findOne({
            where: {
                email: email
            }
        })

        if (userFound.dataValues.password === password) {
            return res.status(StatusCodes.ACCEPTED).send({
                errorStatus: false,
                messageStatus: ReasonPhrases.ACCEPTED,
                message: "Your login is successfull! Redirecting..."
            })
        } else {
            return res.status(StatusCodes.BAD_REQUEST).send({
                errorStatus: false,
                messageStatus: ReasonPhrases.BAD_REQUEST,
                message: "The combination of email and password doesn't match!"
            })
        }
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).send({
            errorStatus: true,
            messageStatus: ReasonPhrases.BAD_REQUEST,
            errorObject: error
    })}
})

module.exports = route;