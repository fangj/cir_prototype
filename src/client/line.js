import React from 'react';

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
    return (
     <path id={id} d={pstr} onClick={()=>{
      console.log("line:",id)
     }}/>
    );
  }
}
