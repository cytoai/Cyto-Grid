import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend'

const itemSource = {
    beginDrag(props) {
      const imgId = props.images[props.index].id
      // Set global dragged item to this item
      props.ondrag(imgId)
      return {
        imgId: imgId,
        selectedItems: props.selectedItems
      };
    },
    endDrag(props, monitor, component) {
        // Set dragged item to null
        props.ondrag(null)  
        if (!monitor.didDrop()) {
          return;
        }
    },
};
  
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        connectDragPreview: connect.dragPreview()
    };
}
    
class Item extends Component {     
    componentDidMount() {
        this.props.connectDragPreview(getEmptyImage(), {
            captureDraggingState: true,
        })
    }

    render () {
        const { selectedItems, onmousedown, connectDragSource, containerStyle, images, index} = this.props
        const imgId = String(images[index].id)
        const imgSrc = images[index].src
        return connectDragSource(
            <div key={"li" + imgId} name={"selectableElement"}  type={"selectableElement"} imgid={imgId} onMouseDown={() => onmousedown(imgId)} className={selectedItems.includes(imgId) ? "selected" : "unselected"}>
                <img key={"img" + imgId} type={"selectableElement"} alt="foo" src={imgSrc} style={{objectPosition: "0 0", backgroundColor: "#F5F5F5", width: 0.8 * containerStyle.width, height: 0.8 * containerStyle.height, objectFit: "contain"}}/>
            </div>
        )
    }
}

export default DragSource("SelectedItems", itemSource, collect)(Item)
