import React from 'react'
//import j1 from 'jest'
import Enzyme,{shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16';
import T1 from './T1.jsx'
import a from './a'
import register from 'ignore-styles';

//let j2 = require('jest')

// import { expect } from 'chai';
register(['.css', '.sass', '.scss']);

const jsdom =  require('jsdom');

const { JSDOM } = jsdom;
const { window } = new JSDOM('');
const { document } = (new JSDOM(``)).window;

global.document = document;
global.window = window;

require('@babel/polyfill')

Enzyme.configure({
    adapter: new EnzymeAdapter()
  });

class X1 extends React.Component{
    render(){
        return (
            <div>
                AAA
            </div>
        )
    }
}
describe('T1.jsx.test.js',() => {


    it('t1 demo', () => {
        let aa = <X1></X1>
        const component = mount(aa)
        // component.find('img')
        console.log(a)
        console.log(2222222)
        
        expect(a).toBe(5)
    })

})

// describe.each([
//     ['name', true],
//     [1, true],
//     [false, true],
//     [undefined, true],
//     ['no-such-key', false]
// ])('when key = %s', (key, expected) => {
//     it(`should return ${expected}`, () => {
//         expect(has(obj, key)).toBe(expected);
//     });
// });