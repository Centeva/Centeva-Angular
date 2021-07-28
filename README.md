# CentevaCore

[NPM Package](https://www.npmjs.com/package/centeva-core)

Using npm:

```bash
$ npm i centeva-core --save
```

## Angular Version (10 or greater) required
Centeva Core is a Common Angular package designed to contain reusable Angular pipes, directives, services, and Components.

## Versioning
Please deploy an accurate version when publishing your changes, see below.

**MAJOR**.**MINOR**.**PATCH** === **1.1.1**

1. **MAJOR** version when you make incompatible API changes.
2. **MINOR** version when you add functionality in a backwards compatible manner.
3. **PATCH** version when you make backwards compatible bug fixes.

# Setting Up NPM link

**NPM LINK** is used to test centeva-core package locally without having to package and publish.

1. CD to the /dist/centeva-core folder. 
2. Run `npm link`
3. Within your test project that you would like to use centeva-core run `npm link centeva-core`.
4. Anytime you make a change in centeva-core run `npm run build` to rebuild the /dist folder.
5. You will need to re-run your watch command in your centeva-core consuming application after any changes.

# Actions
Github actions are setup to run tests/lint on ever pr. Make sure they pass before merging! change!
