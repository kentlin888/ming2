import * as React from "react";

export interface ViewOrdersItemProps {
    // foo ? : any;
    data ?:[any];
    //Requireable<any[]>
}
// interface PropsType {
//     children: JSX.Element;
//     name: string;
//     data:Array;
// }
declare class ViewOrdersItem extends React.PureComponent<ViewOrdersItemProps, any> {}
export default ViewOrdersItem;
// export default class ViewOrdersItem < T = any > extends React.PureComponent < T > {
//     // static propTypes={
//     //     data:Array
//     // }
//     foo(): any;
//     bar(): any;
//     // render() {
//     //     return (
//     //       <h2>
//     //         {this.props.children}
//     //       </h2>
//     //     )
//     //   }
// }