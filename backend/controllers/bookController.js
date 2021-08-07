const express = require("express");
const BookDb = require("../models").Book;
const AuthorDB = require("../models").Author;

const controller = {
    addBook: async (req, res) => {
        const book = {
            isbn: req.body.isbn,
            title: req.body.title,
            description: req.body.description,
            genre: req.body.genre,
            rating: 0,
            price: req.body.price,
            discount: req.body.discount,
            imageName: req.body.imageName,
            authorId: req.body.authorId,
        };

        const errors = {};

        if (!book.isbn) {
            errors.isbn = "Missing ISBN";
            console.log("Missing ISBN");
        } else if (!book.isbn.match("^(?=(?:\\D*\\d){10}(?:(?:\\D*\\d){3})?$)[\\d-]+$")) {
            errors.isbn = "Invalid ISBN";
            console.log("Invalid ISBN");
        } else {
            const existing = await BookDb.findOne({
                where: { isbn: book.isbn },
            });
            if (existing) {
                errors.isbn = "ISBN already used";
                console.log("ISBN Already used");
            }
        }

        if (!book.title) {
            errors.title = "Missing title";
            console.log("MIssing title");
        } else {
            book.title = book.title
                .split(" ")
                .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
                .join(" ");
        }

        if (!book.description) {
            errors.description = "Missing description";
            console.log("Missing description");
        }

        if (!book.genre) {
            errors.genre = "Missing genre";
            console.log("Missing genre");
        }

        if (!book.price) {
            errors.price = "Missing price";
            console.log("Missing price");
        }

        if (!book.discount) {
            book.discount = 0;
        } else if (book.discount > 1 || book.discount < 0) {
            errors.discount = "Invalid discount";
            console.log("Invalid discount");
        }

        if (!book.imageName) {
            errors.imageName = "Missing image name";
            console.log("Missing image name");
        }
        if (!book.authorId) {
            errors.authorId = "Missing author";
            console.log("Missing author");
        } else {
            const author = await AuthorDB.findByPk(book.authorId);
            if (!author) {
                errors.authorId = "Inexistent author";
                console.log("Inexistent author");
            }
        }

        if (Object.keys(errors).length === 0) {
            await BookDb.create(book)
                .then(() => {
                    res.status(201).send({ message: "Book added" });
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
