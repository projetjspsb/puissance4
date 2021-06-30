const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
        bcrypt.hash(req.body.password, 10).then(function(hashedPass){
      //  console.log(req)
        let user = new User ({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass,
        });
        user.save().then(user => {
            res.json({
                message : 'User bien ajouté'
            })
        }).catch(error => {
            console.log(error);
            res.json({
                message: 'Erreur'
            })
        });
        });
}

 const login = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
     User.findOne({$or: [{email:username}, {phone:username}]}).then(user => {
        if(user){
            bcrypt.compare(password, user.password).then(function(result) { 
                    if(result) {
                        let token = jwt.sign({name: user.name}, 'verySecretValue', {expiresIn: "1h"});
                        res.json({
                            message: 'Login Successful !',
                            user: user,
                            token
                        });
                    } else {
                        res.json({message : 'Password does not Match'})
                    }
                });
        } else {
            res.json({message : 'User not Found'})
        }
    })
}

const update = (req, res, next) => {
     User.findOne({$or: [{email:req.body.email}, {phone:req.body.phone}]}).then(user => {
          user.lines = req.body.lines;
          user.column = req.body.column;
          user.goal = req.body.goal;
          user.couleur = req.body.couleur;
          user.joueurs = [
              {id:1, pseudo:req.body.joueur1Pseudo, couleur:req.body.joueur1Couleur}, 
            {id:2, pseudo:req.body.joueur2Pseudo, couleur:req.body.joueur2Couleur}];
 
        user.save().then(user => {
            res.json({
                message : 'User bien modifié',
                user:user
            })
        }).catch(error => {
            console.log(error);
            res.json({
                message: 'Erreur'
            })
        });
    })
}

module.exports= {
    register, login, update
}