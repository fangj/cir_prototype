/**
 * 引脚层，10*10像素的圆形，点击后发送引脚信息{comp:"id",pin:[x,y]}到board
 */
import React from 'react';
require('./pin.less');
import PubSub from 'pubsub-js';

export default class pin extends React.Component {
  static propTypes = {
    pos: React.PropTypes.array,
    comp: React.PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {pin,comp}=this.props;
    const unit=10;
    const x=pin[0]*unit,y=pin[1]*unit;
    const style={left:x,top:y};
    return (
      <div className="pin" style={style} onClick={()=>{
        console.log(pin,comp);
        PubSub.publish('pin',{comp,pin});
      }}></div>
    );
  }
}
