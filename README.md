Muboard
=======

[Muboard][Muboard URL] is a tiny utility that runs a mathematics
display board as a web page. Muboard lets you quickly scribble
mathematics snippets using Markdown and LaTeX while presenting your
desktop screen to others during real-world or virtual meetings.

[![View Muboard][Muboard SVG]][Muboard URL]
[![View Demo][Demo SVG]][Demo URL]
[![MIT License][License SVG]][L]
[![Mastodon][Mastodon SVG]][Mastodon URL]

[Muboard SVG]: https://img.shields.io/badge/view-muboard-brightgreen
[Muboard URL]: https://susam.github.io/muboard/
[Demo SVG]: https://img.shields.io/badge/view-demo-brightgreen
[Demo URL]: https://susam.github.io/muboard/mu.html
[License SVG]: https://img.shields.io/badge/license-MIT-%233ea639
[Mastodon SVG]: https://img.shields.io/badge/mastodon-%40susam-%236364ff
[Mastodon URL]: https://mastodon.social/@susam


Contents
--------

* [Get Started](#get-started)
* [Distributable Boards](#distributable-boards)
* [Features](#features)
* [Why?](#why)
* [Mirror](#mirror)
* [License](#license)
* [Support](#support)
* [More](#more)


Get Started
-----------

To get started with using Muboard, [click here][Muboard URL] and start
typing Markdown + LaTeX input at the text field at the bottom.

Here is an example screenshot that shows how Muboard with some content
looks like:

<div align="center">
<img width="800" src="https://i.imgur.com/S6egQzg.png">
</div>


Distributable Boards
--------------------

Muboard can be used to create distributable boards. To try it out,
copy and paste the code below into an HTML file with `.html`
extension:

```html
<!DOCTYPE html><script src="https://cdn.jsdelivr.net/npm/muboard@0.5.2"></script><textarea>

# The Möbius function

For any positive integer $ n $, the Möbius function $ \mu(n) $ is
defined as follows:

$$ \mu(1) = 1; $$

If $ n > 1, $ write $ n = p_1^{a_1} \dots p_k^{a_k} $ (prime
factorization). Then

\begin{align*}
  \mu(n) & = (-1)^k \text{ if } a_1 = a_2 = \dots = a_k = 1, \\
  \mu(n) & = 0 \text{ otherwise}.
\end{align*}

If $ n \ge 1, $ we have

$$
  \sum_{d \mid n} \mu(d) =
  \begin{cases}
    1 & \text{ if } n = 1, \\
    0 & \text{ if } n > 1.
  \end{cases}
$$
```

Now open this file with a web browser. This is a self-rendering
distributable board file. It renders itself to look like this:
[mu.html][Demo URL].


### Valid HTML5

The code snippet in the previous section shows how we can create a
self-rendering document with a single line of HTML code but this
brevity comes at the cost of standard conformance. For example, the
required `<title>` element is missing from the code. Further the
`<textarea>` element is not closed. Despite the missing tags, this
example works just fine because all web browsers follow the
[robustness principle][robustness].

For the sake of completeness and correctness, here is a minimal but
complete and valid HTML example:
[mu-html5.html](https://susam.github.io/muboard/mu-html5.html)
([source](examples/mu-html5.html)). It has a few more lines of code
to ensure that this HTML5 code validates successfully at
[validator.w3.org][validator]. In case you are wondering, a valid
HTML5 document does not require explicit `<head>`, `<body>`, or the
closing `</html>` tags, so they have been omitted for the sake of
brevity while maintaining completeness and correctness in this
example.

[robustness]: https://en.wikipedia.org/wiki/Robustness_principle
[validator]: https://validator.w3.org/#validate_by_input


Features
--------

* Runs in a web browser.
* Keyboard driven user interface.
* Vertical splits.
* Input is just LaTeX, Markdown, and HTML. Avoids any new syntax.
* Conforms to CommonMark specification of Markdown.
* Conforms to GitHub Flavored Markdown (GFM), a strict superset of
  CommonMark.
* Supports a [subset of LaTeX][macros] using MathJax.
* Supports creating self-rendering distributable boards with a single
  line of HTML.
* Supports editing commands such as `,i`, `,d`, `,align*`, etc. to
  automatically insert LaTeX delimiters for inline mathematics,
  display mathematics, align environment, etc. (Type `,help` in the
  board input to see a complete list of supported commands.)
* Support for saving/loading snippets to/from browser's local storage.
* Not a [WYSIWYG][wysiwyg] tool.
* Not a collaborative editing tool.

[macros]: http://docs.mathjax.org/en/latest/input/tex/macros/index.html
[wysiwyg]: https://en.wikipedia.org/wiki/WYSIWYG


Why?
----

Muboard was created originally for [analytic number theory club
meetings][meet] that I used to host in 2021. During the meetings, I
needed a place to type out mathematics formulas and render them
quickly. I chose to write a tiny non-WSYIWYG tool because I prefer
such tools. It also helps in keeping the LaTeX snippets in an HTML
file that can render itself using JavaScript.

The name *Muboard* is a reference to the Möbius function *μ(n)* which
was the first function definition we discussed using this tool.

[meet]: https://susam.net/maze/meet/iant/


License
-------

This is free and open source software. You can use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of it,
under the terms of the MIT License. See [LICENSE.md][L] for details.

This software is provided "AS IS", WITHOUT WARRANTY OF ANY KIND,
express or implied. See [LICENSE.md][L] for details.

[L]: LICENSE.md


Support
-------

To report bugs, suggest improvements, or ask questions,
[create issues][issues].

[issues]: https://github.com/susam/muboard/issues


More
----

See [TeXMe](https://github.com/susam/texme), a lightweight utility to
create self-rendering and distributable Markdown + LaTeX documents.

See [MathB](https://github.com/susam/mathb), a mathematics pastebin
built using TeXMe. This is the oldest mathematics pastebin that is
still alive on the web and serving its community of users.
