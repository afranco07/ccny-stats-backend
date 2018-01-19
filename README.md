# Live site
You can find a live version of the site and all of its routes at: https://ccnybackend.herokuapp.com/

# Setup
1. Make sure you have `PostgreSQL` installed.
2. Create a new `PostgreSQl` user with whichever username you want, using the commands:
```bash
sudo su - postgres
createuser -P -s -e USERNAME_HERE
exit
```
3. Create a new `PostgreSQL` database named `ccny_development` (you can use another name if you wish, replace `ccny_development` with the name you want) using the commands
```bash
createdb -h localhost -U USERNAME_HERE ccny_development
```
4. Edit `package.json`
    + Add your project name, version, description, authors
    + Add any other packages you may need

5. Edit `config/config.json`
    + Add your username and password created in _STEP 2_, and database names created in _STEP 3_

# Running
1. Navigate to cloned directory and run `npm install`
2. To start the server, run `npm start`

# Explanations

- `/config/config.json`
    + This file contains the credentials for connecting to your postgres database. You need to make sure these details match your DB setup.
- `/controllers`
    + This is where you should store all the logic handling URL routes and business logic for your app.
    + `index.js` is where you load up the different files
    + You can write your controller code in many styles. I've provided you two options in the `home.js` and the `alt.js` files. Pick one style and use it for all of your controllers. This is really a matter of preference.
- `/models`
    + This is where your sequelize models will go.
    + `index.js`: you **do not** have to modify this file. This file connects to the Postgres database for you, loads up all models in the folder, and sets up all associations.
- `app.js`
    + This file sets up the basic packages for our projects. Feel free to add more as you see fit.
    + This file already loads up your controllers, so no additional loading is necessary for that to work.
    