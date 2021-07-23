# CentevaCore
## Angular Version (10 or greater) required
Centeva Core is a Common Angular package designed to contain reusable Angular pipes, directives, services, and Components.


# Making Changes

It is recommended to not add anything to this repository until it is completely working within an existing project, as it may be hard to actively develop while using a package.

## Versioning
Please deploy an accurate version when publishing your changes, see below.

**MAJOR**.**MINOR**.**PATCH** === **1.1.1**

1. **MAJOR** version when you make incompatible API changes.
2. **MINOR** version when you add functionality in a backwards compatible manner.
3. **PATCH** version when you make backwards compatible bug fixes.
## Package and Publish


- `npm run build` will package any changes up to the /dist folder.
- `npm run publish` will publish the dist/ folder as a new version to NPM.

# Setting Up NPM link

**NPM LINK** is used to test centeva-core package locally without having to package and publish.

1. CD to the /dist/centeva-core folder. 
2. Run `npm link`
3. Within your test project that you would like to use centeva-core run `npm link centeva-core`.
4. Anytime you make a change in centeva-core run `npm run build` to rebuild the /dist folder.
5. You will need to re-run your watch command in your centeva-core consuming application after any changes.
