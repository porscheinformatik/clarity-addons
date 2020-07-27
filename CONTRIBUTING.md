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

    npm run test:travis

Before submitting the pull request please rebase to the current master (or release branch) and check/test your code again.

Next, create the pull request and provide a description of the changes. Reference any issue numbers when the code change fixes a bug or implements an enhancement.
