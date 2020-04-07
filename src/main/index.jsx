// import { app } from '@App/App';
import React from 'react';
import { render } from 'react-dom';
// import testjson from '../testfiles/test.json';
// import testxml from '../testfiles/test.xml'
// import img from '../testfiles/beach-sea-coast-water-sand-rock-58319-pxhere.com.jpg';
import './asyncTest';
import './global.css';
import './less.less';
import './scss.scss';
import test from './ts.ts';
import * as util from '@/main/util.js'

// document.addEventListener('click', function () {
//   window.confirm('A you ready???')
// })

// console.log('JSON:', testjson);
// console.log('XML:', testxml);
util.sayGoodbye('ADFADF')
// app(1)
// util.sayHello('aa')




test()

const App = () => (
  <div>
    zHey !!!
  </div>
)

render(<App />, document.getElementById('root'))

import('lodash').then(_ => {
  console.log('Lodash: ', _.random(0, 32, true))
})


