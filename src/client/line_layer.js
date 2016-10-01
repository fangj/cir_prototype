import React from 'react';
var _=require('lodash');
import Line from './line';

export default class line_layer extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {comps,lines}=this.props.layout;
    const _lines=translateLines(comps,lines);
    const {connecting,from,to}=this.props;
    var _from;
    if(connecting && from && to){
      _from=translatePoint(from,comps);
      // console.log('translatePoint',from,_from);
    }
    return (
      <svg className="line-layer">
        {_lines.map(line=> <Line key={line.id} data={line}/>)}
        {!connecting?null:<Line  data={{from:_from,to:to,id:"connecting"}}/>}
      </svg>
    );
    
  }
}

//转换相对坐标为绝对坐标
function translateLines(comps,lines){
  const _lines=_.values(lines);
  return _lines.map(line=>({
    from:translatePoint(line.from,comps),
    to:translatePoint(line.to,comps),
    id:line.id
  }));
}

function translatePoint(point,comps){
  const comp=comps[point.comp];
  const unit=10;
  const x=comp.x+point.pin[0]*unit+unit/2;
  const y=comp.y+point.pin[1]*unit+unit/2;
  return {x,y};
}
