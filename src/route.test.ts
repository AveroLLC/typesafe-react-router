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

import { route } from './route';
import { param } from './param';

enum RouteNames {
  HOME = 'HOME',
  VIEW = 'VIEW',
  VIEW_DETAILS = 'VIEW_DETAILS',
  VIEW_MORE_DETAILS = 'VIEW_MORE_DETAILS',
  ONLY_PARAM = 'ONLY_PARAM',
  WITH_QUERY = 'WITH_QUERY',
  EMPTY_QUERY = 'EMPTY_QUERY',
  MULTI_CALL_QUERY = 'MULTI_CALL_QUERY',
  MULTI_QUERY = 'MULTI_QUERY',
}

const Routes = {
  [RouteNames.HOME]: route('home'),
  [RouteNames.VIEW]: route('view'),
  [RouteNames.VIEW_DETAILS]: route('view', param('id')),
  [RouteNames.VIEW_MORE_DETAILS]: route('view', param('id'), 'more', param('otherId')),
  [RouteNames.ONLY_PARAM]: route(param('param')),
  [RouteNames.WITH_QUERY]: route(param('id')).withQueryParams('dateCreated'),
  [RouteNames.EMPTY_QUERY]: route(param('id')).withQueryParams(),
  [RouteNames.MULTI_CALL_QUERY]: route(param('id'))
    .withQueryParams('dateCreated')
    .withQueryParams('dateUpdated'),
  [RouteNames.MULTI_QUERY]: route(param('id')).withQueryParams(
    'dateCreated',
    'dateUpdated'
  ),
};

const expectedTemplate = {
  [RouteNames.HOME]: '/home',
  [RouteNames.VIEW]: '/view',
  [RouteNames.VIEW_DETAILS]: '/view/:id',
  [RouteNames.VIEW_MORE_DETAILS]: '/view/:id/more/:otherId',
  [RouteNames.ONLY_PARAM]: '/:param',
  [RouteNames.WITH_QUERY]: '/:id',
  [RouteNames.EMPTY_QUERY]: '/:id',
  [RouteNames.MULTI_CALL_QUERY]: '/:id',
  [RouteNames.MULTI_QUERY]: '/:id',
};

describe('Route', () => {
  test('Template', () => {
    Object.keys(Routes).forEach(k => {
      expect(Routes[k].template()).toEqual(expectedTemplate[k]);
    });
  });
  test('Create', () => {
    expect(Routes[RouteNames.HOME].create({})).toBe('/home');

    expect(Routes[RouteNames.VIEW].create({})).toBe('/view');

    expect(Routes[RouteNames.VIEW_DETAILS].create({ id: '3' })).toBe('/view/3');

    expect(Routes[RouteNames.VIEW_MORE_DETAILS].create({ id: '3', otherId: '4' })).toBe(
      '/view/3/more/4'
    );

    expect(Routes[RouteNames.ONLY_PARAM].create({ param: '1' })).toBe('/1');

    expect(
      Routes[RouteNames.WITH_QUERY].create({
        id: '1',
        query: {
          dateCreated: '1/1/2018',
        },
      })
    ).toBe('/1?dateCreated=1/1/2018');

    expect(
      Routes[RouteNames.EMPTY_QUERY].create({
        id: '1',
      })
    ).toBe('/1');

    expect(
      Routes[RouteNames.EMPTY_QUERY].create({
        id: '1',
        query: {},
      })
    ).toBe('/1');

    expect(
      Routes[RouteNames.MULTI_CALL_QUERY].create({
        id: '1',
        query: {
          dateCreated: '1/1/2018',
          dateUpdated: '2/1/2018',
        },
      })
    ).toBe('/1?dateCreated=1/1/2018&dateUpdated=2/1/2018');

    expect(
      Routes[RouteNames.MULTI_QUERY].create({
        id: '1',
        query: {
          dateCreated: '1/1/2018',
          dateUpdated: '2/1/2018',
        },
      })
    ).toBe('/1?dateCreated=1/1/2018&dateUpdated=2/1/2018');

    expect(
      Routes[RouteNames.MULTI_QUERY].create({
        id: '1',
      })
    ).toBe('/1');
  });
});
