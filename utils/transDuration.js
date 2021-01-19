export default function transDuration (time) {
  const minute = parseInt(time / 60)
  const second = time % 60
  return minute > 0 ? `${minute}分${second}秒` : second + '秒'
}