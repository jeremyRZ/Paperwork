const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});
//Value and proof setting
const utils = require('./utils')
const log = utils.logger('val & proof')
const vrfjs = require('../lib')

const {publicKey, privateKey} = utils.pair
const m1 = Buffer.from('"sender_name_auxiliary": "c1024"')
const r1 = vrfjs.ecvrf.vrf(publicKey, privateKey, m1)
//sortition setting
const Big = require('big.js')
const constant = require('./const.json')
const seed = Buffer.from('sortition')
const role = Buffer.from('test')
const w = new Big(100)
const W = new Big(1000)
const tau = new Big(600)

var str =   {
    "sender_name_auxiliary": "c1024"
  }
var inputJSON = JSON.stringify(str);

let publicDer = key.exportKey("pkcs8-public-pem");  //公钥
let privateDer = key.exportKey("pkcs1-private-pem");//私钥

console.log('公钥',publicDer)
console.log('================')
console.log('私钥',privateDer)

//generate Value and proof
log(`value of "${m1}":`)
log(r1.value.toString('hex'))
log(`proof of "${m1}":`)
log(r1.proof.toString('hex'))

//finish the VRF info box

for (let i = 0; i < 10; i++) {
  const [value, proof, j] = vrfjs.sortition.sortition(privateDer, publicDer, seed, tau, role, w, W)
  log(`-------------- test ${i} --------------`)
  log(' value:', value.toString('hex'))
  log('     j:', j.toString())
  log('result:', j.gt(0))
}
