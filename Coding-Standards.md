# Services

We use CoffeeScript where possible (99.9% of cases), which are transpiled to JavaScript for runtime. Here are some of the major points when writing CoffeeScript:

* Tabs, not spaces
* Do not insert whitespace to vertically align code. If it doesn't vertically align naturally, accept the compromise :)
* Single-line function calls should always use parens, e.g. `foo(1, 2.3, 'hi')`
* Multi-line function calls should elide parens unless they are necessary, e.g.:

        scrape 'http://google.co.uk', (err, data) ->
        return console.error('Error', err) if err?
        console.log(data)

        # Have to use parens.

        chaining().is().fun ->
        console.log('hi!')
        .isnt().it()

* Array declarations should have spaces after the `[` and before the `]`, and spaces after any commas e.g. `[ foo, bar, baz ]`, rather than `[foo,bar,baz]`. This doesn't apply to indexing into an array, we prefer `foo[42]` to `foo[ 42 ]`. These rules also apply to curly braces
* A special exception to the point above are array ranges. `[1..3]` is preferred to `[ 1..3 ]`
* All operators, including assignment (`=`) should have whitespace either side
* Use single quotes in CoffeeScript code unless you need double quotes to use inline interpolation, e.g. `'foo bar baz'` not `"foo bar baz"` but of course `"Hi, #{name}"` is valid
* HTML attributes should always use double quotes.

There is now a CoffeeScript linter written by Kostas (@lekkas) which should be installed as a developer dependency in all CoffeeScript projects. It can be found [here](https://github.com/resin-io/resin-lint). It is **strongly** advised it is installed and used as part of the code commit workflow, as submitted code will be required to pass it.

# Devices

**-> We don't appear to have a C/Assembler standards, who wants to write one? :D <-**
