const LinkDb = require("../models").Link;
const UserDb = require("../models").User;
const BookDb = require("../models").Book;

const controller = {
    addLink: async (req, res) => {
        const link = {
            linkType: req.body.linkType,
            userId: req.body.userId,
            bookId: req.body.bookId,
            date: Date(),
        };

        const errors = {};
        if (!link.linkType) {
            errors.linkType = "Missing link type";
        } else if (link.linkType !== "wishlist" && link.linkType !== "cart") {
            errors.linkType = "Invelid link type";
        }
        await UserDb.findByPk(link.userId)
            .then((user) => {
                if (!user) {
                    errors.user = "User not found";
                }
            })
            .catch(() => {
                res.status(500).send({ message: "Server error" });
            });

        await BookDb.findByPk(link.bookId)
            .then((book) => {
                if (!book) {
                    errors.book = "Book not found";
                }
            })
            .catch(() => {
                res.status(500).send({ message: "Server error" });
            });

        await LinkDb.findOne({
            where: {
                linkType: link.linkType,
                userId: link.userId,
                bookId: link.bookId,
            },
        })
            .then(() => {
                errors.existing = "Link already added";
            })
            .catch(() => {
                res.stauts(500).send({ message: "Server error" });
            });

        if (Object.keys(errors).length === 0) {
            await LinkDb.create(link)
                .then(() => {
                    res.status(201).send({ message: "Link created" });
                })
                .catch(() => {
                    res.status(500).send({ message: "Server error" });
                });
        } else {
            res.status(400).send(errors);
        }
    },

    getAllLinks: async (req, res) => {
        await LinkDb.findAll({
            where: {
                userId: req.params.id,
                linkType: req.body.linkType,
            },
            include: [BookDb],
        })
            .then((links) => {
                res.status(201).send(links);
            })
            .catch(() => {
                res.status(500).send({ message: "Server error" });
            });
    },

    deleteLink: async (req, res) => {
        await LinkDb.findByPk(req.params.id)
            .then(async (link) => {
                if (link) {
                    await link.destroy().then(() => {
                        res.status(201).send({ message: "Link deleted" });
                    });
                } else {
                    res.stauts(404).send({ message: "Link not found" });
                }
            })
            .catch(() => {
                res.status(500).send({ message: "Server error" });
            });
    },

    purchase: async (req, res) => {
        res.status(501).send({ message: "Not implemented" });
    },
};

module.exports = controller;
