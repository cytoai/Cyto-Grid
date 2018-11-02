import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend'

const itemSource = {
    beginDrag(props) {
      // Set global dragged item to this item
      props.ondrag(props.listId)
      return {
        listId: props.listId,
        selectedItems: props.selectedItems
      };
    },
    endDrag(props, monitor, component) {
        // Set dragged item to null
        props.ondrag(null)  
        if (!monitor.didDrop()) {
          return;
        }
        const item = monitor.getItem();
        console.log(item)
    },
    isDragging(props, monitor){
    }
};
  
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        connectDragPreview: connect.dragPreview()
    };
}
    
class Item extends Component {  
    constructor(){
        super()
        this.rotate = Math.random() * 10 - 20
        this.transform = "transform 1s ease 0s"   
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Check if select state of item has changed
        if(nextProps.selectedItems.includes(this.props.listId) !== this.props.selectedItems.includes(this.props.listId)){
            return true
        }
        // Otherwise dont update component
        return false
    }
    
    componentDidMount() {
        this.props.connectDragPreview(getEmptyImage(), {
            captureDraggingState: true,
        })
    }

    render () {
        const { listId, selectedItems, onmousedown, connectDragSource} = this.props
        return connectDragSource(
            <div key={"li" + listId} name={"selectableElement"}  type={"selectableElement"} listid={listId} onMouseDown={() => onmousedown(listId)} className={selectedItems.includes(listId) ? "selected" : "unselected"}>
                <img key={"img" + listId} type={"selectableElement"} alt="foo" src="https://place-hold.it/256x256"/>
            </div>
        )
    }
}

export default DragSource("Item", itemSource, collect)(Item)
