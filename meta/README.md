Developer Notes
===============

This document is useful for developers of Muboard.


Dependency Upgrade Checklist
----------------------------

  - Update Muboard version in muboard.js.
  - Update TeXMe version in Makefile.
  - Update Markdown renderer version in Makefile.
  - Update MathJax version in Makefile.


Release Checklist
-----------------

Perform the following tasks for every release:

  - Update version in muboard.js.
  - Update version in README.md.
  - Update version in package.json.
  - Update copyright notice in LICENSE.md.
  - Update copyright notice in muboard.js (at 2 places).
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
        git tag $VERSION -m "Muboard $VERSION"
        git push origin master $VERSION

  - Publish package.

        npm login
        npm publish

  - Publish documentation and examples.

        make live


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
