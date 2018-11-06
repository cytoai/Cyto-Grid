import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend'

const itemSource = {
    beginDrag(props) {
      const imgId = props.item.id
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
    constructor(props) {
        super(props);
        this.state = {
            src: null,
        };
        this.asyncDatabaseRequest = this.asyncDatabaseRequest.bind(this);
    }
    
    static getDerivedStateFromProps(props, state) {
        // Store previousChecksum in state so we can compare when props change.
        // Clear out previously-loaded data (so we don't render stale stuff).
        if (props.item.id !== state.previousId) {
            return {
                src: null,
                previousId: props.item.id
            };
        }
        // No state update necessary
        return null;
    }
    
    componentDidMount() {
        this.props.connectDragPreview(getEmptyImage(), {
            captureDraggingState: true,
        })
        this.asyncDatabaseRequest(this.props.item.id);
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (this.state.src === null) {this.asyncDatabaseRequest(this.props.item.id);}
    }
    
    componentWillUnmount() {
        if (this._asyncRequest) {this._asyncRequest.cancel();}
    }
    
    asyncDatabaseRequest(id) {
        if (typeof this.props.asyncImgLoadingFunc === "function") { 
            this.props.asyncImgLoadingFunc(id, this)
        }
    }     
    render () {
        const { selectedItems, onmousedown, connectDragSource, containerStyle, item} = this.props
        const imgId = String(item.id)
        const imgSrc = item.src
        return connectDragSource(
            <div key={"li" + imgId} name={"selectableElement"}  type={"selectableElement"} imgid={imgId} onMouseDown={() => onmousedown(imgId)} className={selectedItems.includes(imgId) ? "selected" : "unselected"}>
                <img key={"img" + imgId} type={"selectableElement"} alt="foo" src={this.state.src === null ? imgSrc : this.state.src} style={{objectPosition: "0 0", backgroundColor: "#F5F5F5", width: 0.8 * containerStyle.width, height: 0.8 * containerStyle.height, objectFit: "contain"}}/>
            </div>
        )
    }
}

export default DragSource("SelectedItems", itemSource, collect)(Item)
