import type { JSONObject } from './json_object.ts'
import { assert } from 'https://deno.land/std@0.135.0/testing/asserts.ts'
import { equal } from './equal.ts'

Deno.test('equal(): Truthy', () => {
  const obj = {}
  const src: JSONObject = {
    key1: 'val1',
    key2: 20,
    key3: false,
    key4: [40],
    key5: obj,
    key6: {
      key7: null
    },
  }
  const dst: JSONObject = {
    key1: 'val1',
    key2: 20,
    key3: false,
    key4: [40],
    key5: obj,
    key6: {
      key7: null
    },
  }
  assert(equal(src, dst))
})

Deno.test('equal(): Falsy string', () => {
  const src: JSONObject = {
    key1: 'val1'
  }
  const dst: JSONObject = {
    key1: 'val2'
  }
  assert(!equal(src, dst))
})

Deno.test('equal(): Falsy number', () => {
  const src: JSONObject = {
    key1: 10,
  }
  const dst: JSONObject = {
    key1: 20,
  }
  assert(!equal(src, dst))
})

Deno.test('equal(): Falsy boolean', () => {
  const src: JSONObject = {
    key3: false,
  }
  const dst: JSONObject = {
    key3: true,
  }
  assert(!equal(src, dst))
})

Deno.test('equal(): Falsy array item', () => {
  const src: JSONObject = {
      key1: [10],
  }
  const dst: JSONObject = {
    key1: [20],
  }
  assert(!equal(src, dst))
})

Deno.test('equal(): Falsy array length', () => {
  const src: JSONObject = {
      key1: [10],
  }
  const dst: JSONObject = {
    key1: [10, 20],
  }
  assert(!equal(src, dst))
})

Deno.test('equal(): Falsy object item', () => {
  const src: JSONObject = {
    key1: {
      key2: 20
    },
  }
  const dst: JSONObject = {
    key1: {
      key2: 30
    },
  }
  assert(!equal(src, dst))
})

Deno.test('equal(): Falsy object key name', () => {
  const src: JSONObject = {
    key1: {
      key2: 20
    },
  }
  const dst: JSONObject = {
    key1: {
      key3: 20
    },
  }
  assert(!equal(src, dst))
})

Deno.test('equal(): Falsy object key number', () => {
  const src: JSONObject = {
    key1: {
      key2: 20
    },
  }
  const dst: JSONObject = {
    key1: {
      key2: 20,
      key3: 20
    },
  }
  assert(!equal(src, dst))
})

Deno.test('equal(): Falsy null', () => {
  const src: JSONObject = {
    key1: {
      key2: null
    },
  }
  const dst: JSONObject = {
    key1: {
      key2: {}
    },
  }
  assert(!equal(src, dst))
  assert(!equal(dst, src))
})
