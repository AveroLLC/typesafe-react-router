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

type Params<Key extends string = string> = {
  readonly [key in Key]: string;
};

/**
 * @ignore
 */
export type QueryParamDefault = Record<
  string,
  | string
  | Array<string | Array<any> | Record<string, any> | null>
  | Record<string, any>
  | null
>;

export interface Options<Q extends QueryParamDefault> {
  query?: Q;
  title?: string;
}

export interface Route<
  Parts extends string,
  QueryParams extends QueryParamDefault
> {
  title?: string;
  template(): string;

  create: CreateFun<Parts, QueryParams>;

  route: <Parts1 extends string, QueryParams1 extends QueryParamDefault>(
    arg: Parts1 | Parts1[],
    option?: Options<QueryParams1>
  ) => Route<Parts1 | Parts, QueryParams & QueryParams1>;

  useQueryParams(): Partial<QueryParams>;

  useParams(): Required<Params<PathParam<Parts>>>;
  useMap(): {
    path: string | string[];
    title?: string;
    create(): string;
  }[];
  createNestedRoutes: <C>(
    generator: (parent: Route<Parts, QueryParams>) => C
  ) => {
    root: Route<Parts, QueryParams>;
  } & C;
}

/**
 * @ignore
 */
export type PathParam<T extends string> = T extends `:${infer A}` ? A : never;

/**
 * @ignore
 */
export type PathPart<T extends string> = string | PathParam<T>;

/**
 * @ignore
 */
export type CreateFun<
  Parts extends string,
  QueryParams extends QueryParamDefault
> = Parts extends `:${infer A}`
  ? (
      params: Record<PathParam<Parts>, string> & {
        query?: Partial<QueryParams>;
      }
    ) => string
  : (params?: { query?: Partial<QueryParams> }) => string;
