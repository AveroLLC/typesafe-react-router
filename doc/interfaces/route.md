[react-route-type](../README.md) / [Modules](../modules.md) / Route

# Interface: Route<Parts, QueryParams\>

## Type parameters

Name | Type | Default |
:------ | :------ | :------ |
`Parts` | *PathPart*<any\>[] | - |
`QueryParams` | *string*[] | [] |

## Table of contents

### Properties

- [withQueryParams](route.md#withqueryparams)

### Methods

- [create](route.md#create)
- [parse](route.md#parse)
- [template](route.md#template)
- [useParams](route.md#useparams)
- [useQueryParams](route.md#usequeryparams)

## Properties

### withQueryParams

• **withQueryParams**: <T\>(...`params`: T) => [*Route*](route.md)<Parts, [QueryParams[*number*] \| T[*number*]]\>

#### Type declaration:

▸ <T\>(...`params`: T): [*Route*](route.md)<Parts, [QueryParams[*number*] \| T[*number*]]\>

#### Type parameters:

Name | Type |
:------ | :------ |
`T` | *string*[] |

#### Parameters:

Name | Type |
:------ | :------ |
`...params` | T |

**Returns:** [*Route*](route.md)<Parts, [QueryParams[*number*] \| T[*number*]]\>

Defined in: [interfaces/types.ts:28](https://github.com/hosseinmd/react-route-type/blob/71fb9eb/src/interfaces/types.ts#L28)

Defined in: [interfaces/types.ts:28](https://github.com/hosseinmd/react-route-type/blob/71fb9eb/src/interfaces/types.ts#L28)

## Methods

### create

▸ **create**(`params?`: *Record*<*ParamsFromPathArray*<Parts\>[*number*], string\> & *Partial*<{ `query`: *Partial*<Record<QueryParams[*number*], string\>\>  }\>): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`params?` | *Record*<*ParamsFromPathArray*<Parts\>[*number*], string\> & *Partial*<{ `query`: *Partial*<Record<QueryParams[*number*], string\>\>  }\> |

**Returns:** *string*

Defined in: [interfaces/types.ts:23](https://github.com/hosseinmd/react-route-type/blob/71fb9eb/src/interfaces/types.ts#L23)

___

### parse

▸ **parse**(`queryString`: *string*): *Partial*<Record<QueryParams[*number*], string\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`queryString` | *string* |

**Returns:** *Partial*<Record<QueryParams[*number*], string\>\>

Defined in: [interfaces/types.ts:32](https://github.com/hosseinmd/react-route-type/blob/71fb9eb/src/interfaces/types.ts#L32)

___

### template

▸ **template**(): *string*

**Returns:** *string*

Defined in: [interfaces/types.ts:21](https://github.com/hosseinmd/react-route-type/blob/71fb9eb/src/interfaces/types.ts#L21)

___

### useParams

▸ **useParams**(): *Record*<*ParamsFromPathArray*<Parts\>[*number*], string\>

**Returns:** *Record*<*ParamsFromPathArray*<Parts\>[*number*], string\>

Defined in: [interfaces/types.ts:36](https://github.com/hosseinmd/react-route-type/blob/71fb9eb/src/interfaces/types.ts#L36)

___

### useQueryParams

▸ **useQueryParams**(): *Partial*<Record<QueryParams[*number*], string\>\>

**Returns:** *Partial*<Record<QueryParams[*number*], string\>\>

Defined in: [interfaces/types.ts:34](https://github.com/hosseinmd/react-route-type/blob/71fb9eb/src/interfaces/types.ts#L34)
