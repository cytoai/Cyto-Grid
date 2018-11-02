import React, { Component } from 'react';
import './Gallery.css';
import Items from './Items.js'
import Target from './Target.js'
import Selectionbox from './Selectionbox.js'
import HTML5Backend from 'react-dnd-html5-backend'
import CustomDragLayer from './costumDragLayer'
import { DragDropContext } from 'react-dnd'
import { collisionDetection } from './helper.js'


class Gallery extends Component {
    constructor(){
      super()
      this.state = {
          selected: [],
          collisions: [],
          selectionboxCoordinates: {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 0,
          },
          selectionboxVisibility: "hidden",
          currentlyDraggedItem: null
      }
    }

    onmousedown = (e) => {
        // Only activate selection box when not dragging on a selectable item
        if(e.target.getAttribute("type") !== "selectableElement"){
            this.setState({selectionboxVisibility: "visible"})
            let currentSelectionboxCoordinates = {...this.state.selectionboxCoordinates}
            currentSelectionboxCoordinates.x1 = e.clientX; //Set the initial X
            currentSelectionboxCoordinates.y1 = e.clientY; //Set the initial Y
            this.setState({selectionboxCoordinates: currentSelectionboxCoordinates})
        }
    };

    onmousemove = (e) => {
        // Always update coordinates based on mouse position
        let currentSelectionboxCoordinates = {...this.state.selectionboxCoordinates}
        currentSelectionboxCoordinates.x2 = e.clientX; 
        currentSelectionboxCoordinates.y2 = e.clientY; 
        this.setState({selectionboxCoordinates: currentSelectionboxCoordinates})
        // Only check for collisions if selection box is active
        if(this.state.selectionboxVisibility === "visible"){
            const collisions = collisionDetection(currentSelectionboxCoordinates)
            this.setState({selected: collisions, collisions: collisions})
        }
    };

    onmouseup = (e) => {
        // Check if no collisions occured and mouseup event is outside of a selectable item
        if(e.target.getAttribute("type") !== "selectableElement" && this.state.collisions.length === 0){
            // if so unselect all items
            this.setState({selected: []})
        }
        // Hide selection box und reset collisions
        this.setState({selectionboxVisibility: "hidden", collisions: []})
    }

    selectItem = (listId) => {
        // Check if clicked on an already selected item
        if(this.state.selected.includes(listId)){
            return
        }
        // else select item
        this.setState({selected: [listId]})
    }

    setCrrentlyDraggedItem = (value) => {
        // if item is dragged value = listId otherwise value = null
        this.setState({currentlyDraggedItem: value})
    }

    render() {
        return (
            <div type="container" onMouseDown={this.onmousedown} onMouseMove={this.onmousemove} onMouseUp={this.onmouseup}>
                <CustomDragLayer draggedItem={this.state.currentlyDraggedItem}/>
                <Selectionbox selectionboxCoordinates={this.state.selectionboxCoordinates} visibility={this.state.selectionboxVisibility} />
                <Target/>
                <Items
                    selectItem={this.selectItem}
                    selectedItems={this.state.selected}
                    ondrag={this.setCrrentlyDraggedItem}
                 />
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Gallery);
