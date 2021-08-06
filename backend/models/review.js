module.exports = (sequelize, DataTyes) => {
    return sequelize.define(
        "review",
        {
            comment: DataTyes.STRING,
            rating: DataTyes.DOUBLE,
        },
        {
            underscored: true,
        }
    );
};
