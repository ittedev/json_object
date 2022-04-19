import type { JSONObject } from './json_object.ts'
import type { JSONArray } from './json_array.ts'
import { assign } from './assign.ts'

export function clone(
  obj: JSONObject | JSONArray
) {
  return Array.isArray(obj) ? assign([], obj) : assign({}, obj)
}