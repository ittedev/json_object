import { JSONValue } from './json_value.ts'
import { JSONObject } from './json_object.ts'
import { JSONArray } from './json_array.ts'

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
