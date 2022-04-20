import { JSONValue } from './json_value.ts'
import type { JSONObject } from './json_object.ts'

/**
 * Deep clone of JSONValue.
 *
 * @param {(JSONValue)} value - The original value
 * @return {(JSONValue)} The cloned value
 */
export function clone(value: JSONValue): JSONValue
{
  return typeof value === 'object' && value !== null ?
    Array.isArray(value) ?
      value.map(clone) :
      Object.keys(value).reduce<JSONObject>((obj, key) => {
        obj[key] = clone(value[key])
        return obj
      }, {}) :
    value
}
