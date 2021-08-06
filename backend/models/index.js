const Sequelize = require("sequelize");
const db = require("../config/dbConfig");

const AuthorModel = require("./author");
const BookModel = require("./books");
const FileModel = require("./file");
const LinkModel = require("./link");
const ReviewModel = require("./review");
const UserModel = require("./user");

const Author = AuthorModel(db, Sequelize);
const Book = BookModel(db, Sequelize);
const File = FileModel(db, Sequelize);
const Link = LinkModel(db, Sequelize);
const Review = ReviewModel(db, Sequelize);
const User = UserModel(db, Sequelize);

//Link between Author table and Book table
Author.hasMany(Book, {
    onDelete: "Cascade",
});
Book.belongsTo(Author, {
    foreignKey: "authorId",
});

//Link between Book table and Review table
Book.hasMany(Review, {
    onDelete: "Cascade",
});
Review.belongsTo(Book, {
    foreignKey: "bookId",
});

//Link between User table and Review table
User.hasMany(Review, {
    onDelete: "Cascade",
});
Review.belongsTo(User, {
    foreignKey: "userId",
});

//Link between Book table and File table
Book.hasMany(File, {
    onDelete: "Cascade",
});
File.belongsTo(Book, {
    foreignKey: "bookId",
});

//Link Between Link table and User table
User.hasMany(Link, {
    onDelete: "Cascade",
});
Link.belongsTo(User, {
    foreignKey: "userId",
});

//Link between Link table and Book table
Book.hasMany(Link, {
    onDelete: "Cascade",
});
Link.belongsTo(Book, {
    foreignKey: "bookId",
});

module.exports = {
    Author,
    Book,
    File,
    Link,
    Review,
    User,
    connection: db,
};
