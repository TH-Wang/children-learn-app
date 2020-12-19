let $uni = {}

const apiList = ['showModal', 'getSystemInfo']

for (let i = 0; i < apiList.length; i++) {
  const api = apiList[i];
  $uni[api] = function (params) {
    return new Promise((resolve, reject) => {
      uni[api]({
        ...params,
        success (res) { resolve(res) },
        fail (err) { reject(err) }
      })
    })
  }
}

export default $uni