// DraggableButton.js
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableImage = ({ id }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'widget',
        item: { id, type: 'image' },
        collect: (monitor) => ({ 
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div ref={dragRef} className={`draggable-component ${isDragging ? 'is-dragging' : ''}`}>
            <img/>
        </div>
    );
};

export default DraggableImage;
