import { route } from '../../src/route';
import { param } from '../../src/param';
import { ParamsFromRoute, Indices } from '../../src/index';

const r = route('view', param('id'), param('anotherId'));

type test = ParamsFromRoute<typeof r>[Indices<ParamsFromRoute<typeof r>>]; // $ExpectType "id" | "anotherId"
