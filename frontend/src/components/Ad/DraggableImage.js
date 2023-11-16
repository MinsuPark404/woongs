
import React from 'react';
import { useDrag } from 'react-dnd';



const DraggableImage = ({ id,isNew }) => {
    const [, dragRef] = useDrag(() => ({
        type: 'widget',
        item: { id, type: 'image', isNew },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <div ref={dragRef}>
            <h1>아아아아아</h1>
        </div>
    );
};


export default DraggableImage;


