import type { JSONObject } from './json_object.ts'
import type { JSONArray } from './json_array.ts'
import { assign } from './assign.ts'

/**
 * Deep clone of JSONObject or JSONArray.
 *
 * @param {(JSONObject|JSONArray)} obj - a source object
 * @return {(JSONObject|JSONArray)} a clone of the source object
 */
export function clone(
  obj: JSONObject | JSONArray
) {
  return Array.isArray(obj) ? assign([], obj) : assign({}, obj)
}