import storage from 'good-storage'

function insertArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare)
    if (index > -1) {
        return
    }
    if (index > 0) {
        arr.splice(val, 1)
    }
    arr.unshift(val)
    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}
function deleteFromArray(arr, compare) {
    const index = arr.findIndex(compare)
    if (index > -1) {
      arr.splice(index, 1)
    }
  }

export function save(item, key, compare, maxLen) {
    const items = storage.get(key, [])
    insertArray(items, item, compare, maxLen)
    // 保存在本地
    storage.set(key, items)
    return items
}
export function remove(key, compare) {
    const items = storage.get(key, [])
    deleteFromArray(items, compare)
    storage.set(key, items)
    return items
}

export function load(key) {
    return storage.get(key, [])
}
export function clear(key) {
    storage.remove(key)
    return []
}
export function saveAll(items, key) {
      storage.set(key, items)
  }