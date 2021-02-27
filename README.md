# react-route-type

A collection of types and utility functions to facilitate typesafe routing in React-Router.

npm

`npm i react-route-type`

yarn

`yarn add react-route-type`

![vscode](https://i.imgur.com/WQHOWKx.gif "VSCode")
Note: This gif is using the 1.0 array-style API, rather than spread arguments used in 2.0.

## Usage

```tsx
import { route, param } from 'react-route-type';

export enum RouteNames {
  HOME = "HOME"
  VIEW_ALL = "VIEW_ALL"
  VIEW_DETAILS = 'VIEW_DETAILS'
}

export const Routes = {
  [RouteNames.HOME]: route('home');
  [RouteNames.VIEW_ALL]: route('view')
  [RouteNames.VIEW_DETAILS]: route('view', param('id'))
}

const viewDetailsTemplate = Routes[RouteNames.VIEW_DETAILS].template() // -> /view/:id
const viewDetailsCreate = Routes[RouteNames.VIEW_DETAILS].create({ id: '2' }) // -> /view/2

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

## useQueryParams

A react hook to get query params

## useParams

Used `react-router-dom` useParams just types is assigned
https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom

## Parse

Used 'qs' module for parse and stringify params without decode
https://github.com/ljharb/qs
