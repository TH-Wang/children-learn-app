const baseUrl = 'https://www.tsdxedu.com'

export default { exchangeCode, MultiLevelShare }

function exchangeCode (data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + '/addons/CodeExchanger/api/v1/exchange',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${uni.getStorageSync('token')}`
      },
      data,
      success (res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

function MultiLevelShare () {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + '/addons/MultiLevelShare/api/v1/user',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${uni.getStorageSync('token')}`
      },
      success (res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}