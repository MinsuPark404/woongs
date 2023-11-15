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
        <>
            <span ref={dragRef} className={`draggable-component ${isDragging ? 'is-dragging' : ''}`}>
                <button className='btn'>1번 메뉴</button>
            </span>
        </>       
    );
};

export default DraggableButton;