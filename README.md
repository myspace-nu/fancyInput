# fancyInput

A html text input replacement with text formatting

[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/myspace-nu/fancyInput/blob/master/LICENSE)
[![Code size](https://img.shields.io/github/languages/code-size/myspace-nu/fancyInput)](https://github.com/myspace-nu/fancyInput)
[![Issues](https://img.shields.io/github/issues-raw/myspace-nu/fancyInput)](https://github.com/myspace-nu/fancyInput/issues)

## Usage

	<input type="text" class="form-control" />

	<script src="../js/fancyinput.js"></script>
	<script>
		let myFancyInput = new fancyInput("input");
	</script>

## Options

**allowLineBreaks** - Allow line breaks

	allowLineBreaks: true

*Default: false*

**className** - Class name of the fancyinput element

	className: "some-classname"

*Default: "fancyinput"*

**classNameFocus** - Class name of the fancyinput element focus state

	classNameFocus: "some-classname"

*Default: "focus"*

**copyComputedStyle** - Copy computed style from the source input element

	copyComputedStyle: false

*Default: true*

**copyStyle** - Copy style from the source input element

	copyStyle: false

*Default: true*

**onChange(value, evt, elm)** - Event that fires when the input value changes. Used for sanatizing html and should return the sanatized html.

### Author: [Johan Johansson](https://github.com/myspace-nu)
