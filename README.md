# Typesafe-React-Router

A collection of types and utility functions to facilitate typesafe routing in React-Router.

`npm i typesafe-react-router`

![vscode](https://i.imgur.com/WQHOWKx.gif "VSCode")
Note: This gif is using the 1.0 array-style API, rather than spread arguments used in 2.0.

## Usage

```tsx
import { route, param } from 'typesafe-react-router';

export enum RouteNames {
  HOME = "HOME"
  VIEW_ALL = "VIEW_ALL"
  VIEW_DETAILS = 'VIEW_DETAILS'
}

export const Routes = {
  [RouteNames.HOME]: route('home'),
  [RouteNames.VIEW_ALL]: route('view'),
  [RouteNames.VIEW_DETAILS]: route('view', param('id')),
  [RouteNames.CONTACTS]: route('contacts'),
  get [RouteNames.ADD_CONTACT]() {
    return this[RouteNames.CONTACTS].nest('add')
  },
  get [RouteNames.VIEW_CONTACT]() {
    return this[RouteNames.CONTACTS].nest(param('id'))
  }
}

const viewDetailsTemplate = Routes[RouteNames.VIEW_DETAILS].template() // -> /view/:id
const viewDetailsCreate = Routes[RouteNames.VIEW_DETAILS].create({ id: '2' }) // -> /view/2

const addContactTemplate = Routes[RouteNames.ADD_CONTACT].template() // -> /contacts/add
const viewContactTemplate = Routes[RouteNames.VIEW_CONTACT].template() // -> /contacts/:id
const viewContactCreate = Routes[RouteNames.VIEW_CONTACT].create({id: '4'}) // -> /contacts/4

const viewDetailsCreateERROR = Routes[RouteNames.VIEW_DETAILS].create({}) // ERROR: property 'id' is missing in type {}

// Usage with React Router
import { Route, Switch } from 'react-router-dom';
import { Home, Summary, Details } from './components'
export class App extends React.PureComponent {
  render() {
    <Switch>
      <Route path={Routes[RouteNames.HOME].template()} component={Home} />
      <Route path={Routes[RouteNames.VIEW].template()} component={Summary} />
      <Route path={Routes[RouteNames.VIEW_DETAILS].template()} component={Details} />
    </Switch>
  }
}

import { Link } from 'react-router-dom';

export class Home extends React.PureComponent {
  render() {
    <div>
      <h1>Welcome Home!</h1>
      <Link to={Routes[RouteNames.VIEW_DETAILS].create({ id: '3' })} />
      {/* ERROR: property 'id' is missing in type {} */}
      <Link to={Routes[RouteNames.VIEW_DETAILS].create({})} />
    </div>
  }
}
```
