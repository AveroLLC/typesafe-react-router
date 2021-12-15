[react-route-type](README.md) / Exports

# react-route-type

## Table of contents

### Interfaces

- [Options](interfaces/Options.md)
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

[interfaces/types.ts:66](https://github.com/hosseinmd/react-route-type/blob/3deaec5/src/interfaces/types.ts#L66)

## Functions

### route

▸ `Const` **route**<`T`, `Q`\>(`path`, `option?`): [`Route`](interfaces/Route.md)<`T`, `Q`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |
| `Q` | extends `QueryParamDefault` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `T` \| `T`[] |
| `option?` | [`Options`](interfaces/Options.md)<`Q`\> |

#### Returns

[`Route`](interfaces/Route.md)<`T`, `Q`\>

#### Defined in

[route.ts:155](https://github.com/hosseinmd/react-route-type/blob/3deaec5/src/route.ts#L155)
