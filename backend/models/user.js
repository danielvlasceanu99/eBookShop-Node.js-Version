module.exports = (sequelize, DataTyes) => {
    return sequelize.define(
        "user",
        {
            name: DataTyes.STRING,
            email: DataTyes.STRING,
            password: DataTyes.STRING,
            role: DataTyes.STRING,
        },
        {
            underscored: true,
        }
    );
};
