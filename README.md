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

# API Routes
Here are the endpoints for this API:
* `/player` (GET & POST)
* `/player/:id` (GET & PUT)
* `/team` (GET & POST)
* `/game` (GET & POST)
* `/game/:id` (GET)
* `/pitch` (GET & POST)

### `/player`
* GET
    + Parameters: None
    + Returns: The full list of all the players in the database along with their stats

Example:
```JSON
[
    {
        "id": 1,
        "firstName": "Alberto",
        "lastName": "Franco",
        "jerseyNumber": 15,
        "position": 8,
        "hardHitBalls": 4,
        "ballsInPlay": 4,
        "o_swingTotal": 1,
        "pitchesOutsideZone": 2,
        "contactOutsideZoneTotal": 2,
        "z_swingTotal": 1,
        "pitchesInsideZone": 2,
        "contactInZoneTotal": 2,
        "totalPitches": 4,
        "swingAndMissTotal": 0,
        "BIPinTheZoneTotal": 2,
        "BIPoutsideTheZoneTotal": 2,
        "createdAt": "2018-01-19T05:40:58.516Z",
        "updatedAt": "2018-01-19T05:44:57.412Z",
        "TeamId": 1
    },
    {
        "id": 2,
        "firstName": "Matt",
        "lastName": "Sola-Baker",
        "jerseyNumber": 2,
        "position": 8,
        "hardHitBalls": 1,
        "ballsInPlay": 2,
        "o_swingTotal": 2,
        "pitchesOutsideZone": 0,
        "contactOutsideZoneTotal": 0,
        "z_swingTotal": 0,
        "pitchesInsideZone": 3,
        "contactInZoneTotal": 2,
        "totalPitches": 3,
        "swingAndMissTotal": 0,
        "BIPinTheZoneTotal": 2,
        "BIPoutsideTheZoneTotal": 0,
        "createdAt": "2018-01-19T05:41:43.566Z",
        "updatedAt": "2018-01-19T05:45:24.812Z",
        "TeamId": 1
    },

    ...

    {
        "id": 10,
        "firstName": "Richy",
        "lastName": "Bethea",
        "jerseyNumber": 13,
        "position": 8,
        "hardHitBalls": 0,
        "ballsInPlay": 0,
        "o_swingTotal": 0,
        "pitchesOutsideZone": 0,
        "contactOutsideZoneTotal": 0,
        "z_swingTotal": 0,
        "pitchesInsideZone": 0,
        "contactInZoneTotal": 0,
        "totalPitches": 0,
        "swingAndMissTotal": 0,
        "BIPinTheZoneTotal": 0,
        "BIPoutsideTheZoneTotal": 0,
        "createdAt": "2018-01-19T05:43:56.775Z",
        "updatedAt": "2018-01-19T05:43:56.775Z",
        "TeamId": 1
    },
]
```

* POST
    + Parameters:
    ```JSON
    {
        "firstName": String,
        "lastName": String,
        "jerseyNumber": Int,
        "position": Int,
        "teamid": Int,
    }
    ```
    + Returns: Nothing. A new player is created

### `/player/:id`
* GET
    + Parameters: `:id`, the id of the player you want
    + Returns: All the stats for the specific info

Example: (getting player with id of 1)
```JSON
{
    "id": 1,
    "firstName": "Alberto",
    "lastName": "Franco",
    "jerseyNumber": 15,
    "position": 8,
    "hardHitBalls": 4,
    "ballsInPlay": 4,
    "o_swingTotal": 1,
    "pitchesOutsideZone": 2,
    "contactOutsideZoneTotal": 2,
    "z_swingTotal": 1,
    "pitchesInsideZone": 2,
    "contactInZoneTotal": 2,
    "totalPitches": 4,
    "swingAndMissTotal": 0,
    "BIPinTheZoneTotal": 2,
    "BIPoutsideTheZoneTotal": 2,
    "createdAt": "2018-01-19T05:40:58.516Z",
    "updatedAt": "2018-01-19T05:44:57.412Z",
    "TeamId": 1
}
```

* PUT
    + Parameters:
    ```JSON
    {
        "result": Int,
        "ballStrike": String,
        "swing": Boolean
    }
    ```
    + `ballStrike` : Either "ball" or "strike"
    + Returns: Nothing. The player with `:id` is updated according to the parameters above

### `/team`
* Get
    + Parameters: None
    + Returns: A list of teams in the database

Example:
```JSON
[
    {
        "id": 1,
        "name": "City College of New York",
        "createdAt": "2018-01-19T05:35:37.046Z",
        "updatedAt": "2018-01-19T05:35:37.046Z"
    },
    {
        "id": 2,
        "name": "Baruch",
        "createdAt": "2018-01-19T05:39:44.720Z",
        "updatedAt": "2018-01-19T05:39:44.720Z"
    },
    {
        "id": 3,
        "name": "John Jay",
        "createdAt": "2018-01-19T05:39:52.412Z",
        "updatedAt": "2018-01-19T05:39:52.412Z"
    }
]
```

* POST
    + Parameters: 
    ```JSON
    {
        "teamName": String
    }
    ```
    + Returns: Nothing. A new team is added to the database

