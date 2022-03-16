function jsLoad(url:string) {
  const script = document.createElement('script')
  script.setAttribute('defer', 'true')
  return new Promise(r => {
    script.onload = () => {
      r(true)
      script.remove()
    }
    script.src = url
    document.body.appendChild(script)
  })
}
export default  jsLoad