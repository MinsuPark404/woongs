// DraggableButton.js
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableTextBlock = ({ id }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'widget',
        item: { id, type: 'text' },
        collect: (monitor) => ({ 
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div ref={dragRef} className={`draggable-component ${isDragging ? 'is-dragging' : ''}`}>
            <p>텍스트</p>
        </div>
    );
};

export default DraggableTextBlock;
