

import React from 'react';
import { useDrag } from 'react-dnd';
import './AdMain.css';
const DraggableButton = () => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'widget',
        item: { create: () => <DraggableButton /> }, // Pass a function that returns the component
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div ref={dragRef} className={`draggable-component ${isDragging ? 'is-dragging' : ''}`}>
            <button className='btn'>1231231</button>
        </div>
    );
};

export default DraggableButton;