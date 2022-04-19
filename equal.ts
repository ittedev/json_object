import { JSONValue } from './json_value.ts'
import { JSONObject } from './json_object.ts'
import { JSONArray } from './json_array.ts'

export function equal(a: JSONValue, b: JSONValue): boolean {
  if (a === b) {
    return true
  }

  if (typeof a !== typeof b) {
    return false
  }

  if (a === null && b !== null || a !== null && b === null) {
    return false
  }

  if (Array.isArray(a)) {
    const len = a.length
    if (len !== (b as Array<unknown>).length) {
      return false
    }
    for (let i = 0; i < len; i++) {
      if (!equal(a[i], (b as JSONArray)[i])) {
        return false
      }
    }
    return true
  }

  if (typeof a === 'object') {
    const keys = Object.keys(a as JSONObject)
    const len = keys.length
    if (len != Object.keys(b as JSONObject).length) {
      return false
    }
    for (let i = 0; i < len; i++) {
      const key = keys[i]
      if (!(
        key in (b as JSONObject) &&
        equal((a as JSONObject)[key], (b as JSONObject)[key])
      )) {
        return false
      }
    }
    return true
  }

  return false
}
