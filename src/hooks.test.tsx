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
});
const tsRoute = homeRoute.route(["list", ":name"], {
  query: { type: "" },
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
  test("valid param", () => {
    function ResponseComp(props: any) {
      return <p {...props} />;
    }

    function Comp() {
      const { id } = homeRoute.useParams();
      const { search, withDefault } = homeRoute.useQueryParams();

      return <ResponseComp {...{ id, search, withDefault }} />;
    }

    const testRenderer = TestRenderer.create(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/home/12345",
            search: "?search=s",
          },
        ]}
      >
        <Routes>
          <Route path={homeRoute.template()} element={<Comp />} />
          <Route
            path={"/"}
            element={
              <Navigate
                to={homeRoute.create({ id: "12345", query: { search: "s" } })}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect((testRenderer.toJSON() as ReactTestRendererJSON).props.id).toBe(
      "12345"
    );

    expect((testRenderer.toJSON() as ReactTestRendererJSON).props.search).toBe(
      "s"
    );

    expect(
      (testRenderer.toJSON() as ReactTestRendererJSON).props.withDefault
    ).toBe("default");
  });
});
