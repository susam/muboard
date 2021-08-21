/*
The MIT License (MIT)

Copyright (c) 2021 Susam Pal

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function () {
  'use strict'

  /**
   * Name of this tool.
   */
  const name = 'Muboard'

  /**
   * Version of this tool.
   */
  const version = '0.5.1'

  /**
   * Input textarea element is assigned to this variable.
   */
  let input

  /**
   * HTML element to display the board is assigned to this variable.
   */
  let board

  /**
   * HTML element to display an optional footer.
   */
  let footer

  /**
   * Timeout ID of timeout that triggers delayed rendering of input to
   * board.
   */
  let timer = null

  /**
   * Configuration objects object. Each configuration option is set as
   * a property of this object.
   */
  const options = {}

  /**
   * Set default configuration options.
   */
  function setDefaultOptions () {
    options.texmeURL = 'https://cdn.jsdelivr.net/npm/texme@1.0.0'
    options.renderDelay = 200
    options.footer = false
  }

  /**
   * Read configuration options specified via window options and
   * configure the board.
   */
  function setWindowOptions () {
    let key
    for (key in options) {
      if (typeof window !== 'undefined' &&
          typeof window.muboard !== 'undefined' &&
          typeof window.muboard[key] !== 'undefined') {
        options[key] = window.muboard[key]
      }
    }
  }

  const greenStyle = `
html {height: 100%}
body {
  background: #eec; font-family: helvetica, arial, sans-serif;
  line-height: 1.5; margin: 0; padding: 0.75em; box-sizing:
  border-box; height: 100%;
}
main {
  background: #255; color: #eed;
  border: 0.75em ridge #933; padding: 1em; box-sizing: border-box;
  width: 100%; height: 66%; resize: both; overflow: auto;
}
textarea {
  background: #111; color: #9c9; display: block; margin-top: 0.75rem;
  border-width: 0.125rem; padding: 0.375rem; box-sizing: border-box;
  width: 100%; height: calc(34% - 0.75em);
}
pre, code, samp, kbd {color: #dec; font-family: monospace, monospace}
h1 {font-size: 1.5em}
h2 {font-size: 1.25em}
h1, h2, h3, h4, h5, h6 {margin: 1em 0 0.5em 0; line-height: 1.2}
main > :first-child, main > :first-child > :first-child {margin-top: 0}
section > :first-child, section > :first-child > :first-child {margin-top: 0}
a:link, a:visited {color: #ccf}
a:hover, a:active {color: #e76}
hr {border: 0; border-bottom: thin solid #fbc}
.center {text-align: center}
article {max-width: 40em; margin: 0 auto}
main > section {display: flex}
main > section > section {
  display: block; flex-basis: 100%; padding: 0 0.5em;
}
main > section > section:first-child {padding-left: 0}
main > section > section:last-child {padding-right: 0}
table {border-collapse: collapse}
th, td {border: thin solid #bed; padding: 0.3em 0.4em; text-align: left}
footer {margin: 1em 0; text-align: center; display: none}
footer a {margin-right: 1em}
footer a:last-child {margin-right: 0}
footer a:link, footer a:visited {color: #03c}
footer a:hover, a:active {color: #06f}
`

  /**
   * A map of available CSS styles.
   */
  const styles = { green: greenStyle }

  /**
   * Render input to output board immediately.
   */
  function render () {
    board.innerHTML = window.texme.render(input.value)
    window.MathJax.texReset(0)
    window.MathJax.typeset()
  }

  /**
   * Render input to output board after a delay of
   * `options.renderDelay`.
   */
  function delayedRender () {
    clearTimer()
    timer = window.setTimeout(render, options.renderDelay)
  }

  /**
   * Clear timeout for delayed rendering thereby cancelling the
   * currently scheduled rendering.
   */
  function clearTimer () {
    if (timer !== null) {
      window.clearTimeout(timer)
      timer = null
    }
  }

  /**
   * Replace command in the text input field with concatenation of two
   * specified texts. Leave the cursor in between the two texts.
   *
   * @param {string} cmd - Command string to be replaced.
   * @param {string} text1 - First text.
   * @param {string} text2 - Second text.
   */
  function replaceCommand (cmd, text1, text2) {
    const cursorPos = input.selectionStart
    const textPos = cursorPos - cmd.length
    const movePos = textPos + text1.length
    const s = input.value
    clearTimer()
    input.value = s.substr(0, textPos) + text1 + text2 +
                  s.substr(cursorPos)
    input.setSelectionRange(movePos, movePos)
    clearTimer()
  }

  /**
   * Process input. If a command is found in the input, execute the
   * command. Otherwise, trigger delayed rendering of the input.
   */
  function handleKey (event) {
    // Look behind the cursor.
    const cursor = input.selectionStart
    let behind
    if (cursor <= 10) {
      behind = input.value.substr(0, cursor)
    } else {
      behind = input.value.substr(cursor - 10, 10)
    }

    // Check if comma exists in the text behind the cursor.
    const lastComma = behind.lastIndexOf(',')
    if (lastComma === -1) {
      delayedRender()
      return
    }

    // If comma exists in the text behind the cursor, it could be a
    // command.
    const possibleCommand = behind.substr(lastComma)
    switch (possibleCommand) {
      case ',clear':
        clearTimer()
        board.innerHTML = input.value = ''
        render()
        break
      case ',i':
        replaceCommand(',i', '$ ', ' $')
        render()
        break
      case ',d':
        replaceCommand(',d', '$$ ', ' $$')
        render()
        break
      case ',align;':
        replaceCommand(',align;', '\\begin{align}\n', '\n\\end{align}')
        render()
        break
      case ',align*':
        replaceCommand(',align*', '\\begin{align*}\n', '\n\\end{align*}')
        render()
        break
      case ',article':
        replaceCommand(',article', '<article>\n\n', '\n\n</article>')
        render()
        break
      case ',split':
        replaceCommand(',split', '<section>\n<section>\n\n',
          '\n\n</section>\n<section>\n\n' +
          '\n\n</section>\n</section>')
        render()
        break
      case ',section':
        replaceCommand(',section', '<section>\n\n', '\n\n</section>')
        render()
        break
      case ',center':
        replaceCommand(',center', '<div class="center">\n\n', '\n\n</div>')
        render()
        break
      case ',save':
        replaceCommand(',save', '', '')
        render()
        setTimeout(saveLocal, 10)
        break
      case ',load':
        replaceCommand(',load', '', '')
        render()
        setTimeout(loadLocal, 10)
        break
      case ',remove':
        replaceCommand(',remove', '', '')
        render()
        setTimeout(removeLocal, 10)
        break
      case ',list':
        replaceCommand(',list', '', '')
        render()
        listLocal()
        break
      case ',footer':
        replaceCommand(',footer', '', '')
        render()
        toggleFooter()
        break
      case ',help':
        replaceCommand(',help', '', '')
        showHelp()
        break
      case ',example':
        replaceCommand(',example', '', '')
        showExample()
        break
      case ',version':
        replaceCommand(',version', '', '')
        showVersion()
        break
      default:
        delayedRender()
    }
  }

  /**
   * Set page to display output board and text input area.
   */
  function setupPage () {
    const textareaElements = window.document.getElementsByTagName('textarea')

    board = window.document.createElement('main')
    input = window.document.createElement('textarea')
    input.placeholder = `Write content in LaTeX + Markdown format here.

Type ,help for help.

Type ,example for demo.`

    footer = window.document.createElement('footer')
    footer.innerHTML = `
<a href="https://github.com/susam/muboard">GitHub</a>
<a href="https://twitter.com/intent/follow?screen_name=susam">Twitter</a>
<a href="https://github.com/susam/muboard/blob/master/LICENSE.md">License</a>
`

    // Read initial input.
    if (textareaElements.length > 0) {
      input.value = textareaElements[0].value.trim()
      textareaElements[0].remove()
    } else {
      input.value = window.document.body.innerHTML.trim()
      window.document.body.innerHTML = ''
    }

    // Set title if it is not specified explicitly.
    if (typeof window.document.title === 'undefined' ||
        window.document.title === '') {
      window.document.title = name
    }

    // Display input and output elements.
    window.document.body.appendChild(board)
    window.document.body.appendChild(input)
    window.document.body.appendChild(footer)
    input.focus()

    // Set stylesheet.
    const styleElement = window.document.createElement('style')
    const css = styles.green
    styleElement.appendChild(window.document.createTextNode(css))
    window.document.head.appendChild(styleElement)

    // Set meta element.
    const metaElement = window.document.createElement('meta')
    metaElement.name = 'viewport'
    metaElement.content = 'width=device-width, initial-scale=1.0'
    window.document.head.appendChild(metaElement)

    // Display footer if enabled in configuration.
    if (options.footer) {
      footer.style.display = 'block'
    }

    render()
    input.addEventListener('input', handleKey)
  }

  /**
   * Save input to local storage.
   */
  function saveLocal () {
    const msg = 'Provide a key name to save the current input to the ' +
                'browser\'s local storage.\n\n' +
                'You can use the same key to load the input later.'
    const key = window.prompt(msg)
    if (key === null) {
      return
    } else if (key === '') {
      board.innerHTML = `<article>
<h1>Error</h1>
<p>Key cannot be empty string.</p>
</article>`
      return
    } else if (/\s/.test(key)) {
      board.innerHTML = `<article>
<h1>Error</h1>
<p>Key cannot have whitespace.</p>
</article>`
      return
    }
    if (window.localStorage.getItem(key) !== null) {
      const msg = 'A key with the given name already exists.\n\n' +
                  'Do you want to overwrite the same key?'
      const answer = window.confirm(msg)
      if (answer === false) {
        return
      }
    }
    window.localStorage.setItem(key, input.value)
  }

  /**
   * Toggle the display of footer.
   */
  function toggleFooter () {
    const display = footer.style.display
    footer.style.display = display === 'none' ? 'block' : 'none'
  }

  /**
   * Load input from local storage.
   */
  function loadLocal () {
    const msg = 'Provide a key name to load input from the browser\'s ' +
                'local storage.'
    const key = window.prompt(msg)
    const value = window.localStorage.getItem(key)
    if (value !== null) {
      input.value = value
      render()
    } else {
      board.innerHTML = `<article>
<h1>Error</h1>
<p>Key does not exist.</p>
</article>`
    }
  }

  /**
   * Remove an input saved in local storage.
   */
  function removeLocal () {
    const msg = 'Provide name of key to remove from browser\'s ' +
                'local storage.'
    const key = window.prompt(msg)
    const value = window.localStorage.getItem(key)
    if (value !== null) {
      window.localStorage.removeItem(key)
    } else {
      board.innerHTML = `<article>
<h1>Error</h1>
<p>Key does not exist.</p>
</article>`
    }
  }

  /**
   * List inputs saved in local storage.
   */
  function listLocal () {
    if (window.localStorage.length === 0) {
      board.innerHTML = '<article><h1>No Keys Found</h1></article>'
      return
    }

    let out = `<article>
<h1>Saved Keys</h1>
<p>
The following Muboard keys are saved in the local storage of your
browser:
</p>
<ol>`

    for (let i = 0; i < window.localStorage.length; i++) {
      out += '<li>' + window.localStorage.key(i) + '</li>'
    }
    out += `</ol>
<p>
Type <code>,load</code> to load any key.
</p>
</article>`
    board.innerHTML = out
  }

  /**
   * Show help message on board.
   */
  function showHelp () {
    board.innerHTML = `
<article>
<h1>${name}</h1>
<p>
Muboard is a web-based mathematics display board. Muboard lets you
scribble mathematics using LaTeX and Markdown while presenting your
desktop screen.
</p>
<h2>Commands</h2>
<p>
The following commands that may be typed anywhere in the input text
field:
</p>
<dl>
  <dt><code>,clear</code></dt>
  <dd>Clear text input field and the board.</dd>

  <dt><code>,i</code></dt>
  <dd>Insert inline mathematics.</dd>

  <dt><code>,d</code></dt>
  <dd>Insert display mathematics.</dd>

  <dt><code>,align;</code></dt>
  <dd>Insert align envrionment.</dd>

  <dt><code>,align*</code></dt>
  <dd>Insert align* environment.</dd>

  <dt><code>,article</code></dt>
  <dd>
    Insert article element. The article element is displayed as a
    single column of text at the center of the board with a fixed
    maximum width that makes the text easier to read. Recommended for
    distributable boards.
  </dd>

  <dt><code>,split</code></dt>
  <dd>
    Split the board into two side-by-side columnar sections. More
    columnar sections may be added with the next command.
  </dd>

  <dt><code>,section</code></dt>
  <dd>Insert section element.</dd>

  <dt><code>,center</code></dt>
  <dd>Insert center-aligned text.</dd>

  <dt><code>,save</code></dt>
  <dd>Save current input to the browser's local storage.</dd>

  <dt><code>,load</code></dt>
  <dd>Load an input from the browser's local storage.</dd>

  <dt><code>,remove</code></dt>
  <dd>Remove an input from the browser's local storage.</dd>

  <dt><code>,list</code></dt>
  <dd>List all inputs saved in the browser's local storage.</dd>

  <dt><code>,footer</code></dt>
  <dd>Toggle the display of footer at the bottom of the page.</dd>

  <dt><code>,help</code></dt>
  <dd>Show this help message.</dd>

  <dt><code>,example</code></dt>
  <dd>Show demo example content on board.</dd>

  <dt><code>,version</code></dt>
  <dd>Show version and license information.</dd>
</dl>
<p>
You can type the above commands anywhere in the input text field to
invoke them. For example, type <code>,i</code> anywhere in input text
field and it will be immediately replaced with LaTeX delimiters for
inline math.
</p>
<p>
${name} can also be used to create distributable boards with Markdown
+ LaTeX content saved in it. See <a
href="https://github.com/susam/muboard">github.com/susam/muboard</a>
for more details.
</p>
<hr style="margin: 1em 0">
<div style="font-size: small; text-align: center">
<p>
${name} is created and maintained by <a
href="https://twitter.com/intent/follow?screen_name=susam">Susam</a>.
</p>
<p>
The source code is available on
<a href="https://github.com/susam/muboard">GitHub</a>.
</p>
</div>
</article>
`
  }

  /**
   * Show demo content on board.
   */
  function showExample () {
    input.value = `<article>

# The Möbius function

For any positive integer $ n $, the Möbius function $ \\mu(n) $ is
defined as follows:

$$ \\mu(1) = 1; $$

If $ n > 1, $ write $ n = p_1^{a_1} \\dots p_k^{a_k} $ (prime
factorization). Then

\\begin{align*}
  \\mu(n) & = (-1)^k \\text{ if } a_1 = a_2 = \\dots = a_k = 1, \\\\
  \\mu(n) & = 0 \\text{ otherwise}.
\\end{align*}

If $ n \\ge 1, $ we have

$$
  \\sum_{d \\mid n} \\mu(d) =
  \\begin{cases}
    1 & \\text{ if } n = 1, \\\\
    0 & \\text{ if } n > 1.
  \\end{cases}
$$

</article>`
    render()
  }

  function showVersion () {
    board.innerHTML = `
<article>
<h1>${name} ${version}</h1>
<p>
Copyright &copy; 2021 Susam Pal
</p>
<p>
This is free and open source software. You can use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of it,
under the terms of the <a
href="https://github.com/susam/muboard/blob/master/LICENSE.md">MIT
License</a>.
</p>
<p>
This software is provided <em>"as is"</em>, <em>without
warranty of any kind</em>, express or implied. See the MIT License
for details.
</p>
</article>
`
  }

  /**
   * Load JS in browser environment.
   *
   * @param {string} url - URL of JavaScript file.
   * @param {function} callback - Callback to invoke after script loads.
   */
  function loadjs (url, callback) {
    const script = window.document.createElement('script')
    script.src = url
    script.onload = callback
    window.document.head.appendChild(script)
  }

  /**
   * Start board.
   */
  function main () {
    setDefaultOptions()
    setWindowOptions()
    window.texme = { renderOnLoad: false }
    loadjs(options.texmeURL)
    window.addEventListener('load', setupPage)
  }

  main()
})()
