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
   * Input textarea element is assigned to this variable.
   */
  let input

  /**
   * HTML element to display the board is assigned to this variable.
   */
  let board

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
    options.texmeURL = 'https://cdn.jsdelivr.net/npm/texme@0.9.0'
    options.renderDelay = 200
  }

  /**
   * Read configuration options specified in `window.muboard` and
   * configure Muboard.
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

  /**
   * A map of available CSS styles.
   */
  const styles = {
    green: `
      html {height: 100%}
      body {
        background: #eec; font-family: helvetica, arial, sans-serif;
        line-height: 1.5; margin: 0; padding: 0.5em;
        height: 100%; display: flex; flex-direction: column;
      }
      main {
        border: thick solid #933; background: #255; color: #eed;
        padding: 1em; height: 60%; resize: both; overflow: auto;
      }
      main :first-child {margin-top: 0}
      main :last-child {margin-bottom: 0}
      main a:link, main a:visited {color: #ccf}
      main a:hover, main a:active {color: #e76}
      hr {border: 0; border-bottom: thin solid #fbc}
      .center {text-align: center}
      textarea {
        background: #111; color: #9c9; margin: auto; margin-top: 1em;
        height: 30%; width: 95%;
      }
`
  }

  /**
   * Render input to output board immediately.
   */
  function render () {
    console.log('render() ...')
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
      case ',center':
        replaceCommand(',center', '<div class="center">\n', '\n</div>')
        render()
        break
      case ',clear':
        clearTimer()
        board.innerHTML = input.value = ''
        render()
        break
      case ',help':
        replaceCommand(',help', '', '')
        showHelp()
        break
      case ',version':
        replaceCommand(',version', '', '')
        showVersion()
        break
      case ',license':
        replaceCommand(',license', '', '')
        showLicense()
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

Type ,help for help.`

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
      window.document.title = 'Muboard'
    }

    // Display input and output elements.
    window.document.body.appendChild(board)
    window.document.body.appendChild(input)

    // Set stylesheet.
    const styleElement = window.document.createElement('style')
    const css = styles.green
    styleElement.appendChild(window.document.createTextNode(css))
    window.document.head.appendChild(styleElement)

    // Set meta element.
    const metaElement = window.document.createElement('meta')
    metaElement.name = 'viewport'
    metaElement.content = 'width=device-width; initial-scale=1.0'
    window.document.head.appendChild(metaElement)

    render()
    input.addEventListener('input', handleKey)
  }

  function showHelp () {
    board.innerHTML = `
<p>
Muboard supports these commands that may be typed anywhere in the
input text field:
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

  <dt><code>,center</code></dt>
  <dd>Insert center-aligned text.</dd>

  <dt><code>,help</code></dt>
  <dd>Show this help message.</dd>

  <dt><code>,version</code></dt>
  <dd>Show version information.</dd>

  <dt><code>,license</code></dt>
  <dd>Show license information.</dd>
</dl>
<p>
You can type the above commands anywhere in the input text field to
invoke them. For example, type <code>,i</code> anywhere in input text
field and it will be immediately replaced with LaTeX delimiters for
inline math.
</p>
<p>
Muboard can also be used to create distributable boards with
Markdown + LaTeX content saved in it. See <a
href="https://github.com/susam/muboard">github.com/susam/muboard</a>
for more details.
</p>
`
  }

  /**
   * Show version information.
   */
  function showVersion () {
    board.innerHTML = 'Muboard 0.1.0'
  }

  /**
   * Show license information.
   */
  function showLicense () {
    board.innerHTML = `
<p>
&copy; 2021 Susam Pal
</p>          
<p>
This is free and open source software. You can use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of it, under the
terms of the MIT License. You can obtain a copy of the MIT License at
<a href="https://susam.github.io/licenses/mit.html">susam.github.io/licenses/mit.html</a>.
</p>
<p>
This software is provided <strong>"as is"</strong>, <strong>without
warranty of any kind</strong>, express or implied. See the MIT License
for details.
</p>
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
