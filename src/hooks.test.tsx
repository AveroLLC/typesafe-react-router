/*
   Copyright Avero, LLC
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

import { route } from "./route";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import {
  MemoryRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import React from "react";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useHistory: () => ({
    location: {
      pathname: "",
    },
  }),
}));

const homeRoute = route(["home", ":id"], {
  query: { search: "", withDefault: "default" },
  title: "Home",
});
const tsRoute = homeRoute.route(["list", ":name"], {
  query: { type: "" },
  title: "List",
});

function Comp() {
  // typescript
  const { id, name } = tsRoute.useParams();

  //@ts-expect-error
  const { invalidParam } = tsRoute.useParams();

  const { search, type } = tsRoute.useQueryParams();

  //@ts-expect-error
  const { invalidQuery } = tsRoute.useQueryParams();
}

describe("Hooks", () => {
  function ResponseComp(props: any) {
    return <p {...props} />;
  }

  function RouteContainer({
    initialPath,
    template,
    Comp,
  }: {
    initialPath: string;
    template: string;
    Comp: any;
  }) {
    const [pathname, search] = initialPath.split("?");
    return (
      <MemoryRouter
        initialEntries={[
          {
            pathname: pathname,
            search: "?" + search,
          },
        ]}
      >
        <Routes>
          <Route path={template} element={<Comp />} />
          <Route path={"/"} element={<Navigate to={initialPath} />} />
        </Routes>
      </MemoryRouter>
    );
  }

  function RouteWithButtonContainer({
    initialPath,
    template,
    Comp,
  }: {
    initialPath: string;
    template: string;
    Comp: any;
  }) {
    return (
      <Routes>
        <Route path={template} element={<Comp />} />
        <Route path={"*"} element={<Navigator {...{ initialPath }} />} />
      </Routes>
    );
  }

  const Navigator = ({ initialPath }: any) => {
    const navigate = useNavigate();

    return (
      <button
        data-testid="navigate"
        onClick={() => navigate(initialPath)}
        title={initialPath}
      >
        {initialPath}
      </button>
    );
  };

  test("valid param", () => {
    function Comp() {
      const { id } = homeRoute.useParams();
      const { search, withDefault } = homeRoute.useQueryParams();

      return (
        <ResponseComp
          {...{ id, search }}
          data-withdefault={withDefault}
          data-testid="response"
        />
      );
    }

    const testRenderer = render(
      <RouteContainer
        template={homeRoute.template()}
        initialPath={homeRoute.create({ id: "12345", query: { search: "s" } })}
        Comp={Comp}
      />
    );

    const json = testRenderer.getByTestId("response");

    expect(json.getAttribute("id")).toBe("12345");

    expect(json.getAttribute("search")).toBe("s");

    expect(json.getAttribute("data-withdefault")).toBe("default");
  });

  test("map of routes", () => {
    const homeRoute = route(["home", ":id"], {
      query: { search: "", withDefault: "default" },
      title: "Home",
    }).createNestedRoutes((parent) => ({
      dashboard: parent.route("dashboard").createNestedRoutes((parent) => ({
        userDashboard: parent.route("userDashboard"),
      })),
    }));

    function Comp() {
      const list = homeRoute.dashboard.userDashboard.useMap();

      const props = list.reduce(
        (prev, { create }, index) => ({
          ...prev,
          [`data-${index}`]: create(),
        }),
        {}
      );

      return <ResponseComp {...props} data-testid="response" />;
    }

    function CompChild() {
      const { id } = homeRoute.dashboard.root.useParams();

      return (
        <RouteWithButtonContainer
          template={homeRoute.dashboard.userDashboard.template()}
          initialPath={homeRoute.dashboard.userDashboard.create({
            id: id,
          })}
          Comp={Comp}
        />
      );
    }
    function CompParent() {
      const { id } = homeRoute.root.useParams();

      return (
        <RouteWithButtonContainer
          template={homeRoute.dashboard.root.template()}
          initialPath={homeRoute.dashboard.root.create({
            id: id,
            query: { type: "type1" },
          })}
          Comp={CompChild}
        />
      );
    }

    const testRenderer = render(
      <RouteContainer
        template={homeRoute.root.template()}
        initialPath={homeRoute.root.create({
          id: "12345",
          query: { search: "s" },
        })}
        Comp={CompParent}
      />
    );

    act(() => {
      fireEvent.click(testRenderer.getByTestId("navigate"));
    });

    const navigate = testRenderer.getByTestId("navigate");

    expect(navigate.title).toBe("/home/12345/dashboard/userDashboard");

    act(() => {
      fireEvent.click(navigate);
    });

    const json = testRenderer.getByTestId("response");

    expect(json.getAttribute("data-0")).toBe("/home/12345");
    expect(json.getAttribute("data-1")).toBe("/home/12345/dashboard");
    expect(json.getAttribute("data-2")).toBe(
      "/home/12345/dashboard/userDashboard"
    );
  });

  test("route title", () => {
    const home = route("home", { title: "home title" });
    const dashboard = home.route("dashboard");
    const my = dashboard.route("my", { title: "my title" });

    expect(home.title).toBe("home title");
    expect(dashboard.title).toBe(undefined);
    expect(my.title).toBe("my title");
  });
});
