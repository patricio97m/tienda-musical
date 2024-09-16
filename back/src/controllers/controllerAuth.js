const authService = require('../services/servicioAuth');

const signup = (req, res) => {
    authService.signup(req.body)
        .then(() => res.status(200).json("success"))
        .catch(err => res.status(400).json(err.message));
};

const confirmAccount = (req, res) => {
    authService.confirmAccount(req.body.username, req.body.confirmationCode)
        .then(() => res.status(200).json({ message: "account confirmation success" }))
        .catch(err => res.status(400).json(err.message));
};

const login = (req, res) => {
    authService.login(req.body.username, req.body.password)
        .then(data => res.status(200).json(data.getIdToken().getJwtToken()))
        .catch(err => res.status(400).json(err.message));
};

const logout = (_req, res) => {
    authService.logout()
        .then(() => res.status(200).json("logout success"))
        .catch(err => res.status(400).json(err.message));
};

const resendCodeConfirmation = (req, res) => {
    authService.resendCodeConfirmation(req.body.username)
        .then(() => res.status(200).json("confirmation code resent"))
        .catch(err => res.status(400).json(err.message));
};

const userInfo = (_req, res) => {
    authService.userInfo()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(400).json(err.message));
};

const getToken = (_req, res) => {
    authService.getToken()
        .then(token => res.status(200).json({ token }))
        .catch(err => res.status(400).json(err.message));
};

const getUser = (_req, res) => {
    authService.getUser()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err.message));
};

module.exports = {
    signup, confirmAccount, login, logout, resendCodeConfirmation, userInfo, getToken, getUser
};