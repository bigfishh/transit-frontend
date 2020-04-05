<h1 align="center">Access Transit 🚞 </h1>

<div align="center">
  A <code>JavaScript</code> application that locates the subway stations with elevators and escalators in New York City 
</div>
<div align="center">
  <sub>Built with ✨ by
  <a href="https://github.com/bigfishh">Annie Zheng</a> and
  <a href="https://github.com/mqshaikh8"> Mohammed Shaikh</a>
  </sub>
</div>

<br/>

<p align="center">
  <img width="100%" height="60%" src="access-transit.gif">
</p>

<div align="center">
  <sub> Explore: 
  <a href="https://www.youtube.com/watch?v=nuExyylFh0I">Demo</a> || <a href="">Deployed App</a>
  </sub>
</div>

## Features 
- View MTA subway stations via Google Maps
- Filter subway stations based on accessibility options:
  - Elevator
  - Escalator
- View and leave reviews of each subway station

## Tech Stack
This web app is built with the following:

[**Backend**](https://github.com/bigfishh/transit_backend)
- Ruby [2.6.1]
- Rails [~> 6.0.2] - MVC web framework used as an API
- Active Model Serializers [~> 0.10.0] - Serializing API routes to JSON
- PostgreSQL [>= 0.18, < 2.0] - Database

**Front End**
- Vanilla JavaScript [ES6]
- Custom CSS3 styling 
- Bootstrap [4.0.0]
- Google Maps JavaScript API

## Installing

**Backend Installation:**

- Clone [backend repo](https://github.com/bigfishh/transit_backend) to your local machine `git clone <backend-repo-url>`
- run `bundle install` to install required dependencies
- run `rails db:create` to create a database locally.
- run `rails db:migrate` to create tables into the database.
- run `rails db:seed` to create seed data.
- run `rails s` to run the server. 

**Frontend Installation:** 

- Clone this repo to your local machine `git clone <this-repo-url>`
- Ensure *transit-backend* is running locally on `http://localhost:3000/`
- run `open index.html`
