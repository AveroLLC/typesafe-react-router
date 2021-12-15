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
import TestRenderer, { ReactTestRendererJSON } from "react-test-renderer";
import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
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

  test("valid param", () => {
    function Comp() {
      const { id } = homeRoute.useParams();
      const { search, withDefault } = homeRoute.useQueryParams();

      return <ResponseComp {...{ id, search, withDefault }} />;
    }

    const testRenderer = TestRenderer.create(
      <RouteContainer
        template={homeRoute.template()}
        initialPath={homeRoute.create({ id: "12345", query: { search: "s" } })}
        Comp={Comp}
      />
    );

    const json = testRenderer.toJSON() as ReactTestRendererJSON;

    expect(json.props.id).toBe("12345");

    expect(json.props.search).toBe("s");

    expect(json.props.withDefault).toBe("default");
  });

  test("map of routes", () => {
    function Comp() {
      const routeMap = tsRoute.useMap();

      return <ResponseComp {...{ routeMap }} />;
    }

    const testRenderer = TestRenderer.create(
      <RouteContainer
        template={tsRoute.template()}
        initialPath={tsRoute.create({
          id: "12345",
          name: "leon",
          query: { type: "type1" },
        })}
        Comp={Comp}
      />
    );

    const json = testRenderer.toJSON() as ReactTestRendererJSON;

    expect(json.props.routeMap).toMatchObject([
      {
        create: expect.any(Function),
        path: ["home", ":id"],
        title: "Home",
      },
      {
        create: expect.any(Function),
        path: ["home", ":id", "list", ":name"],
        title: "List",
      },
    ]);
  });
});
