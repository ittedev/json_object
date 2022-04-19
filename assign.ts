import type { JSONObject } from './json_object.ts'
import type { JSONArray } from './json_array.ts'

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