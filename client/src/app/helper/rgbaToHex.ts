export default (rgba: Array<number>) => {
  const c1 = ("0" + rgba[0].toString(16)).slice(-2)
  const c2 = ("0" + rgba[1].toString(16)).slice(-2)
  const c3 = ("0" + rgba[2].toString(16)).slice(-2)

  return `#${c1}${c2}${c3}`
}