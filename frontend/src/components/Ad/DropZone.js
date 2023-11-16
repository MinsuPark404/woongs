import React, { useState, useEffect} from 'react';
import { useDrop, useDrag } from 'react-dnd';
import DraggableButton from './DraggableButton';
import DraggableImage from './DraggableImage';
import DraggableTextBlock from './DraggableTextBlock';
import { v4 as uuidv4 } from 'uuid';
import { getEmptyImage } from 'react-dnd-html5-backend';

const getComponentByType = (type) => {
    switch (type) {
        case 'text': return DraggableTextBlock;
        case 'button': return DraggableButton;
        case 'image': return DraggableImage;
        default: return () => <div>Unknown component type: {type}</div>;
    }
};

const DraggableComponent = ({ id, type, position, onDelete }) => {
    const [state, setState] = useState({ isActive: false, isDragging: false });

    const [, drag, preview] = useDrag(() => ({
        type: 'widget',
        item: { id, type },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    }), [id, type]);

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
        setState(prev => ({ ...prev, isDragging: state.isDragging }));
    }, [preview, state.isDragging]);

    const style = {
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: 'absolute',
        border: state.isActive ? '2px solid blue' : 'none',
        cursor: 'move',
        boxShadow: state.isDragging ? '0px 0px 12px rgba(0, 0, 0, 0.2)' : 'none',
        backgroundColor: state.isDragging ? '#f0f0f0' : '',
    };

    const Component = getComponentByType(type);

    return (
        <div id={id} ref={drag} style={style} onClick={() => setState({ ...state, isActive: !state.isActive })}>
            <Component />
            {state.isActive && (
                <button onClick={(e) => { e.stopPropagation(); onDelete(id); }} style={{ marginTop: '5px' }}>Delete</button>
            )}
        </div>
    );
};

const DropZone = () => {
    const [components, setComponents] = useState([]);

    const [, drop] = useDrop(() => ({
        accept: 'widget',
        drop: (item, monitor) => {
            const clientOffset = monitor.getClientOffset();
            if (clientOffset) {
                const dropZoneRect = document.querySelector('.drop-zone').getBoundingClientRect();
                const newPosition = { x: clientOffset.x - dropZoneRect.left, y: clientOffset.y - dropZoneRect.top };
    
                setComponents(prevComponents => {
                    const existingComponent = prevComponents.find(comp => comp.id === item.id);
                    if (existingComponent) {
                        return prevComponents.map(comp => comp.id === item.id ? { ...comp, position: newPosition } : comp);
                    } else if (item.isNew) {
                        const newId = uuidv4();
                        return [...prevComponents, { id: newId, type: item.type, position: newPosition }];
                    }
                    return prevComponents;
                });
            }
        }
    }));

    return (
        <div ref={drop} className="drop-zone" style={{ position: 'relative', width: '100%', height: '100%' }}>
            {components.map(comp => (
                <DraggableComponent
                    key={comp.id}
                    {...comp}
                    onDelete={() => setComponents(prev => prev.filter(c => c.id !== comp.id))}
                />
            ))}
        </div>
    );
};

export default DropZone;
