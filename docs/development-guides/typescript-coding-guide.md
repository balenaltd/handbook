# Typescript coding Guide

There is currently a general move across balena to move all components that have traditionally been written in either JavaScript or a language that transpiles to it towards TypeScript instead.

There are many benefits to doing this, including the implicit error checking and type checking of code and the leveraging of many semantics which would both simplify and improve the quality of our code.

However, whilst a move to TypeScript in itself solves some issues, others arrive from the back of this. For example, to ensure any engineer can modify, maintain and fix code written by others, it is imperative to follow a standard of coding that the entire balena team can adhere to.

This document aims at providing both a 'Best Practices' guide and a basis for automatic linting which can be used in all TypeScript projects.

Whilst this style guide is considered applicable to all projects including TypeScript code, there are situations where projects are not being built 'from scratch' using the language, but wish to transition in a controlled manner. See the 'Transitioning To TypeScript' section for information on how to approach this.

## Best Practices

Whilst developing TypeScript, there are several situations that require a paradigm that cannot be tested (easily) by linting. As such, the following sections deal with best practices for implementing TypeScript code.

### Indentation

Tabs should be used to indent lines in a TypeScript (`.ts`) source file. Whilst four spaces are usually present in TypeScript projects, it is clear that there is a large desire for balena engineers to be able to use personal preference styles for development work. Tabs allow variable indenting that allows engineers flexibility to choose their own spacing, but to standardise on commit.

### Semicolons

Semicolons should be used as natural delimiters, and not only in cases where these are mandatory. For example:
```typescript
const x = 1;
console.log(x);
```

and not:

```typescript
const x = 1
console.log(x)
```

This follows the majority convention for TypeScript projects on Github (citation needed).

### Trailing Commas

Trailing commas should be used for arrays, objects and function arguments where the values exist on separate lines. The following is correct:

```typescript
[
    'one',
    'two',
    'three',
]
```

The following is not:

```typescript
[
    'one',
    'two',
    'three'
]
```

This style allows changes to be made to these structures when adding, re-arranging or removing values from them. This improves clarity.

The exception to this rule is for objects, arrays and functions defined on a single line, eg:

```typescript
const myArray = ['one', 'two', 'three' ]
```

### `import` and Modules

When importing modules, the standard approach for importing should be used, for any module that includes annotated types. This therefore applies to any TypeScript source (`*.ts`) or any legacy module that has annotations (eg. such as those from the [DefinitelyTyped](https://github.com/DefinitelyTyped) project, or from any project that includes its own declarations). For example:

```typescript
import { MyInterface, MySecondInterface } from 'myInterface';
import * as MyClass from `myClass`;
```

Note that no preference is assigned to the importing of typed classes. You may `import` specific interfaces, or you may `import` an entire namespace which may be used to refer to interfaces.

External modules which use alias exports can be imported thus:

```typescript
import theClass = require('myClass');
```

However no balena-authored modules should be written utilising it.

Modules should avoid the use of the side-effect pattern unless there is good reason to do so, eg.:

```typescript
import "./myInterface";
```

There are instances where modules or files are required but have no type annotations, eg. legacy JavaScript code. **These modules should not be imported using the `const ...:any` declaration**, ie.:

```typescript
const myLegacyModule: any = require('myLegacyModule'); // Don't do this!
```

Instead for such modules, then the project using them should (in order of preference):
1. For a balena-owned module without type definitions, an engineer should create a set of declarations for that module and embed them within the module.
2. Create a full set of type definitions for the module/file inside the current project
3. Create an empty placeholder type definition for the module/file inside the current project (e.g. `declare module 'my-module';`)

Option 1 is obviously preferable, as it will allow many other components to utilise it. There are, however, good reasons for supplying PRs to the DefinitelyTyped project should these be used frequently, see [here](https://github.com/DefinitelyTyped/DefinitelyTyped#how-can-i-contribute).

However, for the sake of code which is not yet being commonly used elsewhere, it is acceptable to use option 2, and in the short-term for non-critical modules/files option 3 can be useful, whilst code is being migrated.

To do this for a module, a `typings` directory should be created in the root project directory and a declaration file created for each module to be imported, with as much interface information as is required, eg:

typings/legacyJSModule.d.ts
```typescript
declare module 'legacyJSModule' {
    myFunction(myString: string, cb: (error: Error, myNumber: number) => void): void;
}
```

lib/myApp.ts
```typescript
import { legacyJSModule } from 'legacyJSModule';

legacyJSModule.myFunction('cat', (err, myNumber) => {
    console.log(myNumber);
});
```

To do this for a specific file, a `<filename>.d.ts` should be placed next to the file containing the corresponding type definitions, so that when that file is [resolved by TypeScript](https://www.typescriptlang.org/docs/handbook/module-resolution.html) from anywhere, the corresponding type definitions are always automatically found.

For example, given an untyped file you'd like to import at `src/untyped-file.js`, you import it with typings by adding:

src/untyped-file.d.ts
```typescript
export function anExportedFunction(param: string);
```

src/my-code.ts
```typescript
import { anExportedFunction } from './untyped-file';

anExportedFunction('aParameter');
```

### Bluebird Promises

Bluebird is a Promise library that, currently, far exceeds both the performance of native V8 Promises but also includes a large amount of extra methods and patterns on top that simplifies the development of code. Bluebird has been shown to also makes for smaller code transfer sizes, such as the transfer of code to browsers. For this reason the Bluebird library should be used where possible should the use of Promises be required.

If possible, use Promisified modules that also have type definitions. Many common NPM modules now have versions specifically returning Promises, many with TS annotations using the DefinitelyTyped project.

Should the requirement for a non-annotated module be required, and single functions are to be promisified, then create declarations in the same way as `import`ing un-annotated modules, and then use `Promise.promisify` on them:

```typescript
import { legacyJSModule } from 'legacyJSModule';

const myFunction = Promise.promisify(legacyJSModule.myFunction);

myFunction('cat').then((myNumber: number) => {
    console.log(myNumber);
});
```

`Promise.promisifyAll()` is, however, more complicated as Bluebird creates new functions with an `Async` suffix for each callback function that it finds. This prevents TypeScript from inferring the types for the methods. In situations like this, annotated code is still preferred. For this reason, a project should create a new module that imports the module to be promisified and exposes a new module that promisifies the imported module, instead of using `promisifyAll`; a consumer can do the following:
```typescript
import { legacyJSModule } from 'legacyJSModule-promised';

legacyJSModule.myFunction('cat').then((myNumber: number) => {
    console.log(myNumber);
});
```

### Interfaces and Declaration Files

Interfaces should use use semi-colons (`;`) as property delimiters as opposed to commas (`,`). This is to keep consistency between class and interface definitions as well as denoting the difference between static data and declarations.

Should an interface/class be used only by a single consumer in a project (and is not exported as part of a module), then that interface/class may be defined within the source file that uses it, eg.:

```typescript
interface Animal {
    name: string;
    owner: string;
}

export class DogClub {
    private dogs: Animal[] = [];

    public setDog(dog: string, handler: string) {
        dogs.push({
            name: string,
            owner: handler
        });
    }

    public getOwner(dog: string) {
        for (let entry of dogs) {
            if (dog === entry.name) {
                return entry.owner;
            }
        }
    }
}
```

Interfaces/Classes that are used by more than one consumer should be defined separately to that consumer in a specific declaration file with suffix `.d.ts`, eg:

animal.d.ts
```typescript
export Food {
    brand: string;
}

export interface Animal {
    name: string;
    owner: string;
    eats: Food;
}
```

dog.ts
```typescript
import { Animal } from './animal';

export class DogClub {
    private dogs: Animal[] = [];

    public setDog(dog: string, handler: string) {
        dogs.push({
            name: string,
            owner: handler,
            eats: {
                brand: 'winnalot'
            }
        });
    }

    public getOwner(dog: string) {
        for (let entry of dogs) {
            if (dog === entry.name) {
                return entry.owner;
            }
        }
    }
}
```

cat.ts
```typescript
import { Animal } from './animal';

export class CatFanciers {
    private cats: Animal[] = [];

    public setCat(cat: string, handler: string) {
        cats.push({
            name: string,
            owner: handler,
            eats: {
                brand: 'gocat'
            }
        });
    }

    public getOwner(cat: string) {
        for (let entry of cats) {
            if (cat === entry.name) {
                return entry.owner;
            }
        }
    }
}
```

Should a declaration file itself require types defined elsewhere, then it should `import` the used types as required. In the examples above, `Food` might be defined in a separate declaration file.

Bear in mind that any declaration file created by hand in a source directory will also need to be copied over to the transpiled destination directory to be allow these declarations to be used. This should occur via the use of a relevant builder utilities.

## `tsconfig.json`

The `tsconfig.json` includes several TypeScript compiler options that enforce errors and warnings on code (which in the case of some other languages would usually be present in the linting rules). For this reason, the `tsconfig.json` for a balena component should include at least the following (note that this is a subset of the usual options):

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "outDir": "build",
        "noImplicitAny": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "strictNullChecks": true,        
        "preserveConstEnums": true,
        "pretty": true,
        "removeComments": true,
        "sourceMap": true
    },
    "include": [
        "mySourceDirectory/**/*.ts"
    ]
}
```

`module` should be modified appropriately depending on the circumstances, for example using a value of `umd` when targetting browser code.

`target` should be the appropriate target for the code. It should be noted that NodeJS 4.x, when not running with the experimental `--harmony` option, has little support for ES6. As such, if a project is not specifically geared towards running on modern NodeJS versions then `es5` targetting should be used.

If this is not a requirement, this may be altered as an engineer sees fit.

These will both enforce that code that is not production suitable flags error on compile.

Additionally, the following options should be used where appropriate:

```json
    "compilerOptions": {
        "declaration": true,
        "declarationDir": "build",
        "sourceMap": true
    }
```

Should you have declared any typings for included modules that either do not include their own annotations or have annotations in the DefinitelyTyped project, then the `include` array should also include a reference to the `typings` directory:

```json
    "include": [
        "typings/**/*.d.ts",
        "mySourceDirectory/**/*.ts"
    ]
```

## `package.json`

The `package.json` should directly reference the root annotations for the project once compiled (from the above section, this is by default the `build` directory). From the reference skeleton project:

```json
    "types": "lib/index.d.ts",
```

The convention is to use `index.ts` as the bootstrap app for many projects which exposes itself as a library, so this seems a sensible format to follow. For standalone apps/cli projects this is of course personal preference.

## Linting

Balena currently leverages a model in which linting of projects occurs using a central module which is included in projects. For example, for CoffeeScript projects, they include the [`balena-lint`](https://github.com/balena-io-modules/node-balena-lint) module as a developer dependency which is run on build/testing. This allows updates to occur to the `balena-lint` base linting rules without having to alter the rules in every project should they change.

Similarly, TypeScript projects within balena should extend the use of the `balena-lint`  module, incorporating the [`tslint`](https://palantir.github.io/tslint/) codebase, and utilising custom-rule definitions for balena development.

Every time code is built, the linter should be run to ensure that no errors are seen.

Much like other linters, there is the ability to disable linting checks for portions of code. This can be achieved with rule flags documented [here](https://palantir.github.io/tslint/usage/rule-flags/), however it is imperative that these are only used should the linter fail to recognise a valid case.

### Rules

The current linting rules for TypeScript are extended from the recommended [`tslint`](https://palantir.github.io/tslint/) defaults, and are defined thus:

```json
    {
        "extends": "tslint:recommended",
        "rules": {
            "indent": [ true, "tabs" ],
            "jsdoc-format": true,
            "whitespace": [
                false,
                "check-type"
            ],
            "object-literal-sort-keys": false,
            "only-arrow-functions": false,
            "quotemark": [true, "single", "avoid-escape"],
            "no-var-requires": true,
            "arrow-parens": false,
            "max-classes-per-file": false,
            "no-console": false,
            "no-string-literal": false,
            "interface-name": false,
            "variable-name": [
                true,
                "ban-keywords",
                "check-format",
                "allow-leading-underscore",
                "allow-pascal-case"
            ]
        }
    }
```

## Transitioning To TypeScript

When moving from an already existing JavaScript (and CoffeeScript) based project, it is not always possible (or useful) to modify the codebase in a single sweep.

### From CoffeeScript

1. Make an initial compilation of the code. Move the contents of the built JavaScript over to the source directory
2. Modify the `package.json` manifest to point all relative entries (eg. `main` to the new `.js` filenames)
3. Manually clean the compiled code to make it appear to be human generated and not machine generated. This includes joining variable declarations and initialisations in some places, cleaning the code with _refs introduced by safe-dot and safe-call operators, etc.

The code should now be in a position where it looks like a JavaScript project. You should now proceed as if it were a JS project.

### From JavaScript

1. Replace verbose JS code with shorter or better ES6 alternatives, including:
    * `const`/`let` for variable declarations instead of `var`
    * Make extensive use of fat arrow (`=>`) functions where possible
    * Include default function arguments
    * Utilise object and array destructuring (`const {a, b, c } = getParams()`) in bodies and arguments
    * Make use of ES6 classes instead of general constructors
    * Use template strings (`` `${myVariable} is cool!` ``)
    * Make use of `Map` based types
    * ...
2. Add TypeScript annotations to functions and their arguments. Creating declaration files to allow the module to be used by other TypeScript projects, if applicable
3. Start to migrate the rest of the codebase over to using TypeScript when possible, usually one source file at a time

## Documentation

Documenting TypeScript projects should be carried out using [TypeDoc](https://github.com/TypeStrong/typedoc). It should be included as a development dependency in the `package.json`.

The TypeDoc generator includes a wealth of different options and a default output theme that is clear to read and use.

The general rules are:

* Documentation should be created in a `docs` directory in the root of the repository (this allows Github Pages to work with it)
* Only source from the repository should be documented (no included modules or typings for included modules)
* The `master` branch should be used as the revision for documentation (this stops TypeDoc regenerating all the document files for each new commit)
* Non-source resources to be included should reside in a `docresources` directory

Unfortunately, the current `gulp-typedoc` module is woefully out of date, which can cause errors (and failure to build documentation) in components using new TypeScript features. For this reason, it is recommended you create a relevant task (`gulp` or whichever build system you're using) to build the documentation using a CLI method.

### Example

The current method of generating documentation for the balena ProcBots component can be seen [here](https://github.com/balena-io-modules/balena-procbots/blob/master/gulpfile.js).

This ensures that all external modules and typings are ignored, and that extra resources to be included are taken from `docresources`. Finally it ensures the revision to use for documentation is based on the `master` branch.

## Skeleton TypeScript project

To ensure that new TypeScript projects adhere to the standards in this document, a skeleton TypeScript project with the default settings can be found [here](https://github.com/product-os/balena-typescript-skeleton).

This project is buildable and can be copied and used as a basis for all balena TypeScript based components.

# Contributions
* balena.io team

# Footnotes
