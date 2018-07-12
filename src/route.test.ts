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
}

const Routes = {
  [RouteNames.HOME]: route('home'),
  [RouteNames.VIEW]: route('view'),
  [RouteNames.VIEW_DETAILS]: route('view', param('id')),
  [RouteNames.VIEW_MORE_DETAILS]: route('view', param('id'), 'more', param('otherId')),
  [RouteNames.ONLY_PARAM]: route(param('param')),
};

const expectedTemplate = {
  [RouteNames.HOME]: '/home',
  [RouteNames.VIEW]: '/view',
  [RouteNames.VIEW_DETAILS]: '/view/:id',
  [RouteNames.VIEW_MORE_DETAILS]: '/view/:id/more/:otherId',
  [RouteNames.ONLY_PARAM]: '/:param',
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
  });
});
