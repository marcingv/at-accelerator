# AtAccelerator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

# Build for production

To build & publish production images run following commands:

```bash
# Build & tag docker image
npm run docker-prod-build

# Publish image to DockerHub:
npm run docker-prod-publish
```

Production image can be run locally using following command:

```bash
docker-compose -f docker-compose.prod.yml up
```

# Kubernetes deployment

To deploy app to production server please run the following commands:

```bash
# Apply deployment:
kubectl apply -f=kubernetes/deployment.yml

# Apply ingress settings:
kubectl apply -f=kubernetes/ingress.yml
```
