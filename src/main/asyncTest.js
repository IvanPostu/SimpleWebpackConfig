async function start() {
  return await Promise.resolve('async is working')
}

start().then(console.log)

class ZZ {
  static id = 'static field working'
}

console.log(ZZ.id)