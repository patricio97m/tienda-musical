const express = require("express");
const validationSchema = require("../utils/validationSchema");
const joi = require("joi");
const router = express.Router();
const controllerAuth = require("../controllers/controllerAuth");

router.post(
  "/login",
  validationSchema(
    joi.object({
      username: joi.string().min(5).max(50).required(),
      password: joi.string().min(5).max(50).required(),
    })
  ),
  controllerAuth.login
);

router.post(
  "/logout",
  validationSchema(
    joi.object({
      username: joi.string().min(5).max(50).required(),
    })
  ),
  controllerAuth.logout
);

router.post(
  "/signup",
  validationSchema(
    joi.object({
      username: joi.string().min(5).max(50).required(),
      password: joi.string().min(5).max(50).required(),
      email: joi.string().email().required(),
      name: joi.string().min(5).max(50),
      family_name: joi.string().min(5).max(50),
      address: joi.string().min(5).max(50),
    })
  ),
  controllerAuth.signup
);

router.post(
  "/confirmAccount",
  validationSchema(
    joi.object({
      username: joi.string().min(5).max(50).required(),
      confirmationCode: joi.string().max(6).required(),
    })
  ), 
  controllerAuth.confirmAccount);

router.post(
  "/resendCode",
  validationSchema(
    joi.object({
      username: joi.string().min(5).max(50).required(),
    })
  ), controllerAuth.resendCodeConfirmation);

router.get(
  "/userInfo/",
  controllerAuth.userInfo
);

router.get(
  "/getToken",
   controllerAuth.getToken);

router.get(
  "/getUser/",
  controllerAuth.getUser
);

module.exports = router;
