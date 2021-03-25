Changelog
=========

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
- Editing macros:
  - `,clear`: Clear text input field and the board.
  - `,i`: Insert inline mathematics.
  - `,d`: Insert display mathematics.
  - `,align;`: Insert align environment.
  - `,align*`: Insert align* environment.
  - `,center`: Insert center-aligned text.
  - `,help`: Show help message.
  - `,version`: Show version information.
  - `,license`: Show license information.
