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

import { PathPart, Route, RouteParams, ParamsFromPathArray } from './interfaces/types';
import { isParam } from './interfaces/guards';
import { param } from './param';

export type RouteCreator = <K extends Array<PathPart<any>>>(...args: K) => Route<K>;

export const route: RouteCreator = (...pathParts: Array<PathPart<any>>) => {
  return {
    template: () => {
      return (
        '/' + pathParts.map(part => (isParam(part) ? `:${part.param}` : part)).join('/')
      );
    },
    create: (params: any) => {
      return (
        '/' +
        pathParts
          .map(part => {
            if (isParam(part)) {
              const { param } = part;
              return params[param];
            }
            return part;
          })
          .join('/')
      );
    },
  };
};
