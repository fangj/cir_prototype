import React from 'react';
import Ibox from './ibox';
export default class obox extends React.Component {

  static propTypes = { checked: React.PropTypes.bool };
  static defaultProps = { checked: true };

  constructor(props) {
    super(props);
    this.state={checked:props.checked}
  }

  render() {
    const checked=this.state.checked?"true":"false";
    return (
      <div>
        <div onClick={this.click.bind(this)}>obox:{checked}</div>
        <Ibox checked={this.state.checked} onCheck={this.onCheck.bind(this)}/>
      </div>
    );
  }

  click(){
    this.setState({checked:!this.state.checked})
  }

  onCheck(value){
    console.log('obox get value',value);
    this.setState({checked:value})
  }
}
