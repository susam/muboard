Developer Notes
===============

Release Checklist
-----------------

Perform the following tasks for every release:

  - Update version in README.md.
  - Update version in package.json.
  - Update version in Makefile.
  - Update copyright notice in LICENSE.md.
  - Update copyright notice in texme.js.
  - Update CHANGES.md.
  - Run tests.

        npm test

  - Update minified script.

        npm run min

  - Commit changes.

        git status
        git add -p

  - Tag the release.

        VERSION=<VERSION>

        git commit -em "Set version to $VERSION"
        git tag $VERSION -m "TeXMe $VERSION"
        git push origin master $VERSION 

  - Publish package.

        npm login
        npm publish

  - Publish documentation and examples.

        make pushlive


Post-Release Checklist
----------------------

Perform the following tasks after every release:

  - Update version in package.json to the next dev version (`X.Y.Z-dev` format).

  - Commit.

        git add -p
        git status

        VERSION=$(sed -n 's/.*version.*: "\(.*\)",/\1/p' package.json)
        echo VERSION: $VERSION

        git commit -em "Set version to $VERSION"
        git push origin master
