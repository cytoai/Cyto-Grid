import React from 'react'
import Item from './Item'
import { Grid,  AutoSizer } from 'react-virtualized';


const Items = (props) => {
    const onmousedown = (imgId) => {
        props.selectItem(imgId)
    }

    let index = -1
    const picturesPerRow = props.imagesPerRow
    const length = props.images.length
    const quotient = Math.floor(length/picturesPerRow);
    const remainder = length % picturesPerRow;
    let rowCount = quotient
    if( remainder !== 0 ){
        rowCount = rowCount + 1
    }

    const cellRenderer = function ({ columnIndex, key, rowIndex, style }) {
        // Cell renderer for virtualized list
        let newStyle ={...style}
        index = index + 1
        if(rowIndex === rowCount-1 && columnIndex > remainder-1){
            if(remainder !== 0){
                return
            }
        }
        return (
            <div key={key} style={newStyle}>  
                <Item
                    images={props.images}
                    index={index}
                    containerStyle={style}
                    key={key} 
                    selectedItems={props.selectedItems} 
                    onmousedown={onmousedown} 
                    ondrag={props.ondrag}
                />
            </div>
        )  
    }
       
  return (
        <AutoSizer>
            {({ height, width }) => { 
                let columnWidth = picturesPerRow > length ? width/length : width/picturesPerRow
                return (<Grid
                    cellRenderer={cellRenderer}
                    columnCount={picturesPerRow > length ? length : picturesPerRow}
                    columnWidth={columnWidth}
                    height={height} 
                    rowCount={rowCount}
                    rowHeight={300}
                    width={width}
                    style={{outline: "none"}}
                />)
            }}
        </AutoSizer>
  )
}

export default Items
