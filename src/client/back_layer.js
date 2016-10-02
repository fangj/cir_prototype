/**
 * 背景层，放置背景图片
 */
import React from 'react';
import Background from './back';

export default class back_layer extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
   const {comps}=this.props.layout;
   const compnents=_.values(comps);
    return (
      <div className="back-layer">
        {compnents.map(comp=> <Background key={comp.id} data={comp}/>)}
      </div>
    );
  }
}
