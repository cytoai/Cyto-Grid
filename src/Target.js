import React, { Component } from 'react'
import { DropTarget } from 'react-dnd';

const squareTarget = {
    drop(props, monitor) {
        console.log(monitor.getItem())
    }
  };

function collect(connect, monitor) {
return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
};
}
  
class Target extends Component {
    constructor(){
        super()
        this.state = {
        }
    }
    render () {
        const {connectDropTarget, isOver} = this.props
        return connectDropTarget(
           <div className="target" style={isOver ? {backgroundColor: "green"}  : {backgroundColor: "#f3f3f3"}}/>
        )
    }
}

export default DropTarget("SelectedItems", squareTarget, collect)(Target)
