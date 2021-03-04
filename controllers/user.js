//Imports 
require ('dotenv').config();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const { JWT_SECRET } = process.env;


const db = require ('../models');

//Controllers
const test = (req,res) => { 
    res.json({ message: 'User endpoint OK!✅'})
}


//can use async and await here as well 
const register = (req, res)=> {
    //POST route - adding new user to the database
    console.log('====> Inside of /register') //console.log for every route to know that you are hitting it
    console.log('====> req.body')
    console.log(req.body) //req.body has all the user info - name, email, password

    db.User.findOne({ email: req.body.email })
    //handle the if returned user: 
    .then(user => { 
        //if email already exists, a user will come back
        if (user) { 
            //send a 400 response
            return res.status(400).json({ message: 'Email already exists' });
        } else { 
            //create a new user 
            const newUser = new db.User({ 
                name: req.body.name, 
                email: req.body.email, 
                password: req.body.password
            })

            //Salt and hash the password - password saving the user
            bcrypt.genSalt(10, (err, salt) => { 
                if (err) throw Error; //you can have throw error or even a console.log statement

                bcrypt.hash(newUser.password, salt, (err, hash) => { 
                    if (err) console.log('===> Error inside of hash')
                    //Change the password in newUser to the hash
                    newUser.password = hash;
                    newUser.save() //this saves the user to the database
                    .then(createdUser => res.json(createdUser))
                    .catch(err => console.log(err))

                })
            })
        }
    })
    .catch(err => console.log("Error finding user", err))
}



//Exports
module.exports = {
    test,
    register
}


