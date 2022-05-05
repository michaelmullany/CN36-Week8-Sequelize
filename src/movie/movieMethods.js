const { Movie } = require("./tables");

exports.addMovie = async (movieObj) => {
    try {
        await Movie.create(movieObj);
    } catch (error) {
        console.log(error);
    }
}

exports.listMovies = async () => {
    try {
        return await Movie.findAll();
    } catch (error) {
        console.log(error)
    }
}

exports.updateMovie = async(updateData, condition) => {
    try {
        await Movie.update(updateData, condition);
    } catch (error) {
        console.log(error);
    }
}

exports.deleteMovie = async(condition) => {
    try {
        await Movie.destroy(condition);
    } catch (error) {
        console.log(error);
    }
}