import React from 'react';
require("./back.less");
export default class back extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {data}=this.props;
    const {x,y,w,h,background}=data;
    if(!background){
      return null;
    }
    const unit=10;
    const style={width:w*unit,height:h*unit,left:x,top:y,
    backgroundImage:"url("+background+")",
    backgroundSize:"cover"};//without draggable

    return (
      <div className="back" style={style}/>
    );
  }
}
