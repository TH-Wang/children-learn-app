// 对uni-app的请求api进行封装

class Request {
  // 服务器地址
  baseURL = "http://www.tsdxedu.com/api/v2"
  // 请求头
  header = {
    'Content-Type': 'application/json'
  }

  /** 自定义请求
   * 
   * @param {Object} config 请求的自定义配置，完全与 uni.request 相同
   * 
   * @returns {Proimse Object} 返回Promise对象
   */
  request (config) {
    // 调用请求拦截器
    const reqConfig = this.requestInterceptor(config)
    if (reqConfig === false) {
      console.warn(`请求被拦截：POST ${url}`)
      return
    }
    // 发送请求
    return new Proimse((resolve, reject) => {
      uni.request({
        ...reqConfig,
        success (res) {
          // 响应拦截器
          const resultRes = this.responseInterceptor(res)
          resolve(resultRes)
        },
        fail (err) { reject(err) }
      })
    })
  }

  /** POST请求
   * 
   * @param {String} url 接口路径
   * @param {Object} data 参数
   * @param {Object} parmas [可选] query参数
   * 
   * @returns {Proimse Object} 返回Promise对象
   */
  post (url, data, parmas) {
    const _this_ = this

    // 请求配置
    const config = {
      url: _this_.baseURL + url,
      method: 'POST',
      header: _this_.header,
      data,
      params
    }

    // 调用请求拦截器
    const reqConfig = this.requestInterceptor(config)
    if (reqConfig === false) {
      console.warn(`请求被拦截：POST ${url}`)
      return
    }

    // 发送请求
    return new Promise((resolve, reject) => {
      uni.request({
        ...reqConfig,
        success (res) {
          // 响应拦截器
          const resultRes = this.responseInterceptor(res)
          resolve(resultRes)
        },
        fail (err) { reject(err) }
      })
    })
  }
  
  /** GET请求
   * 
   * @param {String} url 接口地址
   * @param {Object} params 请求参数，会自动将该对象转换为query string
   * 
   * @returns {Promise} 返回Promise对象 
   */
  get (url, params) {
    const _this_ = this

    // 请求配置
    const config = {
      url: _this_.baseURL + url,
      method: 'GET',
      header: _this_.header,
      data: params
    }

    // 调用请求拦截器
    const result = this.requestInterceptor(config)
    if (result === false) {
      console.warn(`请求被拦截：GET ${url}`)
      return
    }

    // 发送请求
    return new Promise((resolve, reject) => {
      uni.request({
        ...config,
        success (res) {
          // 响应拦截器
          const resultRes = this.responseInterceptor(res)
          resolve(resultRes)
        },
        fail (err) { reject(err) }
      })
    })
  }

  /** 请求拦截器
   * 
   * @param {Object} config 请求配置
   * 
   * @returns {Boolean, Object} 返回false，则终止请求，返回config则继续发送请求
   */
  requestInterceptor (config) {
    // 如果终止请求
    // return false
    uni.showToast({message: '服务器正在开小差，请稍后重试'})
    return false

    // 正常进行
    // return config
  }

  /** 响应拦截器
   * 
   * @param {Object} res 返回数据
   * 
   * @returns {Object} 对原本返回的数据进行处理后的数据
   */
  responseInterceptor (res) {
    // 对返回的数据做点什么
    return res
  }
}

export default new Request()