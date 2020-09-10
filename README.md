# MATCHA - Dating App
This is a team project, a part of the web branch at [Hive Helsinki](https://www.hive.fi/) coding school.

- [Task](#task)
- [Authors](#authors)
- [Functionality](#functionality)
- [Tech stack](#tech-stack)
- [Planning](#planning)
  * [Work breakdown](#work-breakdown)
  * [Database structure](#database-structure)
  * [Website wireframe](#website-wireframe)
- [App Preview](#app-preview)
- [Run locally](#run-locally)

## Authors
Tatiana Kuumola and [Diana Mukaliyeva](https://github.com/DianaMukaliyeva)

## Task
The aim of this project is to build a Tinder-like web app, where the users can create their profile, browse through a list of recommended profiles or conduct search by age, distance, fame rating, commong tags. Users can like, report and block other users and chat with users that liked them back. 

Project constraints:
* Clientside: HTML, CSS, Javascript
* Relational or graph-oriented database
* Micro-frameworks and UI libraries are allowed
* No ORM, validatores or User Account Manager
* No errors, warnings or notice on both server- and client- sides
* No security breaches (e.g. no SQL, HTML injections, plain passwords in the dataases)
* Compatible at least with Firefox (>=41) and Chrome (>= 46)
* Responsive design

## Stack
This is the first project in Hive Web branch when we were allowed to choose the language. Our team decided to use this opporutnity to learn PERN stack. This was the first time for both of us to use PostgreSQL, React, Redux and also JWT, Material UI and Socket.io. We also used this project to learn more about Node.js projects structures (including folder structure, configuring env variables and MVC pattern).

* PostgreSQL
* Express
* React, Redux
* Node
* JWT
* Material UI
* Socket.io

## Functionality
* User features:
	* Advanced user registeration and login (Oauth) and password reset through email link
	* User data management: modify user data (username, email, etc), change password, set email and push notification preferences)
	* View own and other user profiles
	* View user profile visit history, list of connected and liked profiles
* Matching features:
	* Multiple infinite scroll galleries with list of suggestions that match his/her profile (recommended, online, popular, nearby).
	* Matching Alogrimth using scoring weights based on chinese and western horoscope compatibility, common tags, fame ratng, location, age and gender.
	* Advanced range sliders to sort and filter users by horoscope believe, common tags, location, fame rating and age.
* Chat features:
	* FB messange-like real-time chat for matched users.
* Notifications features:
	* Real-time notifications when user receives a like/unlike, user's profile was checked, user received a message. 

## Planning
## Work breakdown
TBC
### Database structure
![Database planning](../assets/db.png?raw=true)

### Website wireframe
See full mobile and desktop versions.
![Gallery draft](../assets/wireframe.png?raw=true)

## App Preview
Live preview here
Snapshops

## Run locally
* Create a file .env in backend/config folder.

	```
	# database configuration
	DB_USER=postgres
	DB_NAME=matcha-1
	DB_PWD=123456

	# server configuration
	PORT=5000
	```
* Remember to configure Postgres database in accordance with your database credentials.

* Run command `npm run init` in the root folder to install all dependencies in all folders.

* Run command `npm run dev` to start a server.