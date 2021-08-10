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
import { route } from 'react-route-type';


export const Routes = {
  home: route(['home']);
  view: route(['view'],["search"])
  details: route(['details', ':id'])
}

const viewDetailsTemplate = Routes.details.template() // -> /details/:id
const viewDetailsCreate = Routes.details.create({ id: '2' }) // -> /details/2

const viewDetailsCreateERROR = Routes.details.create({}) // ERROR: property 'id' is missing in type {}

// Usage with React Router
import { Route, Switch } from 'react-router-dom';
import { Home, Summary, Details } from './components'
export class App extends React.PureComponent {
  render() {
    <Switch>
      <Route path={Routes.home.template()} component={Home} />
      <Route path={Routes.view.template()} component={Summary} />
      <Route path={Routes.details.template()} component={Details} />
    </Switch>
  }
}

import { Link } from 'react-router-dom';

export class Home extends React.PureComponent {
  render() {
    <div>
      <h1>Welcome Home!</h1>
      <Link to={Routes.details.create({ id: '3' })} />
      <Link to={Routes.view.create({})} />
    </div>
  }
}
```

## Hooks

```js
export const Details = () => {
  const { id } = Routes.details.useParams();
};

export const View = () => {
  const { search } = Routes.view.useQueryParam();
};
```
