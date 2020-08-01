const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Profile

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route    GET api/profile/test
//@desc     Tests profile route
//@access   Public
router.get('/test', (req, res) => {
    res.send({msg : "Profile works"})
});

//@route    GET api/profile
//@desc     Get current user's profile
//@access   Public
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.noprofile = "There is no profile for the user.";
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err))
});

module.exports = router;