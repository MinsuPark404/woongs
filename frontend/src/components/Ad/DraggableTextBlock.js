
import React from 'react';
import { useDrag } from 'react-dnd';

// Inside DraggableTextBlock.js

const DraggableTextBlock = ({ id,isNew }) => {
    const [, dragRef] = useDrag(() => ({
        type: 'widget',
        item: { id, type: 'text', isNew},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <div ref={dragRef}>
            <p>dkdkdkdkd</p>
        </div>
    );
};


export default DraggableTextBlock;

