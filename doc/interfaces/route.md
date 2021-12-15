[react-route-type](../README.md) / [Exports](../modules.md) / Route

# Interface: Route<Parts, QueryParams\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Parts` | extends `string` |
| `QueryParams` | extends `QueryParamDefault` |

## Table of contents

### Properties

- [create](Route.md#create)

### Methods

- [route](Route.md#route)
- [template](Route.md#template)
- [useMap](Route.md#usemap)
- [useParams](Route.md#useparams)
- [useQueryParams](Route.md#usequeryparams)

## Properties

### create

• **create**: `CreateFun`<`Parts`, `QueryParams`\>

#### Defined in

[interfaces/types.ts:39](https://github.com/hosseinmd/react-route-type/blob/3deaec5/src/interfaces/types.ts#L39)

## Methods

### route

▸ **route**<`Parts1`, `QueryParams1`\>(`arg`, `option?`): [`Route`](Route.md)<`Parts` \| `Parts1`, `QueryParams` & `QueryParams1`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Parts1` | extends `string` |
| `QueryParams1` | extends `QueryParamDefault` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `Parts1` \| `Parts1`[] |
| `option?` | [`Options`](Options.md)<`QueryParams1`\> |

#### Returns

[`Route`](Route.md)<`Parts` \| `Parts1`, `QueryParams` & `QueryParams1`\>

#### Defined in

[interfaces/types.ts:41](https://github.com/hosseinmd/react-route-type/blob/3deaec5/src/interfaces/types.ts#L41)

___

### template

▸ **template**(): `string`

#### Returns

`string`

#### Defined in

[interfaces/types.ts:37](https://github.com/hosseinmd/react-route-type/blob/3deaec5/src/interfaces/types.ts#L37)

___

### useMap

▸ **useMap**(): { `path`: `string` \| `string`[] ; `title?`: `string` ; `create`: () => `string`  }[]

#### Returns

{ `path`: `string` \| `string`[] ; `title?`: `string` ; `create`: () => `string`  }[]

#### Defined in

[interfaces/types.ts:49](https://github.com/hosseinmd/react-route-type/blob/3deaec5/src/interfaces/types.ts#L49)

___

### useParams

▸ **useParams**(): `Params`<[`GetParam`](../modules.md#getparam)<`Parts`\>\>

#### Returns

`Params`<[`GetParam`](../modules.md#getparam)<`Parts`\>\>

#### Defined in

[interfaces/types.ts:48](https://github.com/hosseinmd/react-route-type/blob/3deaec5/src/interfaces/types.ts#L48)

___

### useQueryParams

▸ **useQueryParams**(): `Partial`<`QueryParams`\>

#### Returns

`Partial`<`QueryParams`\>

#### Defined in

[interfaces/types.ts:46](https://github.com/hosseinmd/react-route-type/blob/3deaec5/src/interfaces/types.ts#L46)
