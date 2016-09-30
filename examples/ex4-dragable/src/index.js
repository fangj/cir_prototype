import React from 'react';
import ReactDOM from 'react-dom';
import Playground from './playground';
import PubSub from 'pubsub-js';

var env={p1:[[0,0],[100,100]]};
ReactDOM.render(<Playground env={env}/>, document.getElementById('root'));

PubSub.subscribe("pos",function(msg,obj){
  // console.log(msg,obj);
  var tag=msg.substr(4);//去除"pos."
  console.log(tag,obj);
  env[tag]=obj;
  ReactDOM.render(<Playground env={env}/>, document.getElementById('root'));
});

PubSub.subscribe("line",function(msg,obj){
  // console.log(msg,obj);
  var tag=msg.substr(5);//去除"line."
  console.log(tag,obj);
  
  if(tag=='a1'){
    env.p1[0]=obj;
  }
  if(tag=='a2'){
    env.p1[1]=obj;
  }

  ReactDOM.render(<Playground env={env}/>, document.getElementById('root'));
});
