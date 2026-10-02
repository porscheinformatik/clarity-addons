# Contributing

## Reporting Bugs and Creating Issues

You can submit an issue or a bug to our GitHub repository. You must provide:

- The link to the reproduction scenario you created using one of the Clarity StackBlitz Templates
- If possible, please provide a minimal demo illustrating the issue by forking one of the Clarity StackBlitz Templates
- The version number of Angular, Clarity and Clarity Addons
- The browser name and version number
- Screenshot is also a good way to show us what is the issue
- When providing the NPM package version, make sure to check them from the package-lock.json file. This is extremely important in the cases that NPM versioning tags are applied.

## Contribution Process for Developers

Start by [forking](https://help.github.com/articles/fork-a-repo/) the repository. Make your changes locally and be sure to run all tests, check the format and run the build with:

    npm run test:ci

Before submitting the pull request please rebase to the current master (or release branch) and check/test your code again.

Also provide some demo/documentation code in the website folder for the deployed documentation.

Next, create the pull request and provide a description of the changes. Reference any issue numbers when the code change fixes a bug or implements an enhancement.

### Testing the library locally

To test the clarity-addons library locally you can start a dev environment via "npm run start", which starts the application located in /src/dev. Feel free to add demo pages to test your component. This will be seen by developers only so it's for functional testing and doesn't have to meet any styling standards.

### Testing the documentation locally

To test the documentation which will be visible on the documentation page, execute the command "npm run start" inside the /website folder. Make sure to always add documentation when developing components.

## Versioning schema

A new version will be created whenever an important breaking change happens (e.g. massive refactoring), a new component is ready or a bugfix needs to be published

- MAJOR: following the respective Angular version
- MINOR: on every new component/feature
- PATCH: for bugfix only releases

### Preparing a release from GitHub

In **Actions → Prepare release → Run workflow**, select the `master` branch and choose
`patch`, `minor`, or `release` (a major version bump). Major versions follow Angular,
so only choose `release` when the corresponding Angular upgrade is ready.

The workflow updates the root version, runs `npm i` and `npm run build`, then runs
`npm i` in `website` to refresh the lockfile for the locally built library. The build
updates `src/clr-addons/package.json` and `dist/clr-addons/package.json`; the package
template in `npm/clr-addons/package.json` keeps its version placeholders.

The updated root package and lockfile, generated source package, and website lockfile
are pushed to a `prepare-release/<version>` branch, and the workflow opens a pull
request against `master`. Review and merge that pull request to prepare the release.
Repository settings must allow GitHub Actions to create pull requests. Runs on other
branches are skipped, and simultaneous release preparations are serialized.

This prepares the release without publishing it. Create a GitHub release targeting
the resulting commit to trigger the existing npm publication and website deployment
workflow.
