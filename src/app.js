const yargs = require("yargs");
const { sequelize } = require("./db/connection");
//imports for CRUD functions
const { addMovie, listMovies, updateMovie, deleteMovie } = require("./movie/movieMethods");
const { addDirector, getDirectorId, listDirectors, deleteDirector, updateDirector } = require("./director/directorMethods");
const Movie = require('./movie/movieTable');
const Director = require('./director/directorTable');

Director.hasMany(Movie);
Movie.belongsTo(Director);

const app = async (yargsObj) => {
    console.log(yargsObj);
    try {
        await sequelize.sync();
        // CREATE
        if (yargsObj.add) {
            //add movie to database
            let directorObj;
            if (yargsObj.director != undefined)
            {
                directorObj = await getDirectorId({ where: {name: yargsObj.director} });
            }
            let id = (directorObj == null ? null : directorObj.id);
            await addMovie({title: yargsObj.title, year: yargsObj.year, rating: yargsObj.rating, DirectorId: id });
        } else if (yargsObj.addDirector) {
            //add director to database
            await addDirector({name: yargsObj.name, dob: yargsObj.dob});
        }  
        // READ
          else if (yargsObj.list) {
            //list all movies
            console.log(await listMovies());
        } else if (yargsObj.listDirectors) {
            //list all directors
            console.log(await listDirectors());
        } 
        // UPDATE
          else if (yargsObj.update) {
            //update one movie
            await updateMovie({year: yargsObj.year, rating: yargsObj.rating}, {where: {title: yargsObj.title}});
        } else if (yargsObj.updateDirector) {
            //update one movie
            await updateDirector({dob: yargsObj.dob}, {where: {name: yargsObj.name}});
        } 
        // DELETE
          else if (yargsObj.delete) {
            //delete one movie
            await deleteMovie({where: {title: yargsObj.title}});
        } else if (yargsObj.deleteDirector) {
            //delete one director
            await deleteDirector({where: {name: yargsObj.name}});
        } else {
            console.log("Incorrect Command");
        }
    } catch (error) {
        console.log(error);
    }
}

app(yargs.argv);