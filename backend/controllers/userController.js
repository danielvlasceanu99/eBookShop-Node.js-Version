const express = require("express");
const userDb = require("../models").User;
const bookDb = require("../models").Book;
const LinkDb = require("../models").Link;

const controller = {
    addUser: async (req, res) => {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            profilePictureName: req.body.profilePictureName,
        };

        const errors = {};
        if (!user.name) {
            errors.name = "Missing user name";
        } else if (!user.name.match("^[\\w'\\-,.][^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$")) {
            errors.name = "Invalid user name";
        }

        if (!user.email) {
            errors.email = "Missing email";
        } else {
            const existingUser = await userDb.findOne({
                where: {
                    email: user.email,
                },
            });
            if (!existingUser) {
                if (!user.email.match("^\\S+@\\S+\\.\\S+$")) {
                    errors.email = "Invalid email";
                }
            } else {
                errors.email = "Email already in use";
            }
        }

        if (!user.password) {
            errors.password = "Missing password";
        } else if (!user.password.match(/(^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$)/)) {
            errors.password = "Invalid password";
        }

        if (!user.role) {
            errors.role = "Missing role";
        }

        if (!user.profilePictureName) {
            user.profilePictureName = "defaultProfilePicture";
        }

        if (Object.keys(errors).length === 0) {
            await userDb
                .create(user)
                .then(() => {
                    res.status(201).send({ message: "User created" });
                })
                .catch(() => {
                    res.status(500).send({ message: "Server error" });
                });
        } else {
            res.status(400).send(errors);
        }
    },
};

module.exports = controller;
