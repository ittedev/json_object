import type { JSONObject } from './json_object.ts'
import type { JSONArray } from './json_array.ts'
import { assert } from 'https://deno.land/std@0.135.0/testing/asserts.ts'
import { assign } from './assign.ts'

Deno.test('assign(): existOnly is false', () => {
  const src: JSONObject = {
      key1: 'val1',
      key2: 20,
      key3: false,
      key4: [40],
      key5: [40, 50],
      key6: {
        key7: null
      },
  }
  const dst: JSONObject = {
    key3: true,
    key5: [40],
  }
  assign(dst, src)

  assert(dst.key1 === src.key1)
  assert(dst.key2 === src.key2)
  assert(dst.key3 === src.key3)
  assert((dst.key4 as JSONArray)[0] === (src.key4 as JSONArray)[0])
  assert((dst.key5 as JSONArray)[1] === (src.key5 as JSONArray)[1])
  assert((dst.key6 as JSONObject).key7 === (src.key6 as JSONObject).key7)
  assert(dst.key4 !== src.key4)
  assert(dst.key5 !== src.key5)
  assert(dst.key6 !== src.key6)
})

Deno.test('assign(): existOnly is true', () => {
  const src: JSONObject = {
      key1: 'val1',
      key2: 20,
      key3: false,
      key4: [40],
      key5: [40, 50],
      key6: {
        key7: null
      },
  }
  const dst: JSONObject = {
    key3: true,
    key5: [40],
    key6: {},
  }
  assign(dst, src, true)

  assert(dst.key1 === undefined)
  assert(dst.key2 === undefined)
  assert(dst.key3 === src.key3)
  assert(dst.key4 === undefined)
  assert((dst.key5 as JSONArray)[1] === (src.key5 as JSONArray)[1])
  assert((dst.key6 as JSONObject).key7 === (src.key6 as JSONObject).key7)
  assert(dst.key5 !== src.key5)
  assert(dst.key6 !== src.key6)
})

Deno.test('assign(): obj is array and existOnly is false', () => {
  const src: JSONArray = [
    'val1',
    {
      key2: 20
    },
    [40],
  ]
  const dst: JSONArray = [
    'val1',
  ]
  assign(dst, src)

  assert(dst[0] === src[0])
  assert((dst[1] as JSONObject).key2 === (src[1] as JSONObject).key2)
  assert((dst[2] as JSONArray)[0] === (src[2] as JSONArray)[0])
  assert(dst[1] !== src[1])
  assert(dst[2] !== src[2])
})

Deno.test('assign(): obj is array and existOnly is true', () => {
  const src: JSONArray = [
    'val1',
    {
      key2: 20,
      key3: 30
    },
    [40, 50],
    'val6',
  ]
  const dst: JSONArray = [
    '',
    {
      key2: 0
    },
    [0],
  ]
  assign(dst, src, true)

  assert(dst[0] === src[0])
  assert((dst[1] as JSONObject).key2 === (src[1] as JSONObject).key2)
  assert((dst[1] as JSONObject).key3 === (src[1] as JSONObject).key3)
  assert((dst[2] as JSONArray)[0] === (src[2] as JSONArray)[0])
  assert((dst[2] as JSONArray)[1] === (src[2] as JSONArray)[1])
  assert(dst[3] === undefined)
  assert(dst[2] !== src[2])
  assert(dst[3] !== src[3])
})
