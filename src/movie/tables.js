const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Movie = sequelize.define("Movie", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    year: {
        type: DataTypes.INTEGER,
        defaultValue: 1900,
    }
});

const Director = sequelize.define("Director", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});

Director.hasMany(Movie);
Movie.belongsTo(Director);

module.exports = { Movie, Director };