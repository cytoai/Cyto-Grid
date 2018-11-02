import React from 'react'
import Item from './Item'
import { Grid,  AutoSizer } from 'react-virtualized';


const Items = (props) => {
    const onmousedown = (listId) => {
        props.selectItem(listId)
    }

  const cellRenderer = function ({ columnIndex, key, rowIndex, style }) {
    // Cell renderer for virtualized list
    let newStyle ={...style, margin: "32px"}
    return (
      <div key={key} style={newStyle}>  
          <Item
              key={key} 
              listId={key} 
              selectedItems={props.selectedItems} 
              onmousedown={onmousedown} 
              ondrag={props.ondrag}
          />
      </div>
    )  
  }
       
  return (
        <AutoSizer>
            {({ height, width }) => (
                <Grid
                    cellRenderer={cellRenderer}
                    columnCount={5}
                    columnWidth={300}
                    height={height} /* This needs to be replaced dynamically in future */
                    rowCount={10000}
                    rowHeight={300}
                    width={width} /* This needs to be replaced dynamically in future */
                    style={{zIndex: 1, outline: "none"}}
                />
            )}
        </AutoSizer>
  )
}

export default Items
