Changelog
=========

0.3.0 (2021-03-28)
------------------

### Added

- Editing commands:
  - `,article`: Write an article with a fixed maximum width layout.
  - `,split`: Split the board vertically into two columns.
  - `,section`: Insert section element.
  - `,save`: Save current input to the browser's local storage.
  - `,load`: Load an input from the browser's local storage.
  - `,remove`: Remove an input from the browser's local storage.
  - `,list`: List all inputs saved in the browser's local storage.


### Changed

- Remove top margin for only the first element inside the board.
- Reduce font size of first and second level headings (`<h1>` and
  `<h2>`) from the defaults, i.e., usually 2em and 1.5em, respectively
  to 1.5em and 1.25em, respectively, in order to reduce the vertical
  area consumed by headings on the board.
- The `,version` command now shows license information too.
- After a text-centering block is created with the `,center` command,
  leave the cursor on a blank line where the user can start typing
  Markdown code again. Prior to this change, the user was required to
  insert an additional blank line before they could start typing
  Markdown code again.
- Make the board and text input field occupy 100% of the available
  body width and height.
- Focus on input text field after page setup.


### Removed

- Remove `,license` command. License information is now displayed in
  the output of `,version` command.


### Fixed

- Fix `<meta>` element syntax to set device-width and initial-scale.


0.2.0 (2021-03-25)
------------------

### Changed

- Serve `muboard.js` as the default file on CDN, e.g., on visiting
  https://cdn.jsdelivr.net/npm/muboard or https://unpkg.com/muboard
  (i.e., visiting a CDN URL without the filename in the URL).
- Retain bottom margin for the last element inside the board to
  maintain some vertical separation from the bottom edge of the board
  in Firefox. This works around a known issue in Firefox, where bottom
  padding of the board is not sufficient to maintain vertical
  separation between the last line of the text and the bottom of the
  board when the vertical scrollbar appears.


0.1.0 (2021-03-24)
------------------

### Added

- Interactive board.
- Markdown (CommonMark) support.
- LaTeX support using MathJax.
- Support for self-rendering distributable boards with a single line
  of HTML.
- Editing commands:
  - `,clear`: Clear text input field and the board.
  - `,i`: Insert inline mathematics.
  - `,d`: Insert display mathematics.
  - `,align;`: Insert align environment.
  - `,align*`: Insert align* environment.
  - `,center`: Insert center-aligned text.
  - `,help`: Show help message.
  - `,version`: Show version information.
  - `,license`: Show license information.
