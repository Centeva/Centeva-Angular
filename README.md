# CentevaCore

Centeva Core is a Common Angular library.

## Table of Contents

1. [About the Project](#about-the-project)
    * [Built With](#built-with)
2. [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
3. [Usage](#usage)
4. [Running Tests](#running-tests)
5. [Versioning](#versioning)
6. [Contributing](#contributing)
    * [Setup](#setup)
    * [NPM link](#npm-link)


## About The Project

CentevaCore is a collection of Angular pipes, directives, services, and Components designed to help others do common things across multiple of our projects.
[NPM Package](https://www.npmjs.com/package/centeva-core)

### Built With

* [Angular](https://angular.io/)
* [Npm](https://www.npmjs.com/)
* [Ng-packagr](https://github.com/ng-packagr/ng-packagr)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to
install them.

### Installation

CentevaCore is an npm package and can be added to a project with npm.

* npm

  ```sh
  npm i centeva-core -D
  ```

### Compatibility

| Version | Angular Compatibility |
| - | - |
| 4.x | 14.x |
| 5.x | 15.x, 16.x (MDC-based Material Components) |

## Usage

Once installed you can import modules in your application.

```ts
import { LoadingModule } from 'centeva-core';

@NgModule({
  imports: [
    LoadingModule
  ]
})
export class AppModule{}
```

## Running Tests

Tests are written in karma/jasmine and can be ran with `npm test`. There is also a ci specific test with the command `npm test:ci`. There is a PR check that will automatically run tests when a Pull Request is created.

## Versioning

Please deploy an accurate version when publishing your changes, see below.

**MAJOR**.**MINOR**.**PATCH** === **1.1.1**

1. **MAJOR** version when you make incompatible API changes.
2. **MINOR** version when you add functionality in a backwards compatible manner.
3. **PATCH** version when you make backwards compatible bug fixes.

## Contributing

### Setup

1. Clone the repo

   ```sh
   git clone https://bitbucket.org/centeva/centeva-angular.git
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

### NPM link

**NPM LINK** is used to test centeva-core package locally without having to package and publish.

1. CD to the /dist/centeva-core folder. 
2. Run `npm link`
3. Within your test project that you would like to use centeva-core run `npm link centeva-core`.
4. Anytime you make a change in centeva-core run `npm run build` to rebuild the /dist folder.
5. You will need to re-run your watch command in your centeva-core consuming application after any changes.
