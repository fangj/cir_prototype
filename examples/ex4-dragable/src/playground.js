import React from 'react';
import Draggable from 'react-draggable'; 
require('./playground.less');
import PubSub from 'pubsub-js';
    
//<path id="curve" d="M100,250 400,250"/>
export default class playground extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {env}=this.props;
    console.log('env',env);
    const pos_a1=env["a1"]||{x: 0, y: 0};
    var p1=env["p1"]
    const x1=p1[0][0],y1=p1[0][1],x2=p1[1][0],y2=p1[1][1];
    // var pstr="M"+p1[0][0]+","+p1[0][1]+" "+p1[1][0]+","+p1[1][1];
    var pstr="M"+x1+","+y1
    +" "
    +"C"+x2+","+y1
    +" "
    +x1+","+y2
    +" "
    +x2+","+y2;

    console.log(pstr);
    return (
      <div>
      <div className="yuanjian">
        <Draggable
        defaultPosition={pos_a1}
        position={null}
        grid={[25, 25]}
        zIndex={100}
        onStart={(e,position)=>this.handleStart(e,position,"a1")}
        onDrag={(e,position)=>this.handleDrag(e,position,"a1")}
        onStop={(e,position)=>this.handleStop(e,position,"a1")}>
        <div>
          <h3>a1</h3>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
          <div onClick={this.clickA1Pin1.bind(this)}>pin1</div>
          <div onClick={this.clickA1Pin2.bind(this)}>pin2</div>
        </div>
      </Draggable>

        <Draggable
        defaultPosition={pos_a1}
        position={null}
        grid={[25, 25]}
        zIndex={100}

        onStop={(e,position)=>this.handleStop(e,position,"a1")}>
        <div>
          <h3>a2</h3>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
          <div onClick={this.clickA2Pin1.bind(this)}>pin1</div>
          <div onClick={this.clickA2Pin2.bind(this)}>pin2</div>
        </div>
      </Draggable>
      </div>
      <div className="line">
      <svg className="svg-container">

    <path id="curve" d={pstr} onClick={this.clickLine}/>
</svg>
      </div>
      </div>
    );
  }
  clickLine(e){
    console.log('clickLine')
  }
  clickA1Pin1(e){
    console.log('a1pin1',e.clientX,e.clientY);
    const pos=[e.clientX,e.clientY]
    PubSub.publish("line.a1",pos)
  }
  clickA1Pin2(e){
    console.log('a1pin2',e.clientX,e.clientY);
    const pos=[e.clientX,e.clientY]
    PubSub.publish("line.a1",pos)
  }
  clickA2Pin1(e){
    console.log('a2pin1',e.clientX,e.clientY);
    const pos=[e.clientX,e.clientY]
    PubSub.publish("line.a2",pos)
  }
  clickA2Pin2(e){
    console.log('a2pin2',e.clientX,e.clientY);
    const pos=[e.clientX,e.clientY]
    PubSub.publish("line.a2",pos)
  }

  handleStart(){
    // console.log(arguments);
  }
  handleDrag(){
    // console.log(arguments);

  }
  handleStop(e,position,tag){
    const {lastX,lastY}=position;
    console.log(lastX,lastY);
    PubSub.publish("pos."+tag,{x:lastX,y:lastY});
  }

}
