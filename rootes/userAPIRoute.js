const express = require('express');
const router = express.Router();
const User = require('../model/user');
const crypto = require ('crypto');

//route /api/user/all
router.route('/all')
    .get((req,res)=>{
        User.find()
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(400).json(error))
    });

// route pour récupérer un user suivant sont id : localhost/api/user/id
router.route("/:id")
    .get((req, res) => {
        User.findOne({ _id: req.params.id})
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(400).json(error))
    })
    .put((req, res) => {
// crypte le mdp avec createHmac qui est dans le module crypto
        req.body.password = crypto.createHmac("sha512",
            process.env.SECRET_KEY)
            .update(req.body.password)
            .digest("base64");
// met à jour le user
        User.updateOne({_id: req.params.id}, req.body)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).json(err));
    });

/// route pour ajouter un user : localhost/api/user + json
router.route("/")
    .post((req, res) => {
// crypte le mdp avec createHmac qui est dans le module crypto
        req.body.password = crypto.createHmac("sha512",
            process.env.SECRET_KEY)
            .update(req.body.password)
            .digest("base64");
// crée le user
        let user = new User(req.body);
        user.save()
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).json(err));
    });



router.route("/delete/:id")
    .delete((req, res) => {
        User.deleteOne({ _id: req.params.id})
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(400).json(error))
    });
// exporter le router
module.exports = router;



