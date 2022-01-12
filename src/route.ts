import { useLocation, useParams, useMatch } from "./reactRouter";

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

import {
  PathParam,
  Options,
  QueryParamDefault,
  Route,
} from "./interfaces/types";
import { isParam } from "./interfaces/guards";
import { stringify } from "qs";
import { useMemo } from "react";

const __DEV__ = process.env.NODE_ENV !== "production";

interface InternalOptions<Q extends QueryParamDefault> extends Options<Q> {
  relatedFrom?: number;
  parent?: InternalRoute<string, any>;
}

interface InternalRoute<T extends string, Q extends QueryParamDefault>
  extends Route<T, Q> {
  path: T[] | T;
  option: InternalOptions<Q>;
  parent?: InternalRoute<string, any>;
}

function internalRoute<T extends string, Q extends QueryParamDefault>(
  path: T[] | T,
  option: InternalOptions<Q> = {}
) {
  const { query, hasNested = false, relatedFrom, parent, title } = option;

  const paths = Array.isArray(path) ? path : [path];
  if (__DEV__) {
    const error = paths.find((p) => p.includes("/"));
    if (error) {
      throw new Error(
        `react-route-type: Don't use '/' in route '${error}', use it like \`route(['home',':id'])\``
      );
    }
  }

  const result: InternalRoute<T, Q> = {
    parent,
    option,
    path,
    title,
    template: () => {
      let path = paths.slice(relatedFrom || 0).join("/");

      if (!relatedFrom) {
        path = `/${path}`;
      }

      return path + (hasNested ? "/*" : "");
    },
    create: (params = {}) => {
      const baseUrl = `/${paths
        .map((part: string) => {
          if (part === "*") {
            return location.pathname;
          }
          if (isParam(part)) {
            return (params as Record<string, string>)[
              (part as string).slice(1)
            ];
          }
          return part;
        })
        .join("/")}`;

      const queryString =
        Object.keys(params.query || {}).length === 0
          ? ""
          : stringify(params.query, { encode: false });

      return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    },

    route(_path, options = {}) {
      const { query: _query, title, hasNested: _hasNested = false } = options;

      const _paths = Array.isArray(_path) ? _path : [_path];
      const path = [...paths, ..._paths];

      return internalRoute(path, {
        query: { ...query, ..._query } as any,
        hasNested: _hasNested,
        parent: result,
        title,
        relatedFrom: hasNested ? paths.length : relatedFrom,
      });
    },
    /**
     * A react hook to get query params
     */
    useQueryParams() {
      const { search } = useLocation();
      return useMemo(
        () =>
          ({
            ...query,
            ...Object.fromEntries(new URLSearchParams(search).entries()),
          } as any),
        [search]
      );
    },

    useParams() {
      return useParams<PathParam<T>>() as unknown as ReturnType<
        InternalRoute<T, Q>["useParams"]
      >;
    },
    useMap() {
      const match = useMatch(result.template());

      function generateMap(
        _routes?: InternalRoute<string, any>
      ): ReturnType<InternalRoute<T, Q>["useMap"]> {
        if (!_routes) {
          return [];
        }

        const { path, title } = _routes;

        return [
          ...generateMap(_routes?.parent),
          {
            path,
            create: () => {
              return _routes.create(match?.params);
            },
            title,
          },
        ].filter(Boolean);
      }

      return generateMap(result);
    },
  };

  return result;
}

export const route: <T extends string, Q extends QueryParamDefault>(
  path: T[] | T,
  option?: Options<Q>
) => Route<T, Q> = internalRoute;
