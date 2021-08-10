[react-route-type](README.md) / Modules

# react-route-type

## Table of contents

### Interfaces

- [Route](interfaces/Route.md)

### Type aliases

- [GetParam](modules.md#getparam)

### Functions

- [route](modules.md#route)

## Type aliases

### GetParam

Ƭ **GetParam**<`T`\>: `T` extends \`:${infer A}\` ? `A` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Defined in

[interfaces/types.ts:46](https://github.com/hosseinmd/react-route-type/blob/6c02ce4/src/interfaces/types.ts#L46)

## Functions

### route

▸ **route**<`T`, `Q`\>(`pathParts`, `queryParams?`): [`Route`](interfaces/Route.md)<`T`, `Q`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |
| `Q` | extends `string` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `pathParts` | `T`[] | `undefined` |
| `queryParams` | `Q`[] | `[]` |

#### Returns

[`Route`](interfaces/Route.md)<`T`, `Q`\>

#### Defined in

[route.ts:26](https://github.com/hosseinmd/react-route-type/blob/6c02ce4/src/route.ts#L26)
