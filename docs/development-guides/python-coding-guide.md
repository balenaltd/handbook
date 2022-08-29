# Python Coding Guidelines

## Introduction

[Python](https://www.python.org) is arguably the most popular choice when it comes to data analysis and science. It is highly accessible and productive, has an active community and very well-maintained libraries for data-related tasks.
The language itself continuously adopts [Python Enhancement Proposals](https://www.python.org/dev/peps/) (PEP for short) which standardize the best practices.


## Contents of the project

### Files
The code is organized into files and folders which are roughly equivalent to modules and packages in Python terminology.
A good overview of things to expect can be found in [The Hitchhiker’s Guide to Python](https://docs.python-guide.org/writing/structure/#structure-of-the-repository).
However, things can get much more specific, as illustrated in the [Cookiecutter Data Science](https://drivendata.github.io/cookiecutter-data-science/#directory-structure) structure.

### Metadata
Historically, a file called `requirements.txt` has been very popular. However, since it is just a list of project dependencies, it lacks even basic metadata such as the Python version.
[PEP-518](https://www.python.org/dev/peps/pep-0518/) introduced a standard metadata file called `pyproject.toml`. It solves previous issues by specifying all metadata - versions, authors, tags, etc. - in a single file.
There is a tool called [Python Poetry](https://python-poetry.org/) which adheres to pyproject.toml and handles dependency installation as well as building and packaging of Python projects.

Minimal reasonable example of `pyproject.toml`:
```toml
[tool.poetry]
name = "my-python-project"
version = "0.1.0"
description = "My Python project"
authors = ["Team Balena <team@balena.io>"]

[tool.poetry.dependencies]
python = "^3.8"

[tool.poetry.dev-dependencies]
pytest = "^5.2"

[build-system]
requires = ["poetry>=0.12"]
build-backend = "poetry.masonry.api"
```

Tip: the configuration file can be auto-generated by running `poetry init`.

### Structure
All things considered, this is a minimal reasonable structure for any Python project:
```
.
├── README.md
├── my_python_project
│   ├── __init__.py
│   └── main.py
├── pyproject.toml
└── tests
    ├── __init__.py
    └── test_my_python_project.py
```

Whereas, for example, a data exploration and science project may take the following form:
```
.
├── Makefile
├── README.md
├── data
│   ├── external
│   │   └── extra_features.csv
│   ├── interim
│   │   └── events_per_day.csv
│   ├── processed
│   │   └── events.csv
│   └── raw
│       └── events_2020.csv
├── docs
│   └── index.md
├── models
│   └── exported_model.pkl
├── notebooks
│   └── 00-initial_work.ipy
├── pyproject.toml
├── references
│   └── data_usage_manual.md
├── reports
│   ├── daily_overview.html
│   └── figures
│       └── summary_chart.png
├── src
│   ├── __init__.py
│   ├── data
│   │   ├── __init__.py
│   │   └── make_dataset.py
│   ├── features
│   │   ├── __init__.py
│   │   └── build_features.py
│   ├── models
│   │   ├── __init__.py
│   │   ├── predict_model.py
│   │   └── train_model.py
│   └── visualization
│       ├── __init__.py
│       └── visualize.py
└── tests
    ├── __init__.py
    └── test_data_make_dataset.py
```

Tip: the boilerplate project can be auto-generated by running `poetry new my-python-project`.


## Getting started

### System requirements
- [Python](https://www.python.org)
- [Python poetry](https://python-poetry.org)

### Create the environment
To resolve the `pyproject.toml` dependency constraints and install them into a virtual environment, navigate into the project and run:
```bash
poetry install
```

### Use the environment
At this point it’s possible to point an IDE of choice to the virtual environment and start developing.

Some advanced usage:
- `poetry shell` - activate the created environment in the terminal;
- `exit` - exit the activated environment;
- `poetry run <command>` - run a single command without switching environments.

More useful commands can be found in the [Python Poetry documentation](https://python-poetry.org/docs/).


## Best practices

### Code style
Python style guide is respected as defined in the [PEP-8](https://www.python.org/dev/peps/pep-0008/).
The standard was introduced in 2001 - and screen resolutions have gotten much greater - thus an exception is made to increase the maximum line length to 120 characters.

[`flake8`](https://pypi.org/project/flake8/) tool can be used to make sure that the code conforms to the standard (and some extras) by running:
```bash
flake8 --max-line-length=120
```
Many IDEs support PEP-8 compatibility checks either natively or using plug-ins, make sure to check your settings.

[`black`](https://pypi.org/project/black/) tool can be used to format the code automatically by running:
```bash
black --line-length 120
```
It applies a strict subset of PEP-8 which is intended to be compatible with Python guidelines in balena.

Some cases are highlighted below.

#### Layout
- 4 space indentation instead of tabs.
- 120 characters maximum line length.
- 2 empty lines between classes and functions.
- 1 empty line within class between class methods.
- No whitespace inside parentheses, brackets or braces.
```python
# good
pizza(ham[1], {eggs: 2}, [])

# bad
pizza( ham[ 1 ], { eggs: 2 }, [ ])
```
- Whitespace around binary operators.
```python
# good
x == 1

# bad
x==1
```
- No whitespace around `=` when passing keyword arguments or defining a default parameter value.
```python
# good
foo(bar='baz')

# bad
foo(bar = 'baz')
```
- Empty lines for logical separation of functionality inside functions and methods.
- No semicolons at the end of lines.
- Multiple lines for method chaining.
```python
# good
(df.write \
	.format('jdbc')
	.option('url', 'jdbc:postgresql:dbserver')
	.option('dbtable', 'schema.tablename')
	.option('user', 'username')
	.option('password', 'password')
	.save()
)
```
- Sorted (and grouped) imports at the beginning of a module. [`isort`](https://pypi.org/project/isort/) tool or IDE functionality can be used to automate it.
```python
# good
import os
from typing import List

import pandas as pd

# good
import os
import pandas as pd
from typing import List

# bad
from typing import List
import os
import pandas as pd
```

#### Naming
- `snake_case` for modules, variables, attributes, functions, and method names.
- `CamelCase` for class names.
```python
# good
class HelloWorld:
    hello_recipient = 'world'
```

#### Formatting
- Trailing commas in sequences only when the closing container token `]`, `)`, or `}` does not appear on the same line as the final element.
```python
# good
x = [1, 2, 3]
# good
y = {
    'a': 1,
    'b': 2,
}

# bad
y = [1, 2, 3,]
# bad
y = {
    'a': 1,
    'b': 2
}
```
- [Literal string interpolation](https://www.python.org/dev/peps/pep-0498/) for string formatting.
```python
# good
print(f'var: {var}')

# bad
print('var: %s' % var)
# bad
print('var: {}'.format(var))
```

### Documentation
Python [docstring conventions](https://www.python.org/dev/peps/pep-0257) are respected.

Docstrings are written for each non-trivial method to summarize its behavior and describe the arguments when reasonably needed.
As a rule of thumb, a docstring should give enough information to write a call to the function without reading the function’s code.

[`pydocstyle`](https://pypi.org/project/pydocstyle) tool can be used to make sure that the comments conform to the standard by running:
```bash
pydocstyle
```

In addition, [type hints](https://www.python.org/dev/peps/pep-0484/) are recommended to provide argument and return types in function signatures.
```python
# good
def greeting(name: str) -> str:
    """Generates a greeting for a given name."""
    return f'Hello {name}!'
```
[`mypy`](https://pypi.org/project/mypy/) tool or IDE functionality can be used to check the static typing for correctness.

### Testing
Unit tests should cover as much code as reasonably possible.

Each unit test should check only one specific thing and the name of the test should clearly express what is being tested.

All unit tests are written using [pytest](https://pypi.org/project/pytest/) framework which detects and runs the tests:
```bash
pytest tests/
```

An example test:
```python
# good
def test_version_number():
    assert __version__ == '0.1.0'

# good
class MyProjectTest(unittest.TestCase):
    def test_version_number(self):
        self.assertEqual(__version__, '0.1.0')
```


## balenaCI support

balenaCI does not automatically acknowledge Python projects in repositories.
CI should eventually work by simply having `pyproject.toml` in the root of a repository - no additional effort required. For the time being, extra "Dockerization" is needed.

The majority of checks - code style, documentation, unit testing - are implemented in the `resinci/balena-python` Docker image.
By building the image it's possible to effectively have full CI coverage in any Python repository.
To configure your project, see the example project [here](https://github.com/product-os/ci-images/tree/master/examples/python).


Good luck using Python!