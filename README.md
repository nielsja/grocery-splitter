# GrocerySplitter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Docker Ish

`<image_name>` = grocery-splitter-image-<yyyy-mm-dd>

Make sure the `image_name` is suffixed with date (or something unique to identify)

### Build a Docker image

`docker build -t nielsja/portfolio-site-apps:<image_name> .`

### Run the Docker image

(Only useful for testing initial setup of docker images)

`docker run --name grocery-splitter-container -d -p 8080:80 nielsja/portfolio-site-apps:<image_name>`

### Push a Docker image to Docker Hub repository

`docker push nielsja/portfolio-site-apps:<image_name>`

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
