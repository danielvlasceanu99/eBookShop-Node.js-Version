module.exports = (sequelize, DataTyes) => {
    return sequelize.define(
        "file",
        {
            fileName: DataTyes.STRING,
            fileType: DataTyes.STRING,
        },
        {
            underscored: true,
        }
    );
};
