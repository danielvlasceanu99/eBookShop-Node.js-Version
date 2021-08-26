const userDb = require("../models").User;

const controller = {
    registerUser: async (req, res) => {
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
        } else if (!user.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")) {
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

    changePassword: async (req, res) => {
        await userDb
            .findByPk(req.params.id)
            .then(async (user) => {
                if (user) {
                    if (!req.body.password) {
                        res.status(400).send({ message: "Missing new password" });
                    } else if (!req.body.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")) {
                        res.status(400).send({ message: "Invalid password" });
                    } else {
                        await user
                            .update({
                                password: req.body.password,
                            })
                            .then(() => {
                                res.status(201).send({ message: "Password updated" });
                            })
                            .catch(() => {
                                res.status(500).send({ message: "Server error" });
                            });
                    }
                } else {
                    res.stauts(404).send({ message: "User not found" });
                }
            })
            .catch(() => {
                res.status(500).send({ message: "Server error" });
            });
    },

    login: async (req, res) => {
        res.status(501).send({ message: "Not implemented" });
    },

    changeProfilePicture: async (req, res) => {
        res.status(501).send({ message: "Not implemented" });
    },
};

module.exports = controller;
