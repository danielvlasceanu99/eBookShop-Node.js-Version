const connection = require("../models").connection;

const controller = {
    reset: (req, res) => {
        connection
            .sync({ focce: true })
            .then(() => {
                res.status(200).send({ message: "Database reseted" });
            })
            .catch(() => {
                res.status(500).send({ message: "Server error" });
            });
    },
};

module.exports = controller;
