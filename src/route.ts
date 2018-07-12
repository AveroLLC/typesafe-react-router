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

import { PathPart, Route } from './interfaces/types';
import { isParam } from './interfaces/guards';

export interface RouteCreator {
  <K extends PathPart<any>>(ks: [K]): Route<K>;
  <K extends PathPart<any>, K1 extends PathPart<string>>(ks: [K, K1]): Route<K | K1>;
  <K extends PathPart<any>, K1 extends PathPart<any>, K2 extends PathPart<any>>(
    ks: [K, K1, K2]
  ): Route<K | K1 | K2>;
  <
    K extends PathPart<any>,
    K1 extends PathPart<any>,
    K2 extends PathPart<any>,
    K3 extends PathPart<any>
  >(
    ks: [K, K1, K2, K3]
  ): Route<K | K1 | K2 | K3>;
  <
    K extends PathPart<any>,
    K1 extends PathPart<any>,
    K2 extends PathPart<any>,
    K3 extends PathPart<any>,
    K4 extends PathPart<any>
  >(
    ks: [K, K1, K2, K3, K4]
  ): Route<K | K1 | K2 | K3 | K4>;
  <
    K extends PathPart<any>,
    K1 extends PathPart<any>,
    K2 extends PathPart<any>,
    K3 extends PathPart<any>,
    K4 extends PathPart<any>,
    K5 extends PathPart<any>
  >(
    ks: [K, K1, K2, K3, K4, K5]
  ): Route<K | K1 | K2 | K3 | K4 | K5>;
  <
    K extends PathPart<any>,
    K1 extends PathPart<any>,
    K2 extends PathPart<any>,
    K3 extends PathPart<any>,
    K4 extends PathPart<any>,
    K5 extends PathPart<any>,
    K6 extends PathPart<any>
  >(
    ks: [K, K1, K2, K3, K4, K5, K6]
  ): Route<K | K1 | K2 | K3 | K4 | K5 | K6>;
  <
    K extends PathPart<any>,
    K1 extends PathPart<any>,
    K2 extends PathPart<any>,
    K3 extends PathPart<any>,
    K4 extends PathPart<any>,
    K5 extends PathPart<any>,
    K6 extends PathPart<any>,
    K7 extends PathPart<any>
  >(
    ks: [K, K1, K2, K3, K4, K5, K6, K7]
  ): Route<K | K1 | K2 | K3 | K4 | K5 | K6 | K7>;
  <
    K extends PathPart<any>,
    K1 extends PathPart<any>,
    K2 extends PathPart<any>,
    K3 extends PathPart<any>,
    K4 extends PathPart<any>,
    K5 extends PathPart<any>,
    K6 extends PathPart<any>,
    K7 extends PathPart<any>,
    K8 extends PathPart<any>
  >(
    ks: [K, K1, K2, K3, K4, K5, K6, K7, K8]
  ): Route<K | K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8>;
  <
    K extends PathPart<any>,
    K1 extends PathPart<any>,
    K2 extends PathPart<any>,
    K3 extends PathPart<any>,
    K4 extends PathPart<any>,
    K5 extends PathPart<any>,
    K6 extends PathPart<any>,
    K7 extends PathPart<any>,
    K8 extends PathPart<any>,
    K9 extends PathPart<any>
  >(
    ks: [K, K1, K2, K3, K4, K5, K6, K7, K8, K9]
  ): Route<K | K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9>;
}

export const route: RouteCreator = (pathParts: Array<PathPart<any>>) => {
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
