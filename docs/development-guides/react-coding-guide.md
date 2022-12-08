# React Coding Guidelines

Contributions by: @lucianbuzzo

## Introduction

[React][1] has been chosen as the library of choice for building user interfaces at
balena. React has many benefits, including:

- An easy-to-grasp templating system with JSX
- Great type safety when combined with Typescript
- Massive community support

Building our user interfaces using React means that we can easily use our component 
library, [Rendition][2], to reduce code repetition and unify the look and feel 
of our projects.

This document aims to:
- advise developers on common pitfalls when using React
- provide a "Best Practices" guide, helping to keep our React projects feeling cohesive and uniform
- set out guidelines for using the Rendition library

## Rendition and the Style Guide

The Rendition library is intended to be an opinionated set of building blocks
that we can build any balena UI from. 
Rendition components are an extension of our [design style guide][11] and they
should ideally be kept in sync with each other, i.e. each Rendition component
should have a corresponding design in the style guide and vice versa.

If a design contains a component that does not exist in the style guide or
Rendition, check that this is intentional, then:
- Request that the component is added to the style guide
- Add the component to Rendition
- Use the Rendition component in your project

If an element exists in the style guide but not in Rendition, they should be
first added to Rendition and then used in your project, instead of adding the
component directly to the project. 

If a design contains an existing rendition component, but modified in some way
that is not shown in the style guide or supported by Rendition then you should
start a discussion about the design intention and either change the design or
update the style guide and Rendition component. 

For example, if a design shows a modal where the CTA buttons are at the top
instead of the bottom: 
- **DO** start a discussion about the design, updating that or the style guide as a result.
- **DON'T** add a new property to the `<Modal>` component called
  `buttonPosition` that puts the CTA buttons at the top

It's important that the Rendition API remains simple to work with and that the
design language used is consistent. 

**Flexibility in the rendition library should come from the composition of 
components, not from an extensive and customizable API.**

These guidelines may seem strict and restrictive, but if they are adhered to we
can greatly reduce friction by:
- spending less time writing boilerplate code
- reducing code duplication
- standardising design and interaction
- fixing bugs in a single place

## Best Practices

### File Naming Conventions

JSX filenames should be in [Pascal Case][3] and should always have the `x` suffix to help make it clear that the file needs to be compiled to run correctly.
For example, use `ArcSlider.jsx` and not `arc-slider.js`.

### Exports

Always use named exports and never use `default`. 
Here are a few reasons why you shouldn't use `export default`:
- Difficult to refactor
- Mixed syntax if you start adding more exports
- Poor discoverability
- IDEs cannot autocomplete imports
- No protection from typos

Many articles have been written on this subject, and for shortness(of the number
of words) not all of the arguments are listed here.

### Function vs. Class

Choose functions when possible, in general always use the simplest solution to
a problem. If a component does not require internal state, then a function is
usually the best approach.
If a component does expensive calculations on each render, you should try using 
a [PureComponent][10].

```jsx
// Bad
class Button extends React.Components {
    render() {
        return (
            <button {...this.props}>Click me</button>
        )
    }
}

// Good
const Button = (props) => (
    <button {...props}>Click me</button>
)
```

### Container components vs Presentation components

Where possible push application logic out of children and into their parent
component. Keeping state and application logic out of components makes them
re-usable in many places and makes it much easier to reason about the way
the code works.

```jsx
// Bad
class RequestButton extends React.Component {
    handleClick = () => {
        this.props.getData(this.props.url)
    }

    render() {
        return (
            <button onClick={this.handleClick}>Click me</button>
        )
    }
)

class Wrapper extends React.Component {
    super(props) {
        this.state = {
            url: 'http://www.example.com/api'
        }
    }

    getData(url) {
        fetch(url)
            .then(
                // ...
            )
    }

    render() {
        return (
            <div>
                <RequestButton
                    url={this.state.url}
                    getData={this.getData}
                />
            </div>
        )
    }
}

// Good
const RequestButton = (props) => (
    <button {...props}>Click me</button>
)

class Wrapper extends React.Component {
    super(props) {
        this.state = {
            url: 'http://www.example.com/api'
        }
    }

    getData = () => {
        fetch(this.state.url)
            .then(
                // ...
            )
    }

    render() {
        return (
            <div>
                <RequestButton
                    onClick={this.getData}
                />
            </div>
        )
    }
}
```


### Architecture (Folder Structure)

React is based on composition, so components should be structured
while keeping this concept in mind. Let's start with an example of a good
structure, and then elaborate on it:

- components
    - shared (buttons, popups, etc.)
        - components
            - ...
        - utils
            - ...

    - pageA
        - name.container.tsx
        - name.presentation.tsx
        - name.router.tsx
        - subPageA
            - ... (same structure as pageA)
        - subPageB
            - ...
        - shared
            - ...

    - pageB
        - ... (same as pageA)

    - App.tsx

- state
    - shared
        - reducer generators (crud, etc)
        - helper functions
        - ...
    - users
        - users.reducer.ts
        - user.selectors.ts
        - user.actions.ts (or together with reducer.ts)
    - ...
    - rootReducer.ts
- index.tsx

Top-level folders should represent a small number of high-level components that represent your application. Each component should only use components that are defined within or below the same folder. The exception to this rule is a `shared` folder that can live "higher" in the folder tree than the component itself. The `shared` folder will host any components that are shared by multiple high-level components. If a folder is observed in isolation, it will appear as a self-contained mini-application that can easily be reused. This concept should be applied all the way down to the "leaf" components.

Components should only be able to fetch data using props. For example, by using a Redux action. Similarly, a component should not directly interact with the `window` object or the DOM outside of its rendering space. The only way same-level components can communicate between each other is through Redux, or by the parent handling data via props. This ensures a clear separation of each component, making them easier to reuse and test.


Routing should also be co-located with the high-level component it does the routing for. For example, if you have a Dashboard component, the **\*.router** in the Dashboard folder would handle all `<root>/dashboard/*` routing.
The Billing component's **\*.router** would handle all `<root>/billing/*` routing, and so on. `react-router` is the library of choice since it supports nested component-based routing.

### Styling

When styling components, the style should be encapsulated in the component
itself. The method for applying styling should follow this priority order:
1. `styled-system` properties
2. `styled-components` styling override
3. inline css via a `style` property

### Method Naming

If a React class method retrieves data, it should be prefixed with `get`.
When writing a property that accepts a callback, prefer to prefix the property
with `on`, e.g. `onModalClose`. Property names prefixed in this way should not
conflict with existing "native" properties of the same name, such as `onChange`
or `onClick`. When writing a method that handles events, prefix the method with
the word `handle`.

```jsx
// Bad
class App extends React.Component {
    fetchData() {
        fetch(//...)
    }

    wasClicked(event) {
        // ...
    }

    render() {
        return (
            <MyButton whenStateChanges={//...} />
        )
    }
}

// Good
class App extends React.Component {
    getData() {
        fetch(//...)
    }

    handleClick(event) {
        // ...
    }

    render() {
        return (
            <MyButton onStateChange={//...} />
        )
    }
}
```

### Iterating over collections

If you need to loop over a collection of elements, prefer to do so in the JSX 
code. This improves readability:

```jsx
// Bad
function App({ list }) {
    const items = list.map((item) => (
        <li key={item.id}>{item.name}</li>
    )
    return (
        <ul>
            {items}
        </ul>
    )
}

// Good
function App({ list }) {
    return (
        <ul>
            {list.map((item) => (
                <li key={item.id}>{item.name}</li>
            )}
        </ul>
    )
}
```

Unless the array you are iterating over is constant, do not use array indexes as 
keys, this can lead to unpredictable behaviour, for more information on this 
topic please read https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318

### State management

For state management, [Redux][12] and [Sagas][13] should be used. If possible
try and push side effects logic (such as API calls) into actions. 

### Development

When developing a new react project I highly recommended that you use
[create-react-app][7] as a starting point. It's well supported and takes a lot
of the pain out of bootstrapping a new application.
If a project becomes complex, you should use a [Storybook][8] so that
you can build and view components in isolation.
When sharing code snippets, (for example when brainstorming or investigating
bugs) I recommended [Codesandbox][9], here is a good starting point using React and
Rendition: https://codesandbox.io/s/pk5ry1z2jj.

### Testing

[Jest][4] and [Enzyme][5] should be used for unit testing and [Puppeteer][6] 
should be used for end to end testing.


[1]: https://reactjs.org/
[2]: https://github.com/balena-io-modules/rendition
[3]: http://wiki.c2.com/?PascalCase
[4]: https://jestjs.io/
[5]: https://github.com/airbnb/enzyme
[6]: https://github.com/GoogleChrome/puppeteer
[7]: https://github.com/facebook/create-react-app
[8]: https://storybook.js.org/
[9]: https://codesandbox.io/
[10]: https://reactjs.org/docs/react-api.html#reactpurecomponent
[11]: https://app.zeplin.io/project/59cbb35a8edcbe2d8fbe5678
[12]: https://redux.js.org/introduction
[13]: https://redux-saga.js.org/