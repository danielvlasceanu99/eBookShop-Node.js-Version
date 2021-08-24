module.exports = (sequelize, DataTyes) => {
    return sequelize.define(
        "link",
        {
            linkType: DataTyes.STRING,
            date: DataTyes.DATE,
        },
        {
            underscored: true,
        }
    );
};
