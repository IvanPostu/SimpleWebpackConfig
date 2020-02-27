// import { app } from '@App/App';
import './global.css';
import './less.less';
import './scss.scss';
// import testjson from '../testfiles/test.json';
// import testxml from '../testfiles/test.xml'
// import img from '../testfiles/beach-sea-coast-water-sand-rock-58319-pxhere.com.jpg';
import './asyncTest'
import test from './ts.ts'
import React from 'react'
import { render } from 'react-dom'

// document.addEventListener('click', function () {
//   window.confirm('A you ready???')
// })

// console.log('JSON:', testjson);
// console.log('XML:', testxml);

// app(1)
test()

const App = () => (
  <div>
    Hey !!!
  </div>
)

render(<App />, document.getElementById('root'))

import('lodash').then(_ => {
  console.log('Lodash: ', _.random(0, 32, true))
})


