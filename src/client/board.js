import React from 'react';
require('./board.less');
import CompLayer from './comp_layer';
import LineLayer from './line_layer';
import PubSub from 'pubsub-js';
import Draggable from 'react-draggable'; 
var $=require('jquery');

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
        a2:{id:"a2",w:8,h:3,x:300,y:100,pins:[[4,0],[2,1],[2,2]]},
        a3:{id:"a3",w:16,h:16,x:200,y:200,pins:[[0,0],[2,2],[9,9],[14,0]]}

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
    this.state={layout,//布局：包含元件的位置大小和线的位置
      connecting:false,//是否处于连线状态中，即已经选中起始点，在找终点
      from:null,//连线中的起始点，表达为{comp:id,pin:[x,y]}
      to:null};//连线中的鼠标位置，表达为{x,y}
  }
//CompLayer要在LineLayer之上(后)，pin才可以被点中。否则line会盖住pin
//      <LineLayer layout={layout}/>
      // <CompLayer layout={layout}/>
  render() {
    const {layout,connecting,from,to}=this.state;
    return (
      <div ref="board" className="board" onMouseMove={this.onMouseMove.bind(this)}>
       <LineLayer layout={layout} connecting={connecting} from={from} to={to}/>
       <CompLayer layout={layout}/>
      </div>
    );
  }

  onMouseMove(e){
    // var x=e.clientX,y=e.clientY;
    // console.log("move:",x,y);
    var board=this.refs.board;
    var x=e.clientX-$(board).offset().left,
    y=e.clientY-$(board).offset().top;
    const me=this;
    const {connecting}=me.state;
    if(connecting){
      //在连线状态下，画出临时的连接线
      me.setState({to:{x,y}});
    }
  }

  componentDidMount() {
    const me=this;
    this.tokenPin=PubSub.subscribe('pin',(msg,data)=>{
      console.log('got pin click',data);//{comp:id,pos:[x,y]}
      const {connecting}=me.state;
      if(!connecting){
        var from=data;
        to=null;
        me.setState({connecting:true,from,to});
      }else{
        const {from}=me.state;
        var to=data;
        console.log()
        var id="l"+Date.now();
        var line={id,from,to};
        me.state.layout.lines[id]=line;
        me.state.connecting=false;
        me.setState(me.state);
      }
    });
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
