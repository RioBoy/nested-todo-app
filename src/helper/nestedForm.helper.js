import _ from 'lodash'

export const updateNestedProperty = (obj, path, value) => {
   const newObj = _.cloneDeep(obj)
   _.set(newObj, path, value)
   return newObj
}
