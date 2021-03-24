Muboard
=======

[Muboard][Muboard URL] is a tiny utility that runs a mathematics
display board as a web page. Muboard lets you quickly scribble
mathematics snippets using Markdown and LaTeX while presenting your
desktop screen to others during real-world or virtual meetings.

[![View Muboard][Muboard SVG]][Muboard URL]
[![View Demo][Demo SVG]][Demo URL]
[![MIT License][License SVG]][L]
[![Twitter][Twitter SVG]][Twitter URL]

[Muboard SVG]: https://img.shields.io/badge/view-muboard-brightgreen
[Muboard URL]: https://muboard.net/
[Demo SVG]: https://img.shields.io/badge/view-demo-brightgreen
[Demo URL]: https://muboard.net/examples/mu.html
[License SVG]: https://img.shields.io/badge/license-MIT-%233ea639
[Twitter SVG]: https://img.shields.io/badge/twitter-%40susam-%231da1f2
[Twitter URL]: https://twitter.com/intent/follow?screen_name=susam


Contents
--------

* [Get Started](#get-started)
* [Distributable Boards](#distributable-boards)
* [Features](#features)
* [Why?](#why)
* [Channels](#channels)
* [License](#license)
* [Support](#support)


Get Started
-----------

To get started with using Muboard, [click here][Muboard URL] and start
typing Markdown + LaTeX input at the text field at the bottom.

Here is an example screenshot that shows how Muboard with some content
looks like:

<div align="center">
<img width="710" src="https://i.imgur.com/UWGwVPV.png">
</div>


Distributable Boards
--------------------

Muboard can be used to create distributable boards. To try it out,
copy and paste the code below into an HTML file with `.html`
extension:

```html
<!DOCTYPE html><script src="https://cdn.jsdelivr.net/npm/muboard@0.1.0"></script><textarea>

# The Möbius function

For any positive integer $ n $, the Möbius function $ \mu(n) $ is
defined as follows:

$$ \mu(1) = 1; $$

If $ n > 1, $ write $ n = p_1^{a_1} \dots p_2^{a_k} $ (prime
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
[mu.html](https://muboard.net/examples/mu.html).


### Valid HTML5

The code snippet in the previous section shows how we can create a
self-rendering document with a single line of HTML code but this
brevity comes at the cost of standard conformance. For example, the
required `<title>` element is missing from the code. Further the
`<textarea>` element is not closed. Despite the missing tags, this
example works just fine because all web browsers follow the
[robustness principle][ROBUSTNESS].

For the sake of completeness and correctness, here is a minimal but
complete and valid HTML example:
[valid-html5.html](https://muboard.net/examples/valid-html5.html)
([source](examples/valid-html5.html)). It has a few more lines of code
to ensure that this HTML5 code validates successfully at
[validator.w3.org][VALIDATOR]. In case you are wondering, a valid
HTML5 document does not require explicit `<head>`, `<body>`, or the
closing `</html>` tags, so they have been omitted for the sake of
brevity while maintaining completeness and correctness in this
example.

[ROBUSTNESS]: https://en.wikipedia.org/wiki/Robustness_principle
[VALIDATOR]: https://validator.w3.org/#validate_by_input


Features
--------

* Runs in a web browser.
* Supports Markdown (CommonMark).
* Supports a [subset of LaTeX][macros] using MathJax.
* Supports creating self-rendering distributable boards with a single
  line of HTML.
* Supports editing macros such as `,i`, `,d`, `,align*`, etc. to
  automatically insert LaTeX delimiters for inline mathematics,
  display mathematics, align environment, etc. (Type `,help` in the
  board input to see a complete list of supported commands.)
* Not a [WYSIWYG][WYSIWYG] tool.
* Not a collaborative editing tool.

[macros]: http://docs.mathjax.org/en/latest/input/tex/macros/index.html
[WYSIWYG]: https://en.wikipedia.org/wiki/WYSIWYG


Why?
----

Muboard was created originally for online analytic number theory book
club meetings that I host during my evenings. During the meetings, I
needed a place to type out mathematics formulas and render them
quickly. I chose to write a tiny non-WSYIWYG tool because I prefer
such tools. It also helps in keeping the LaTeX snippets in an HTML
file that can render itself using JavaScript.

The name *Muboard* is a reference to the Möbius function *μ(n)* which
was the very first topic we discussed using this tool.

By the way, if you are interested in the book club meetings, read more
about it [here](https://spxy.github.io/bc/).


Channels
--------

The following channels are available for asking questions, seeking
help, and receiving updates regarding this project:

- Twitter: [@susam](https://twitter.com/intent/follow?screen_name=susam)
- Matrix: [#susam:matrix.org](https://matrix.to/#/#susam:matrix.org)
- Freenode: [#susam](https://webchat.freenode.net/#susam)
- Reddit: [r/susam](https://reddit.com/r/susam)
- GitHub: [muboard/issues](http://github.com/susam/muboard/issues)

You are welcome to follow or subscribe to one or more of these channels
to receive updates and ask questions about this project. The Freenode and
Matrix channels are bridged together, so if you join one of them, you
will automatically receive the updates from the other one too.


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
[create issues][ISSUES].

[ISSUES]: https://github.com/susam/muboard/issues
