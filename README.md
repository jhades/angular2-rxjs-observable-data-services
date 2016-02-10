# Angular 2 RxJs Observable Data Services example application

This repository is an example of how to build a Flux-like Angular 2 application using RxJs and the Observable Data Services design pattern. 

See this blog post for further details on this application architecture: 
[How to build Angular 2 Flux apps using RxJs Observable Data Services - Pitfalls to avoid](http://blog.jhades.org/angular-2-application-architecture-building-applications-using-rxjs-and-functional-reactive-programming-vs-redux/)

## Installation

To install the application, make sure to have npm 3 or higher and node 4 or higher, and follow the following steps:

    npm install
    
## Running the application

The application uses the webpack-dev-server to produce an in-memory development bundle. It also has a node.js REST backend with a simple in-memory data store. The way that this works is that we hit the node.js backend server, which will proxy the bundle.js request to the webpack development server.

In order to run the application, first start the webpack-dev-server in one terminal:

    npm run webpack-dev-server
    
Then in another terminal window, run the node.js server that will both serve the REST API and the HTML/CSS of the application:

    npm start
    
You can access the application in the followwing Url:

[http://localhost:8080/](http://localhost:8080)

You can add, remove or toggle a TODO item. Notice when adding the Todo that the message panel in the footer shows the status of what is going on.



