//Imports 
require ('dotenv').config();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const { JWT_SECRET } = process.env;


const db = require ('../models');

