export const reloadHeadCount = renderCount => {
  console.log('kd ACTION renderCount:', renderCount)
  return ({
  payload: { renderCount }
})
}