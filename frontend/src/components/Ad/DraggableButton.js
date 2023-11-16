
import React from 'react';
import { useDrag } from 'react-dnd';


const DraggableButton = ({ id, isNew }) => {
    const [, dragRef] = useDrag(() => ({
        type: 'widget',
        item: { id, type: 'button', isNew },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <div ref={dragRef}>
            <button className='btn'>1번 메뉴</button>
        </div>
    );
};

export default DraggableButton;

