import { assert } from 'https://deno.land/std@0.135.0/testing/asserts.ts'
import { take } from './take.ts'

Deno.test('take(): path is array', () => {
  const obj = {
    key1: 'val1',
    obj: {
      key2: 'val2',
      obj: {
        key3: 'val3',
      }
    },
    ary: [
      'val4',
      {
        key5: 'val5',
      }
    ]
  }

  assert(take(obj, ['key1']) === 'val1')
  assert(take(obj, ['obj', 'key2']) === 'val2')
  assert(take(obj, ['obj', 'obj', 'key3']) === 'val3')
  assert(take(obj, ['obj', 'obj', 'key4']) === undefined)
  assert(take(obj, ['ary', '0']), 'val4')
  assert(take(obj, ['ary', '1', 'key5']) === 'val5')
  assert(take(obj, ['ary', 1, 'key5']) === 'val5')
  assert(take(obj, ['ary', '2', 'key6']) === undefined)
})

Deno.test('take(): path is string', () => {
  const obj = {
    key1: 'val1',
    obj: {
      key2: 'val2',
      obj: {
        key3: 'val3',
      }
    },
    ary: [
      'val4',
      {
        key5: 'val5',
      }
    ]
  }

  assert(take(obj, 'key1') === 'val1')
  assert(take(obj, 'obj.key2') === 'val2')
  assert(take(obj, 'obj.obj.key3') === 'val3')
  assert(take(obj, 'obj.obj.key4') === undefined)
  assert(take(obj, 'ary.0') === 'val4')
  assert(take(obj, 'ary.1.key5') === 'val5')
  assert(take(obj, 'ary.2.key6') === undefined)
})


Deno.test('take(): obj is array', () => {
  const ary = [
    'val4',
    {
      key5: 'val5',
    }
  ]

  assert(take(ary, ['0']) === 'val4')
  assert(take(ary, ['1', 'key5']) === 'val5')
  assert(take(ary, [1, 'key5']) === 'val5')
  assert(take(ary, ['2', 'key6']) === undefined)
})
