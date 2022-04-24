import type { JSONObject } from './json_object.ts'
import type { JSONArray } from './json_array.ts'
import { clone } from './clone.ts'

/**
 * Deep assign of JSONObject or JSONArray.
 *
 * @param {(JSONObject|JSONArray)} dst - The target object
 * @param {(JSONObject|JSONArray)} src - The source object
 * @param {boolean} [existOnly=false] - If set to true, only the properties of dst are assigned. This paramater is not recursive. Then if value is JSONObject or JSONArray, it is deep clone.
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
    base.forEach((_v, index) => {
      (dst as JSONArray)[index] = clone((src as JSONArray)[index])
    })
  } else {
    Object.keys(base).forEach(key => {
      (dst as JSONObject)[key] = clone((src as JSONObject)[key])
    })
  }
  return dst
}
