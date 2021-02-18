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

import { ParamsFromPathArray, PathPart, Route } from "./interfaces/types";
import { isParam } from "./interfaces/guards";
import { parse as _parse } from "./parse";
import { stringify } from "qs";

export const route = <
  K extends Array<PathPart<any>>,
  Q extends Array<string> = []
>(
  ...pathParts: K
): Route<K, Q> => {
  // ts was yelling about this array as a never[]?
  const emptyArr: string[] = [];
  return _routeCreator(pathParts, emptyArr);
};

function getPathBegin(pathParts: Array<PathPart<any>>) {
  return pathParts[0] === "*" ? "" : "/";
}

function _routeCreator<
  T extends Array<PathPart<any>>,
  Q extends Array<string> = []
>(pathParts: Array<PathPart<any>>, queryParams: Q): Route<T, Q> {
  return {
    template: () => {
      return (
        getPathBegin(pathParts) +
        pathParts
          .map((part) => (isParam(part) ? `:${part.param}` : part))
          .join("/")
      );
    },
    create: (params: Record<any, any> = {}) => {
      const baseUrl =
        getPathBegin(pathParts) +
        pathParts
          .map((part) => {
            if (part === "*") {
              return location.pathname;
            }
            if (isParam(part)) {
              const { param } = part;
              return params[param];
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
    withQueryParams: <TQueryParams extends string[]>(
      ...params: TQueryParams
    ) => {
      return _routeCreator(pathParts, [...params, ...queryParams]);
    },
    parse: (queryString: string) => {
      return _parse(queryString);
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
      return useParams<Record<ParamsFromPathArray<T>[number], string>>();
    },
  };
}
