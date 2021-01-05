import React from 'react'
//import j1 from 'jest'
import Enzyme, { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json';

import EnzymeAdapter from 'enzyme-adapter-react-16';
import T1 from './T1.jsx'
import a from './a'
import register from 'ignore-styles';
import { describe, expect, test } from '@jest/globals'
//let j2 = require('jest')

// import { expect } from 'chai';
register(['.css', '.sass', '.scss']);

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = new JSDOM('');
const { document } = (new JSDOM(``)).window;

/**@type {any} */
let globalAny = global;
globalAny.document = document;
globalAny.window = window;

require('@babel/polyfill')

Enzyme.configure({
    adapter: new EnzymeAdapter()
});

class X1 extends React.Component {
    render() {
        return (
            <div>
                AAA
            </div>
        )
    }
}
// /**
//  * Factory function to create a ShallowWrapper for App component.
//  * @function setup
//  * @param {object} props - Component props specific to this setup.
//  * @param {object} state - Initial state for setup.
//  * @returns {ShallowWrapper}
//  */
// const setup = ( props = {}, state = null) => {
//     const wrapper = shallow(<App {...props} />);
//     if (state) wrapper.setState(state);
//     return wrapper;
// };

describe('T1.jsx.test.js', () => {

    it('t1 demo.....2', () => {
        //let aa = <T1></T1>
        const component = mount(T1)
        let wrapper = shallow(T1)

        const wrapper2 = render(
            T1
        );
        expect(wrapper2).toMatchSnapshot();
        //component.find('#btnLog111').simulate('click');
        //expect(wrapper.find('#btnLog111')).toHaveLength(3);
        wrapper.find('#btnLog111').simulate('click');
        //console.log(1111,wrapper.find('div'))
        console.log(2222, toJson(wrapper))

        // component.find('img')
        // console.log(a)
        // console.log(2222222)

        // expect(a).toBe(5)
    })

    it.only('t1 demo', () => {
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