const { union } = require("lodash")

const baseUrl = 'https://www.tsdxedu.com'

export default { exchangeCode }

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