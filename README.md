# react-route-type

A collection of types and utility functions to facilitate typesafe routing in react-router-dom and react-router-native.

npm

`npm i react-route-type`

yarn

`yarn add react-route-type`

## Usage

```tsx
import { route } from "react-route-type";

export const Routes = {
  home: route("home"),
  view: route("view"),
  details: route(["view", ":id"]),
  users: route("users", { query: { search: "" } }),
};

const viewDetailsTemplate = Routes.details.template(); // -> /view/:id
const viewDetailsCreate = Routes.details.create({ id: "2" }); // -> /view/2

const viewDetailsCreateERROR = Routes.details.create({}); // ERROR: property 'id' is missing in type {}

// Usage with React Router
import { Route, Switch } from "react-router-dom";
import { Home, Summary, Details } from "./components";
export class App extends React.PureComponent {
  render() {
    <Switch>
      <Route path={Routes.home.template()} component={Home} />
      <Route path={Routes.view.template()} component={Summary} />
      <Route path={Routes.details.template()} component={Details} />
    </Switch>;
  }
}

import { Link } from "react-router-dom";

export class Home extends React.PureComponent {
  render() {
    <div>
      <h1>Welcome Home!</h1>
      <Link to={Routes.details.create({ id: "3" })} />
      <Link to={Routes.view.create({})} />
    </div>;
  }
}
```

## Hooks

#### useParams

Params is required

```js
export const Routes = {
  details: route(["view", ":id"]),
};

// "/view/:id"
<Route path={Routes.details.template()} component={Details} />;

export const Details = () => {
  const { id } = Routes.details.useParams();
};
```

#### useQueryParam

All property of query is optional

```js
export const View = () => {
  const { search } = Routes.view.useQueryParam();
};
```

With Default value

```js
const users = route(["users"], {
  query: { withDefault: "default" },
});

export const Users = () => {
  const { withDefault } = Routes.view.useQueryParam();

  /// withDefault === "default" is true
};
```

## Nested routes

```js
const home = route("home");
const settings = route("settings").createNestedRoutes((parent)=>({
   global: parent.route("global");
   advanced: parent.route("advanced");
}));

// App.js
function App() {
  return (
    <Routes>
      <Route
        path={home.template()} // "/home"
        element={<Home />}
      />
      <Route
        path={settings.root.template()} // "/settings/*"
        element={<Settings />}
      />
    </Routes>
  );
}

// Settings.js
function Settings() {
  return (
    <Container>
      <Conversations />

      <Routes>
        <Route
          path={setting.global.template()} // "global"
          element={<Global />}
        />
        <Route
          path={setting.advanced.template()} // "advanced"
          element={<Advanced />}
        />
      </Routes>
    </Container>
  );
}
```

### useMap

This is useful for create breadcrumb

```js
const routeMap = setting.advanced.useMap(); // [{path:"settings",create=()=>"/settings"},{path:"advanced",create=()=>"/settings/advanced"}]

return (
  //antd
  <Breadcrumb>
    {routeMap.map(({ path, create }) => {
      <Breadcrumb.Item key={path}>
        <a href={create()}></a>
      </Breadcrumb.Item>;
    })}
  </Breadcrumb>
);
```
