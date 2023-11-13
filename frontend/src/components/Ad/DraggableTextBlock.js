import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableTextBlock = ({ depth = 0 }) => {
    const [nestedComponents, setNestedComponents] = useState([]);
    const maxDepth = 3; // set your desired max depth

    const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({
        type: 'widget',
        item: { create: () => <DraggableTextBlock depth={depth + 1} /> },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [, dropRef] = useDrop({
        accept: 'widget',
        drop: (item, monitor) => {
            if (item && item.create && depth < maxDepth) {
                setNestedComponents(prev => [...prev, item.create]);
            }
        },
    });

    return (
        <div ref={node => dragRef(node) && dropRef(node)} className={`draggable-component ${isDragging ? 'is-dragging' : ''}`}>
            <input></input>
            {depth < maxDepth && (
                <div className="nested-components">
                    {nestedComponents.map((CreateComponent, index) => (
                        <div key={index}>
                            <CreateComponent />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DraggableTextBlock;
