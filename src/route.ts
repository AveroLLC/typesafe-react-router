import { useLocation, useParams } from "react-router";

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

import { GetParam, QueryParamDefault, Route } from "./interfaces/types";
import { isParam } from "./interfaces/guards";
import { stringify } from "qs";
import { useMemo } from "react";

const __DEV__ = process.env.NODE_ENV !== "production";

export function route<T extends string, Q extends QueryParamDefault>(
  param:
    | {
        path: T[] | T;
        query?: Q;
        hasNested?: boolean;
      }
    | T[]
    | T
) {
  const {
    path,
    query,
    hasNested = false,
    // @ts-ignore
    _relatedFrom,
  } = typeof param === "string" || Array.isArray(param)
    ? { path: param, query: undefined }
    : param;

  const paths = Array.isArray(path) ? path : [path];
  if (__DEV__) {
    const error = paths.find((p) => p.includes("/"));
    if (error) {
      throw new Error(
        `react-route-type: Don't use '/' in route '${error}', use it like \`route(['home',':id'])\``
      );
    }
  }

  const result: Route<T, Q> = {
    template: () => {
      let path = paths.slice(_relatedFrom || 0).join("/");

      if (!_relatedFrom) {
        path = `/${path}`;
      }

      return path + (hasNested ? "/*" : "");
    },
    create: (params: Record<any, any> = {}) => {
      const baseUrl = `/${paths
        .map((part) => {
          if (part === "*") {
            return location.pathname;
          }
          if (isParam(part)) {
            return params[(part as string).slice(1)];
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

    route(_param) {
      const {
        path: _path,
        query: _query,
        hasNested: _hasNested = false,
      } = typeof _param === "string" || Array.isArray(_param)
        ? { path: _param, query: undefined }
        : _param;

      const _paths = Array.isArray(_path) ? _path : [_path];
      const path = [...paths, ..._paths];

      return route({
        path,
        query: { ...query, ..._query } as any,
        hasNested: _hasNested,
        //@ts-ignore
        _relatedFrom: hasNested ? paths.length : _relatedFrom,
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
      return useParams<GetParam<T>>();
    },
  };

  return result;
}
