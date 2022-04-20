import type { JSONObject } from './json_object.ts'
import type { JSONArray } from './json_array.ts'
import { assert } from 'https://deno.land/std@0.135.0/testing/asserts.ts'
import { clone } from './clone.ts'

Deno.test('clone(): value is JSONValue', () => {
  assert(clone('val1') === 'val1')
  assert(clone(10) === 10)
  assert(clone(true) === true)
  assert(clone(null) === null)
})

Deno.test('clone(): value is JSONObject', () => {
  const original: JSONObject = {
      key1: 'val1',
      key2: [20],
      key3: {
        key4: null
      },
  }

  const cloned = clone(original) as JSONObject
  assert(cloned.key1 === original.key1)
  assert((cloned.key2 as JSONArray)[0] === (original.key2 as JSONArray)[0])
  assert((cloned.key3 as JSONObject).key4 === (original.key3 as JSONObject).key4)
  assert(cloned !== original)
  assert(cloned.key2 !== original.key2)
  assert(cloned.key3 !== original.key3)
})
