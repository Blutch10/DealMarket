# DealMarket

[![SchoolProject](https://img.shields.io/badge/School-project-83BD75?labelColor=B4E197&style=for-the-badge)]()


This was a university project with the objective to develop and host our own website. The only requirement was to use Node.js for the backend instead of PHP or .NET for instance. Our group also tried to secure the website from the OWASP Top 10 vulnerabilities (https://owasp.org/www-project-top-ten/) by trying to implement our own counter-measures instead of using existing libraries as an extra exercise (though it would be a bad idea in real life). The project uses HTTP instead of HTTPS but is a choice due to the (free) web hosting solution we chose.

The final project is a cryptocurrency real-time trading simulator website named DealMarket. It is in fact divided in two applications :

* The client application, developped using AngularJS which corresponds to the site the end-user is effectively connecting to. It enables the user to create an account, manage a virtual cryptocurrency wallet and monitor its performances.

* The backend, developped using Node.js, Express and Nedb (a MongoDB fork), which provides a REST API used by the client application and communicating with the Binance API to get real-time data.

## Installation and local test

* Open a terminal in the Server directory and in the App directory. For both terminals :

```sh
$ npm install
...
$ npm start
```

* The client application should launch directly in your browser. If not, navigate to : http://localhost:4200/.

## Authors

* [@Blutch10](https://github.com/Blutch10)
* [@Aeerozz](https://github.com/Aeerozz)
* [@uvsq22008847](https://github.com/uvsq22008847)
* [@MaxBuilder](https://github.com/MaxBuilder)
