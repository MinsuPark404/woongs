// DraggableButton.js
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableButton = ({ id }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'widget',
        item: { id, type: 'button' },
        collect: (monitor) => ({ 
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div ref={dragRef} className={`draggable-component ${isDragging ? 'is-dragging' : ''}`}>
            <button className='btn'>1번 메뉴</button>
        </div>
    );
};

export default DraggableButton;
