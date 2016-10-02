/*
1格=10px * 10px  
组件为宽w格，高h格的网格。  
组件内可以有若干个引脚，每个网格内可以有1个,位置用[x,y]表示   
引脚之间可以连线（组件间或组件内）  
拖拽时，组件的位置会自动对齐到最近的网格。  

### Board组件

board代表可以放置和拖拽组件的区域  
接受一个layout属性表示放置其中的元件和线  
例如：  

```js
layout={
      comps:{
        a1:{id:"a1",w:10,h:5,x:100,y:200,pins:[[3,0],[4,0],[5,0],[3,4],[4,4],[5,4]],
        background:"img/me5565.jpg"},
        a2:{id:"a2",w:8,h:3,x:300,y:100,pins:[[4,0],[2,1],[2,2]]},
        a3:{id:"a3",w:16,h:16,x:200,y:200,pins:[[0,0],[2,2],[9,9],[14,0]]}
      },
      lines:{
        l1:{id:"l1",from:{comp:"a1",pin:[3,0]},to:{comp:"a2",pin:[2,2]}},
        l2:{id:"l2",from:{comp:"a1",pin:[4,4]},to:{comp:"a2",pin:[4,0]}}
      }
    }
```

comps中是所有组件，lines中是所有线

```js
a1:{id:"a1",w:10,h:5,x:100,y:200,pins:[[3,0],[4,0],[5,0],[3,4],[4,4],[5,4]],
        background:"img/me5565.jpg"}
```

表示有一个id为a1的组件，宽10格，高5格，左上角位置位于相对于父容器left:100像素，top:200像素的位置。  
有6个引脚，分别位于组件内[第3列,第0行],[第4列,第0行]...  
组件有个背景图片为img/me5565.jpg  


```js
 l1:{id:"l1",from:{comp:"a1",pin:[3,0]},to:{comp:"a2",pin:[2,2]}}
```

表示有个id为l1的线，起始点为a1组件的[第3列，第0行]引脚，终点位置为a2组件的[第2列，第2行]引脚。

### Board分为三层
 背景层:      <BackLayer layout={layout}/> 
 连线层:      <LineLayer layout={layout} connecting={connecting} from={from} to={to}/>
 组件层:      <CompLayer layout={layout}/>

 背景层在最下层有组件的背景图片。不响应事件
 连线层居中，包含连线，响应点击
 组件层最上，包含pin脚，响应点击

 层的顺序为何如此安排？因为线层必须在pin之下，否则线盖住pin后，pin无法点击
 css中需要调整，详见borad.less
.line-layer,.comp-layer,.back-layer{
  pointer-events: none;//不响应鼠标
}
.comp{
    pointer-events: visible;//响应鼠标
}
.pin{
    pointer-events: visible;//响应鼠标
}
path {
    pointer-events: visible;//响应鼠标
}
 ###连接状态
 connecting,from,to

 connecting=true表示已经连接了起始点，在寻找终点
 此时绘制一根[起始点from,鼠标所在位置to]的连线
 from表示为[comp,pin]的格式
 to表示为像素[x,y]
 因此在连线层需要把from换成像素坐标，to不用换。
 */
import React from 'react';
require('./board.less');
import CompLayer from './comp_layer';
import LineLayer from './line_layer';
import BackLayer from './back_layer';
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
        a1:{id:"a1",w:10,h:5,x:100,y:200,pins:[[3,0],[4,0],[5,0],[3,4],[4,4],[5,4]],
        background:"img/me5565.jpg"},
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
       <BackLayer layout={layout}/>
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
