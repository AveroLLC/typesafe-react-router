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

import { Route, QueryParamsFromRoute } from './interfaces/types';
import { parse as qsParse } from 'query-string';

export function parse<T extends Route<any>>(
  queryString: string
): Partial<QueryParamsFromRoute<T>> {
  return qsParse(queryString) as Partial<QueryParamsFromRoute<T>>;
}
