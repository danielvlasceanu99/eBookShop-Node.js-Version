module.exports = (sequelize, DataTyes) => {
    return sequelize.define(
        "book",
        {
            isbn: DataTyes.STRING,
            title: DataTyes.STRING,
            description: DataTyes.STRING,
            genre: DataTyes.STRING,
            rating: DataTyes.DOUBLE,
            price: DataTyes.DOUBLE,
        },
        {
            underscored: true,
        }
    );
};
