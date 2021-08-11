const express = require("express");
const AuthotrDb = require("../models").Author;
const BookDb = require("../models").Book;

const controller = {
    addAuthor: async (req, res) => {
        const author = {
            name: req.body.name,
            dateOfBirth: new Date(req.body.dateOfBirth),
            dateOfDeath: new Date(req.body.dateOfDeath),
            placeOfBirth: req.body.placeOfBirth,
            shortDescription: req.body.shortDescription,
            imageName: req.body.imageName,
        };

        const errors = {};

        if (!author.name) {
            errors.author = "Missing author name";
        } else if (!author.name.match("^[\\w'\\-,.][^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$")) {
            errors.author = "Invalid author name";
        }

        const date = new Date();
        const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        if (!author.dateOfBirth) {
            errors.dateOfBirth = "Missing date of birth";
        } else if (today.getTime() < author.dateOfBirth.getTime()) {
            errors.dateOfBirth = "Invalid date of birth";
        }

        if (!author.dateOfDeath) {
            errors.dateOfDeath = "Missing date of birth";
        } else if (today.getTime() < author.dateOfDeath.getTime()) {
            errors.dateOfDeath = "Invalid date of death";
        } else if (author.dateOfDeath.getTime() < author.dateOfBirth.getTime()) {
            errors.dateOfDeath = "Invalid date of death";
        }

        if (!author.placeOfBirth) {
            errors.placeOfBirth = "MIssing place of birth";
        } else if (!author.placeOfBirth.match("[A-Za-z0-9'\\.\\-\\s\\,]")) {
            errors.placeOfBirth = "Invalid place of birth";
        }

        if (!author.imageName) {
            errors.imageName = "Missing image";
        }

        if (Object.keys(errors).length === 0) {
            AuthotrDb.create(author)
                .then(() => {
                    res.status(201).send({ message: "Author added" });
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
