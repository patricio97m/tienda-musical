var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var { CognitoIdentityProviderClient, ResendConfirmationCodeCommand } = require('@aws-sdk/client-cognito-identity-provider');
var dotenv = require('dotenv');
global.fetch = require('node-fetch');
dotenv.config();

var pool_region = process.env.POOL_REGION;
var poolData = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID
};
var cognitoUser;

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var authService = {
    signup: function(userReq) {
        console.log(userReq.email, userReq.password, userReq.username, userReq.name, userReq.family_name, userReq.address);
        var attributeList = [];
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: userReq.email }));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "name", Value: userReq.name }));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "family_name", Value: userReq.family_name }));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "address", Value: userReq.address }));
        return new Promise(function(resolve, reject) {
            userPool.signUp(userReq.username, userReq.password, attributeList, null, function(err, result) {
                if (err) reject(err);
                else {
                    console.log(result.user);
                    resolve(result.user);
                }
            });
        });
    },
    login: function(username, password) {
        return new Promise(function(resolve, reject) {
            var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
                Username: username,
                Password: password
            });

            cognitoUser = new AmazonCognitoIdentity.CognitoUser({
                Username: username,
                Pool: userPool
            });

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function(result) {
                    resolve(result);
                },
                onFailure: function(err) {
                    console.log(err);
                    reject(err);
                }
            });
        });
    },
    logout: function() {
        return new Promise(function(resolve, reject) {
            try {
                if (cognitoUser) {
                    cognitoUser.signOut();
                    cognitoUser = null;
                }
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    },
    getToken: function() {
        return new Promise(function(resolve, reject) {
            if (cognitoUser) {
                cognitoUser.getSession(function(err, session) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(session.getIdToken().getJwtToken());
                    }
                });
            } else {
                resolve(null);
            }
        });
    },
    confirmAccount: function(username, confirmationCode) {
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser({ Username: username, Pool: userPool });
        return new Promise(function(resolve, reject) {
            cognitoUser.confirmRegistration(confirmationCode, true, function(err, result) {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
    resendCodeConfirmation: function(username) {
        var client = new CognitoIdentityProviderClient({ region: pool_region });
        return new Promise(function(resolve, reject) {
            var command = new ResendConfirmationCodeCommand({
                ClientId: poolData.ClientId,
                Username: username
            });
            client.send(command).then(function(response) {
                console.log(`Confirmation code resent to: ${response}`);
                resolve(response);
            }).catch(function(err) {
                reject(err);
            });
        });
    },
    userInfo: function() {
        return new Promise(function(resolve, reject) {
            if (!cognitoUser) {
                reject(new Error('User is not logged in'));
                return;
            }
            cognitoUser.getUserAttributes(function(err, attributes) {
                if (err) {
                    reject(err);
                } else {
                    var result = {};
                    for (var attribute of attributes) {
                        var name = attribute.getName();
                        result[name] = attribute.getValue();
                    }
                    resolve(result);
                }
            });
        });
    },
    getUser: function() {
        return new Promise(function(resolve, reject) {
            if (cognitoUser) {
                cognitoUser.getSession(function(err, session) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(session.getIdToken().payload);
                    }
                });
            } else {
                resolve(null);
            }
        });
    }
};

module.exports = authService;
