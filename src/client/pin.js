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
    const {pos,comp}=this.props;
    const unit=10;
    const x=pos[0]*unit,y=pos[1]*unit;
    const style={left:x,top:y};
    return (
      <div className="pin" style={style} onClick={()=>{
        console.log(pos,comp);
        PubSub.publish('pin',{comp,pos});
      }}></div>
    );
  }
}
