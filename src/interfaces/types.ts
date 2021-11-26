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

import { Params } from "react-router-dom";

export interface Route<
  Parts extends string,
  QueryParams extends QueryParamDefault
> {
  template(options?: {
    /** default is `false` */
    hasNested?: boolean;
  }): string;

  create: CreateFun<Parts, QueryParams>;

  route: <Parts1 extends string, QueryParams1 extends QueryParamDefault>(
    arg:
      | {
          path: Parts1[] | Parts1;
          query?: QueryParams1;
        }
      | Parts1
      | Parts1[]
  ) => Route<Parts1 | Parts, QueryParams & QueryParams1>;

  useQueryParams(): Partial<QueryParams>;

  useParams(): Params<GetParam<Parts>>;
}

/**
 * @ignore
 */
export type PathParam<T extends string> = T extends `:${infer A}` ? A : never;

/**
 * @ignore
 */
export type PathPart<T extends string> = string | PathParam<T>;

export type GetParam<T extends string> = T extends `:${infer A}` ? A : never;

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

/**
 * @ignore
 */
export type CreateFun<
  Parts extends string,
  QueryParams extends QueryParamDefault
> = Parts extends `:${infer A}`
  ? (
      params: Record<GetParam<Parts>, string> & {
        query?: Partial<QueryParams>;
      }
    ) => string
  : (params?: { query?: Partial<QueryParams> }) => string;
