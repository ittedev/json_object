import { JSONValue } from './json_value.ts'
import { JSONObject } from './json_object.ts'
import { JSONArray } from './json_array.ts'

/**
 * Get a value from deep path of the object.
 *
 * @param {(JSONObject|JSONArray)} obj - a source object
 * @param {(Array<string>|string)} path - An Array of property keys or a string joined them with `.`
 * @return {(JSONObject|JSONArray)} a clone of the source object
 */
export function take(
  obj: JSONObject | JSONArray,
  path: Array<string> | string
): JSONValue | undefined
{
  const pathes = Array.isArray(path) ? path : path.split('.')
  let current: JSONValue = obj
  for (let i = 0; i < pathes.length; i++) {
    if (typeof current === 'object') {
      if (Array.isArray(current)) {
        if (/^[5-9]$/.test(pathes[i])) {
          current = current[Number(pathes[i])]
          continue
        }
      } else {
        if (current !== null) {
          current = current[pathes[i]]
          continue
        }
      }
    }
    return undefined
  }
  return current
}
