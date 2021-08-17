const ReviewDb = require("../models").Review;
const BookDb = require("../models").Book;
const UserDb = require("../models").User;

const controller = {
    addReview: async (req, res) => {
        const review = {
            comment: req.body.comment,
            rating: req.body.rating,
            bookId: req.body.bookId,
            userId: req.body.userId,
        };
        const errors = {};
        if (!review.comment) {
            errors.comment = "Missing comment";
        }

        if (!review.rating) {
            errors.rating = "Missing rating";
        }

        if (!review.bookId) {
            errors.bookId = "Missing book";
        } else {
            const book = await BookDb.findByPk(review.bookId);
            if (!book) {
                errors.bookId = "Inexistent book";
            }
        }

        if (!review.userId) {
            errors.userId = "Missing user";
        } else {
            const user = await UserDb.findByPk(review.userId);
            if (!user) {
                errors.userId = "Inexistent user";
            }
        }

        if (Object.keys(errors).length === 0) {
            await ReviewDb.create(review)
                .then(async () => {
                    const book = await BookDb.findByPk(review.bookId);
                    const noReviews = await ReviewDb.count({
                        where: {
                            book_id: book.id,
                        },
                        distinct: true,
                        col: "Review.Id",
                    });
                    const rating = (book.rating * (noReviews - 1) + review.rating) / noReviews;
                    await book
                        .update({
                            rating: rating,
                        })
                        .then(() => {
                            res.status(201).send({ message: "Review created" });
                        })
                        .catch(() => {
                            res.status(500).send({ message: "Server error" });
                        });
                })
                .catch((err) => {
                    res.status(500).send({ message: "Server error" });
                });
        } else {
            res.status(400).send(errors);
        }
    },

    getAllReviews: async (req, res) => {
        await ReviewDb.findAll({
            include: [BookDb, UserDb],
        })
            .then((reviews) => {
                res.status(201).send(reviews);
            })
            .catch(() => {
                res.status(500).send({ message: "Server error" });
            });
    },

    updateReview: async (req, res) => {
        await ReviewDb.findByPk(req.params.id)
            .then(async (review) => {
                if (!review) {
                    res.status(404).send({ message: "Review not found" });
                } else {
                    const errors = {};
                    if (!req.body.comment) {
                        errors.comment = "Missing comment";
                    }

                    if (!req.body.rating) {
                        errors.rating = "Missing rating";
                    }
                    const oldRating = review.rating;
                    if (Object.keys(errors).length === 0) {
                        await review
                            .update({
                                comment: req.body.comment,
                                rating: req.body.rating,
                            })
                            .then(async () => {
                                const book = await BookDb.findByPk(review.bookId);
                                const noReviews = await ReviewDb.count({
                                    where: {
                                        bookId: book.id,
                                    },
                                    distinct: true,
                                    col: "Review.Id",
                                });
                                const rating = book.rating - oldRating / noReviews + req.body.rating / noReviews;
                                console.log(oldRating, book.rating, req.body.rating, noReviews);
                                await book
                                    .update({
                                        rating: rating,
                                    })
                                    .then(() => {
                                        res.status(201).send({ message: "Review updated" });
                                    })
                                    .catch(() => {
                                        res.status(500).send({ message: "Server error" });
                                    });
                            })
                            .catch(() => {
                                res.status({ message: "Server error" });
                            });
                    } else {
                        res.status(400).send(errors);
                    }
                }
            })
            .catch(() => {
                res.status(500).send({ message: "Server error" });
            });
    },

    deleteReview: async (req, res) => {
        await ReviewDb.findByPk(req.params.id).then(async (review) => {
            const oldRating = review.rating;
            const id = review.bookId;
            await review
                .destroy()
                .then(async () => {
                    const book = await BookDb.findByPk(id);
                    const noReviews = await ReviewDb.count({
                        where: {
                            bookId: book.id,
                        },
                        distinct: true,
                        col: "Review.Id",
                    });
                    const rating = (book.rating * (noReviews + 1) - oldRating) / noReviews;
                    await book
                        .update({
                            rating: rating,
                        })
                        .then(() => {
                            res.status(201).send({ message: "Review deleted" });
                        })
                        .catch(() => {
                            res.status(500).send({ message: "Server error" });
                        });
                })
                .catch(() => {
                    res.status(500).send({ message: "Server error" });
                });
        });
    },
};

module.exports = controller;
