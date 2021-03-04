require('dotenv').config();
// A passport strategy for authenticating with a JSON Web Token
// This allows to authenticate endpoints using a token
// const JwtStrategy = require('passport-jwt').Strategy
// const ExtractJwt = require('passport-jwt').ExtractJwt
//question:how would we refactor the above 2 lines with destructuring: 
const { Strategy, ExtractJwt } = require('passport-jwt')
const mongoose = require ('mongoose');

//Import user model: 
const { User } = require('../models/user')


const options = {};
//add a keys and values pair to the above object
//keys = jwtFromRequest and secretOrKey
//values = ExtractJwt.fromAuthHeaderAsBearerToken(); and process.env.JWT_SECRET;
//object: { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//          secretOrKey: process.env.JWT_SECRET }
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
    // Add code here
    passport.use(new Strategy(options, (jwt_payload, done)=> {
        //Have a user that we're finding by the id inside the payload
        //When we get the user back, we'll check to see is user is in database

    }))
}

