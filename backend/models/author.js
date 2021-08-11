module.exports = (sequelize, DataTyes) => {
    return sequelize.define(
        "author",
        {
            name: DataTyes.STRING,
            dateOfBirth: DataTyes.DATE,
            dateOfDeath: DataTyes.DATE,
            placeOfBirth: DataTyes.STRING,
            shortDescription: DataTyes.STRING,
            imageName: DataTyes.STRING,
        },
        {
            underscored: true,
        }
    );
};
