[react-route-type](../README.md) / [Modules](../modules.md) / Route

# Interface: Route<Parts, QueryParams\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Parts` | extends `string` |
| `QueryParams` | extends `string` |

## Table of contents

### Methods

- [create](Route.md#create)
- [route](Route.md#route)
- [template](Route.md#template)
- [useParams](Route.md#useparams)
- [useQueryParams](Route.md#usequeryparams)

## Methods

### create

▸ **create**(`params?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `Record`<[`GetParam`](../modules.md#getparam)<`Parts`\>, `string`\> & `Partial`<`Object`\> |

#### Returns

`string`

#### Defined in

[interfaces/types.ts:17](https://github.com/hosseinmd/react-route-type/blob/6c02ce4/src/interfaces/types.ts#L17)

___

### route

▸ **route**<`Parts1`, `QueryParams1`\>(`paths`, `params?`): [`Route`](Route.md)<`Parts` \| `Parts1`, `QueryParams` \| `QueryParams1`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Parts1` | extends `string` |
| `QueryParams1` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `paths` | `Parts1`[] |
| `params?` | `QueryParams1`[] |

#### Returns

[`Route`](Route.md)<`Parts` \| `Parts1`, `QueryParams` \| `QueryParams1`\>

#### Defined in

[interfaces/types.ts:22](https://github.com/hosseinmd/react-route-type/blob/6c02ce4/src/interfaces/types.ts#L22)

___

### template

▸ **template**(): `string`

#### Returns

`string`

#### Defined in

[interfaces/types.ts:15](https://github.com/hosseinmd/react-route-type/blob/6c02ce4/src/interfaces/types.ts#L15)

___

### useParams

▸ **useParams**(): `Record`<[`GetParam`](../modules.md#getparam)<`Parts`\>, `string`\>

#### Returns

`Record`<[`GetParam`](../modules.md#getparam)<`Parts`\>, `string`\>

#### Defined in

[interfaces/types.ts:33](https://github.com/hosseinmd/react-route-type/blob/6c02ce4/src/interfaces/types.ts#L33)

___

### useQueryParams

▸ **useQueryParams**(): `Partial`<`Record`<`QueryParams`, `string`\>\>

#### Returns

`Partial`<`Record`<`QueryParams`, `string`\>\>

#### Defined in

[interfaces/types.ts:31](https://github.com/hosseinmd/react-route-type/blob/6c02ce4/src/interfaces/types.ts#L31)
