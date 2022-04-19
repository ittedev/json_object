import type { JSONObject } from './json_object.ts'
import type { JSONArray } from './json_array.ts'

/**
 * Deep assign of JSONObject or JSONArray.
 *
 * @param {(JSONObject|JSONArray)} dst - a target object
 * @param {(JSONObject|JSONArray)} src - a source object
 * @param {boolean} [existOnly=false] - If set to true, only the properties of src are assigned.
 * @return {(JSONObject|JSONArray)} Same instance as dst
 */
export function assign(dst: JSONObject, src: JSONObject): JSONObject
export function assign(dst: JSONArray, src: JSONArray): JSONArray
export function assign(dst: JSONObject, src: JSONObject, existOnly: boolean): JSONObject
export function assign(dst: JSONArray, src: JSONArray, existOnly: boolean): JSONArray
export function assign(
  dst: JSONObject | JSONArray,
  src: JSONObject | JSONArray,
  existOnly = false
): JSONObject | JSONArray
{
  const base = existOnly ? dst : src
  if (Array.isArray(base)) {
    base.forEach((value, index) =>
      (dst as JSONArray)[index] =
        typeof value === 'object' && value !== null ?
          Array.isArray(value) ? assign([], value, existOnly) : assign({}, value, existOnly) :
          value
    )
  } else {
    Object.keys(base).forEach(key => {
      const value = base[key];
      (dst as JSONObject)[key] =
        typeof value === 'object' && value !== null ?
        Array.isArray(value) ? assign([], value, existOnly) : assign({}, value, existOnly) :
          value
    })
  }
  return dst
}