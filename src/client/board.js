import React from 'react';
require('./board.less');
import CompLayer from './comp_layer';
import LineLayer from './line_layer';
import PubSub from 'pubsub-js';
import Draggable from 'react-draggable'; 

function getDefaultLayout(){
  return {
      comps:{},
      lines:{}
    };
}

function getMockLayout(){
  return {
      comps:{
        a1:{id:"a1",w:10,h:5,x:100,y:200,pins:[[3,0],[4,0],[5,0],[3,4],[4,4],[5,4]]},
        a2:{id:"a2",w:8,h:3,x:300,y:100,pins:[[4,0],[2,1],[2,2]]}
      },
      lines:{
        l1:{id:"l1",from:{comp:"a1",pin:[3,0]},to:{comp:"a2",pin:[2,2]}},
        l2:{id:"l2",from:{comp:"a1",pin:[4,4]},to:{comp:"a2",pin:[4,0]}}
      }
    };
}
export default class board extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    const layout=props.layout||getMockLayout();
    this.state={layout};
  }
//CompLayer要在LineLayer之上(后)，pin才可以被点中。否则line会盖住pin
//      <LineLayer layout={layout}/>
      // <CompLayer layout={layout}/>
  render() {
    const {layout}=this.state;
    return (
      <div className="board" onMouseMove={this.onMouseMove.bind(this)}>
       <LineLayer layout={layout}/>
       <CompLayer layout={layout}/>
      </div>
    );
  }

  onMouseMove(e){
    var x=e.clientX,y=e.clientY;
    // console.log("move:",x,y);
  }

  componentDidMount() {
    const me=this;
    this.tokenPin=PubSub.subscribe('pin',(msg,data)=>{
      console.log('got pin click',data);
    })
    this.tokenDrag=PubSub.subscribe('drag',(msg,data)=>{
      console.log('got drag',data);
      var comps=me.state.layout.comps;
      var comp=comps[data.id];
      comps[data.id]=Object.assign(comp,data);
      me.setState(me.state);
    });
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.tokenPin);
    PubSub.unsubscribe(this.tokenDrag);
  }
}
