module.exports = (sequelize, DataTyes) => {
    return sequelize.define(
        "link",
        {
            linkType: DataTyes.STRING,
        },
        {
            underscored: true,
        }
    );
};
