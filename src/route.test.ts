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

enum RouteNames {
  HOME = "HOME",
  VIEW = "VIEW",
  VIEW_DETAILS = "VIEW_DETAILS",
  VIEW_MORE_DETAILS = "VIEW_MORE_DETAILS",
  ONLY_PARAM = "ONLY_PARAM",
  WITH_QUERY = "WITH_QUERY",
  EMPTY_QUERY = "EMPTY_QUERY",
  MULTI_CALL_QUERY = "MULTI_CALL_QUERY",
  MULTI_QUERY = "MULTI_QUERY",
}

const Routes = {
  [RouteNames.HOME]: route("home"),
  [RouteNames.VIEW]: route("view"),
  [RouteNames.VIEW_DETAILS]: route(["view", ":id"]),
  [RouteNames.VIEW_MORE_DETAILS]: route(["view", ":id", "more", ":otherId"]),
  [RouteNames.ONLY_PARAM]: route(":param"),
  [RouteNames.WITH_QUERY]: route(":id", { query: { dateCreated: "" } }),
  [RouteNames.EMPTY_QUERY]: route([":id"]),
  [RouteNames.MULTI_CALL_QUERY]: route([":id"], {
    query: { dateCreated: "", dateUpdated: "" },
  }),
  [RouteNames.MULTI_QUERY]: route("home", {
    query: { dateCreated: "" as string | null },
  }).route(":id", {
    query: { dateUpdated: "" },
  }),
};

const expectedTemplate = {
  [RouteNames.HOME]: "/home",
  [RouteNames.VIEW]: "/view",
  [RouteNames.VIEW_DETAILS]: "/view/:id",
  [RouteNames.VIEW_MORE_DETAILS]: "/view/:id/more/:otherId",
  [RouteNames.ONLY_PARAM]: "/:param",
  [RouteNames.WITH_QUERY]: "/:id",
  [RouteNames.EMPTY_QUERY]: "/:id",
  [RouteNames.MULTI_CALL_QUERY]: "/:id",
  [RouteNames.MULTI_QUERY]: "/home/:id",
};

describe("Route", () => {
  test("Template", () => {
    Object.keys(Routes).forEach((k) => {
      expect(Routes[k as keyof typeof Routes].template()).toEqual(
        expectedTemplate[k as keyof typeof expectedTemplate]
      );
    });

    expect(Routes[RouteNames.HOME].template()).toBe("/home");
  });

  test("Nested", () => {
    const home = route("home").createNestedRoutes((parent) => ({
      view: parent.route("view").createNestedRoutes((parent) => ({
        notif: parent.route("notif"),
      })),
      dashboard: parent.route("dashboard"),
    }));
    expect(home.root.template()).toBe("/home/*");
    expect(home.dashboard.template()).toBe("dashboard");
    expect(home.view.root.template()).toBe("view/*");
    expect(home.view.notif.route("details").template()).toBe("notif/details");
    expect(home.view.root.route(["details", ":id"]).template()).toBe(
      "details/:id"
    );
  });

  test("Create", () => {
    expect(Routes[RouteNames.HOME].create()).toBe("/home");

    expect(Routes[RouteNames.VIEW].create()).toBe("/view");

    expect(Routes[RouteNames.VIEW_DETAILS].create({ id: "3" })).toBe("/view/3");

    expect(
      Routes[RouteNames.VIEW_MORE_DETAILS].create({ id: "3", otherId: "4" })
    ).toBe("/view/3/more/4");

    expect(Routes[RouteNames.ONLY_PARAM].create({ param: "1" })).toBe("/1");

    expect(
      Routes[RouteNames.WITH_QUERY].create({
        id: "1",
        query: {
          dateCreated: "1/1/2018",
        },
      })
    ).toBe("/1?dateCreated=1/1/2018");

    expect(
      Routes[RouteNames.EMPTY_QUERY].create({
        id: "1",
      })
    ).toBe("/1");

    expect(
      Routes[RouteNames.EMPTY_QUERY].create({
        id: "1",
        query: {},
      })
    ).toBe("/1");

    expect(
      Routes[RouteNames.MULTI_CALL_QUERY].create({
        id: "1",
        query: {
          dateCreated: "1/1/2018",
          dateUpdated: "2/1/2018",
        },
      })
    ).toBe("/1?dateCreated=1/1/2018&dateUpdated=2/1/2018");

    expect(
      Routes[RouteNames.MULTI_QUERY].create({
        id: "1",
        query: {
          dateCreated: "1/1/2018",
          dateUpdated: "2/1/2018",
        },
      })
    ).toBe("/home/1?dateCreated=1/1/2018&dateUpdated=2/1/2018");

    expect(
      Routes[RouteNames.MULTI_QUERY].create({
        id: "1",
        query: {
          dateCreated: null,
          dateUpdated: undefined,
        },
      })
    ).toBe("/home/1?dateCreated=");

    expect(
      Routes[RouteNames.MULTI_QUERY].create({
        id: "1",
        query: {
          dateCreated: "1/1/2018",
        },
      })
    ).toBe("/home/1?dateCreated=1/1/2018");

    expect(
      Routes[RouteNames.MULTI_QUERY].create({
        id: "1",
      })
    ).toBe("/home/1");
  });
});

const tsRoute = route(["home", ":id"], { query: { search: "" } }).route(
  ["list", ":name"],
  {
    query: { type: "" },
  }
);

function Comp() {
  const { id, name } = tsRoute.useParams();

  //@ts-expect-error
  const { invalidParam } = tsRoute.useParams();

  const { search, type } = tsRoute.useQueryParams();

  //@ts-expect-error
  const { invalidQuery } = tsRoute.useQueryParams();
}
