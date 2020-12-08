// 显示模态弹窗
function showModal (params) {
  return new Promise((resolve) => {
    uni.showModal({
      ...params,
      success(res) { resolve(res) }
    })
  })
}

export default {
  showModal
}