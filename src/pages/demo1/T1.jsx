import React, { Component } from 'react';
import T1_css from'./T1.css';

//var img_str = require("html-loader!./demo1.htm");
//let img_str = require("./demo1.htm")
import img_str from "./demo1.htm";
import old_street from './_old_street.jpg'
console.log("LOG: ~ file: T1.jsx ~ line 8 ~ old_street", old_street)
//console.log("LOG: ~ file: T1.jsx ~ line 5 ~ img_str", img_str)



function appendImg(){
    /*
    var img = document.createElement('img');
    img.src = img_url;
    img.className = "tune_svg_width";
    return img;
    */
    return img_str;
}
//let React = require('react')
class T1 extends React.Component {
    onLog111=() => {
        console.log(1111111)
    }
    render() {
        let imgPath = `../../assets/`
        return (
            <div>
                <div>PPP2229</div>
                <img src={`${imgPath}${old_street}`} alt=""/>
                <div>
                    <button id="btnLog111" data-testid="btnLog111" onClick={this.onLog111}>log 111111</button>
                </div>
                {/* <img src={old_street} alt=""/> */}
            </div>
        )
    }
}
//module.exports = <T1></T1>
export default <T1></T1>