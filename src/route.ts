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

import { PathPart, Route, ParamsFromPathArray } from './interfaces/types';
import { isParam, isQuery } from './interfaces/guards';
import { param } from './param';
import { query } from './query';

export type RouteCreator = <K extends Array<PathPart<any>>>(...args: K) => Route<K>;

export const route: RouteCreator = (...pathParts: Array<PathPart<any>>) => {
  return {
    template: () => {
      const template =
        '/' +
        pathParts
          .map(part => (isParam(part) ? `:${part.param}` : isQuery(part) ? '' : part))
          .join('/');

      if (template[template.length - 1] === '/') {
        return template.slice(0, template.length - 1);
      }

      return template;
    },
    create: (params: any) => {
      let queryNames: string[] = [];
      const basePath =
        '/' +
        pathParts
          .map(part => {
            if (isParam(part)) {
              const { param } = part;
              return params[param];
            }
            if (isQuery(part)) {
              queryNames = part.query;
              return '';
            }
            return part;
          })
          .join('/');

      const sanitizedPath = basePath.slice(0, basePath.length - 1);
      if (basePath[basePath.length - 1] === '/' && queryNames.length === 0) {
        return sanitizedPath;
      }
      if (queryNames.length === 0) {
        return basePath;
      }
      const queryParams: Array<[string, string]> = Object.entries(params.query);
      const path =
        sanitizedPath +
        '?' +
        queryParams
          .map(([k, v]) => {
            return `${k}=${v}`;
          })
          .join('&');

      return path;
    },
  };
};
