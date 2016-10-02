/**
 * 画线组件。根据起点终点绘制连线
 * 根据idx自动赋予颜色
 */
import React from 'react';
import colors from './category10';
console.log("colors",colors);

function getPathStr(x1,y1,x2,y2){
  return "M"+x1+","+y1 +" "+"C"+x2+","+y1 +" "+x1+","+y2 +" "+x2+","+y2;
}
export default class Line extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {from,to,id}=this.props.data;
    var pstr=getPathStr(from.x,from.y,to.x,to.y);
    // var colorIdx=((from.x+from.y+to.x+to.y)/10%10);
    const {idx}=this.props;
    var color=colors[idx];
    return (
     <path id={id} d={pstr} style={{stroke: color}} onClick={()=>{
      console.log("line:",id)
     }}/>
    );
  }
}
