const yargs = require("yargs");
const { sequelize } = require("./db/connection");
//imports for CRUD functions
const { addMovie, listMovies, updateMovie, deleteMovie } = require("./movie/movieMethods");
const { addDirector, getDirectorId, listDirectors, deleteDirector } = require("./director/directorMethods");
const Movie = require('./movie/movieTable');
const Director = require('./director/directorTable');

Director.hasMany(Movie);
Movie.belongsTo(Director);

const app = async (yargsObj) => {
    console.log(yargsObj);
    try {
        await sequelize.sync();
        if (yargsObj.add) {
            //add movie to database
            console.log("Getting ID for: " + yargsObj.director)
            const directorObj = await getDirectorId({name: yargsObj.director});
            console.log("Got ID: " + directorObj.id);
            await addMovie({title: yargsObj.title, year: yargsObj.year, DirectorId: directorObj.id });
        } else if (yargsObj.adddirector) {
            //add director to database
            await addDirector({name: yargsObj.name});
        }  else if (yargsObj.list) {
            //list all movies
            console.log(await listMovies());
        } else if (yargsObj.listdirectors) {
            //list all directors
            console.log(await listDirectors());
        } else if (yargsObj.update) {
            //update one movie
            await updateMovie({year: yargsObj.year}, {where: {title: yargsObj.title}});
        } else if (yargsObj.delete) {
            //delete one movie
            await deleteMovie({where: {title: yargsObj.title}});
        } else if (yargsObj.deletedirector) {
            //delete one director
            await deleteDirector({where: {name: yargsObj.name}});
        } 
        else {
            console.log("Incorrect Command");
        }
    } catch (error) {
        console.log(error);
    }
}

app(yargs.argv);