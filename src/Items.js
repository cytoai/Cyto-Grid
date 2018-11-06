import React from 'react'
import Item from './Item'
import { Grid,  AutoSizer, CellMeasurer, CellMeasurerCache} from 'react-virtualized';

const Items = (props) => {
    const onmousedown = (imgId) => {
        props.selectItem(imgId)
    }

    const picturesPerRow = props.imagesPerRow
    const length = props.images.length
    const quotient = Math.floor(length/picturesPerRow);
    const remainder = length % picturesPerRow;
    let rowCount = quotient
    if( remainder !== 0 ){
        rowCount = rowCount + 1
    }
    const cache = new CellMeasurerCache({
        defaultHeight: 50,
        fixedWidth: true
    });

    const cellRenderer = function ({ columnIndex, key, rowIndex, style }) {
        // Cell renderer for virtualized list
        let newStyle = {...style}
        if( typeof cellRenderer.index === 'undefined' ) {
            cellRenderer.index = -1;
        }
        if(cellRenderer.index === length-1){
            cellRenderer.index = 0 
        }
        else cellRenderer.index++
        if(rowIndex === rowCount-1 && columnIndex > remainder-1){
            if(remainder !== 0){
                return
            }
        }
        return (
            <div key={key} style={newStyle}>  
                <Item
                    item={props.images[cellRenderer.index]}
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
                const calculatedWidth = width - props.decreaseWidth
                const columnWidth = picturesPerRow > length ? calculatedWidth/length : calculatedWidth/picturesPerRow
                return (<Grid
                    cellRenderer={cellRenderer}
                    columnCount={picturesPerRow > length ? length : picturesPerRow}
                    columnWidth={columnWidth}
                    height={height} 
                    rowCount={rowCount}
                    rowHeight={props.rowHeight}
                    width={calculatedWidth}
                    style={{outline: "none"}}
                />)
            }}
        </AutoSizer>
  )
}

export default Items
