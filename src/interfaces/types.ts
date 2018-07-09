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

// Interface returned by our RouteCreator function
export interface Route<Parts extends PathPart<any>> {
  // to be passed into react-router's "Route" component
  template(): string;
  // to be passed into react-router's "Link" component
  create(params: UnionToIntersection<OnlyParams<Parts>>): string;
}

export interface PathParam<T extends string> {
  param: T;
}

// Route consists of tuple of PathParts
export type PathPart<T extends string> = string | PathParam<T>;

// Pluck only the parameter types from a Route
export type OnlyParams<T> = T extends PathParam<infer K> ? Record<K, string> : {};

// Given the parameters of a route I want an object of { paramName: string }
// e.g. for const Route = route(['logbook', param('logbookId'), param('otherId')]);
// RouteParams<Route> = { logbookId: string, otherId: string }
export type RouteParams<T extends Route<any>> = T extends Route<infer X>
  ? UnionToIntersection<OnlyParams<X>>
  : never;

// Type Utils
export type GetKeys<U> = U extends Record<infer K, any> ? K : never;
export type UnionToIntersection<U extends object> = {
  [K in GetKeys<U>]: U extends Record<K, infer T> ? T : never
};
