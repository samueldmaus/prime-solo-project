# Start Overwatch

## Description

'Start Overwatch' is an application aimed at beginner Overwatch players. 'Start Overwatch' has detailed descriptions 
and outlines of all the heroes and map in the game of Overwatch. It is meant to help new players better understand the complex 
interactions that happen in the game, and thus improve their gameplay.

Users will be asked to either register for an account or sign into an existing account. Upon logining in, users can either view heroes, maps, or team compositions.
The heroes tab will display all the heroes in Overwatch, including a picture and a description of all their abilities. The maps tab will allow users to view all
maps, including a short description of the map and 3 heroes that play well on the selected map. Users can favorite individual heroes and maps to save them to their account
for easy access later. The team composition tab allows users to create and save their own team compositions based on the 2-2-2 role rules. Team compositions can be saved to
their user account and given a unique name.


## Screenshots

![mainpage](/public/images/mainpage.png)
![heropage](/public/images/heroespage.png)
![accountpage](/public/images/accountpage.png)

## Prerequisites

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [Express](https://expressjs.com/)
- [Passport.js](http://www.passportjs.org/)
- [Material-UI](https://material-ui.com/)


## Installation
1. Create database and tables using the database.sql file (I recommend installing Postico to create & run sql queries).
2. Fork repository.
3. Clone repository to maching using terminal.
4. Install Express node modules using 'npm install' command in terminal in VS code.
5. Run front-end using 'npm run client' -- run server using 'npm run server'.
6. Create an account and start improving your gameplay!

## Usage
1. There is an 'admin' and 'user' authentication level to this project.
2. 'Admin' level users are able to add, delete, and update heroes and maps in the event that the developer of Overwatch make changes to the game.
3. 'User' level users are able to view and interact with the heroes and maps, as well as create team compositions.

## Acknowledgement
Thanks to [Prime Digital Academy](https://www.primeacademy.io) who equipped me with the skills and necessary guideance to make this application a reality

## Support
If you have suggestions or issues, please email me at samueldmaus@gmail.com