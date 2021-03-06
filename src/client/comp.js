/**
 * 组件层，根据layout绘制组件和引脚，组件拖动时向board发消息告知拖动位置
 */
import React from 'react';
require("./comp.less");
import Pin from './pin';
import Draggable from 'react-draggable'; 
import PubSub from 'pubsub-js';

export default class component extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {data}=this.props;
    const {x,y,w,h,pins}=data;
    const unit=10;
    // const style={width:w*unit,height:h*unit,left:x,top:y};//without draggable
    const style={width:w*unit,height:h*unit};
    return (
      <Draggable
        bounds="parent"
        defaultPosition={{x,y}}
        position={null}
        grid={[10, 10]}
        zIndex={100}
        onDrag={this.handleDrag.bind(this)}
        onStop={this.handleDrop.bind(this)}>
      <div className="comp" style={style}>
      {pins.map(pin=><Pin key={pin.join(',')} pin={pin} comp={data.id}/>)}
      </div>
      </Draggable>
    );
  }

  handleDrag(e,position){
    const {x,y}=position;
    PubSub.publish("drag",{id:this.props.data.id,x:x,y:y});
  }

  handleDrop(e,position){
    const {lastX,lastY}=position;
    PubSub.publish("drag",{id:this.props.data.id,x:lastX,y:lastY});
  }
}
