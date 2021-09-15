import { useLocation, useParams } from "react-router-dom";

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

import { GetParam, Route } from "./interfaces/types";
import { isParam } from "./interfaces/guards";
import { stringify } from "qs";

const __DEV__ = process.env.NODE_ENV !== "production";

function getPathBegin(path: string[]) {
  return path[0] === "*" ? "" : "/";
}

export function route<T extends string, Q extends string>({
  path,
  query = [],
}: {
  path: T[];
  query?: Q[];
}): Route<T, Q> {
  if (__DEV__) {
    const error = path.find((p) => p.includes("/"));
    if (error) {
      throw new Error(
        `react-route-type: Don't use '/' in route '${error}', use it like \`route(['home',':id'])\``
      );
    }
  }

  return {
    template: () => {
      return getPathBegin(path) + path.join("/");
    },
    create: (params: Record<any, any> = {}) => {
      const baseUrl =
        getPathBegin(path) +
        path
          .map((part) => {
            if (part === "*") {
              return location.pathname;
            }
            if (isParam(part)) {
              return params[(part as string).slice(1)];
            }
            return part;
          })
          .join("/");

      const queryString =
        Object.keys(params.query || {}).length === 0
          ? ""
          : stringify(params.query, { encode: false });

      return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    },

    route: ({ path: _path, query: _query = [] }) => {
      return route({
        path: [...path, ..._path],
        query: [...query, ..._query],
      });
    },
    /**
     * A react hook to get query params
     */
    useQueryParams(): Partial<Record<Q[number], string>> {
      return Object.fromEntries(
        new URLSearchParams(useLocation().search).entries()
      ) as any;
    },

    useParams() {
      return useParams<Record<GetParam<T>, string>>();
    },
  };
}
