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

    getAllAuthors: async (req, res) => {
        try {
            const authors = await AuthotrDb.findAll({
                include: [BookDb],
            });
            res.status(201).send(authors);
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    getAuthor: async (req, res) => {
        try {
            const author = await AuthotrDb.findByPk(req.params.id, {
                include: [BookDb],
            });
            if (author) {
                res.status(201).send(author);
            } else {
                res.status(400).send({ message: "Author not found" });
            }
        } catch {
            res.status(500).send({ message: "Server error" });
        }
    },

    updateAuthor: async (req, res) => {
        const author = await AuthotrDb.findByPk(req.params.id);
        if (author) {
            const errors = {};

            if (!req.body.name) {
                errors.author = "Missing author name";
            } else if (!req.body.name.match("^[\\w'\\-,.][^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$")) {
                errors.author = "Invalid author name";
            }

            const date = new Date();
            const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            if (!req.body.dateOfBirth) {
                errors.dateOfBirth = "Missing date of birth";
            } else if (today.getTime() < new Date(req.body.dateOfBirth).getTime()) {
                errors.dateOfBirth = "Invalid date of birth";
            }

            if (!req.body.dateOfDeath) {
                errors.dateOfDeath = "Missing date of birth";
            } else if (today.getTime() < new Date(req.body.dateOfDeath).getTime()) {
                console.log("here");

                errors.dateOfDeath = "Invalid date of death";
            } else if (new Date(req.body.dateOfDeath).getTime() < new Date(req.body.dateOfBirth).getTime()) {
                errors.dateOfDeath = "Invalid date of death";
            }

            if (!req.body.placeOfBirth) {
                errors.placeOfBirth = "MIssing place of birth";
            } else if (!req.body.placeOfBirth.match("[A-Za-z0-9'\\.\\-\\s\\,]")) {
                errors.placeOfBirth = "Invalid place of birth";
            }

            if (!req.body.imageName) {
                errors.imageName = "Missing image";
            }

            if (Object.keys(errors).length === 0) {
                await author
                    .update({
                        name: req.body.name,
                        dateOfBirth: new Date(req.body.dateOfBirth),
                        dateOfDeath: new Date(req.body.dateOfDeath),
                        placeOfBirth: req.body.placeOfBirth,
                        shortDescription: req.body.shortDescription,
                        imageName: req.body.imageName,
                    })
                    .then(() => {
                        res.status(201).send({ message: "Author updated" });
                    })
                    .catch(() => {
                        res.status(500).send({ message: "Server error" });
                    });
            } else {
                res.status(400).send(errors);
            }
        }
    },

    deleteAuthor: async (req, res) => {
        await AuthotrDb.findByPk(req.params.id)
            .then(async (author) => {
                await author.destroy();
                res.status(201).send({ message: "Author deleted" });
            })
            .catch(() => {
                res.status(500).send("Server error");
            });
    },
};

module.exports = controller;
