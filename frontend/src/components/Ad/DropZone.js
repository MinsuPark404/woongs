import React, { useState, useCallback, useMemo } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import DraggableButton from './DraggableButton';
import DraggableImage from './DraggableImage';
import DraggableTextBlock from './DraggableTextBlock';



const DraggableComponent = ({ id, type, position, onMove }) => {

    const [, drag] = useDrag(() => ({
        type: 'widget',
        item: { id, type } // 여기에 type을 추가
    }), [id, type]);

    const style = {
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: 'absolute'
    };

    const Component = getComponentByType(type); // 타입에 따라 컴포넌트를 선택합니다

    return <div ref={drag} style={style} onMouseMove={(e) => onMove(id, e)}><Component /></div>;
};

const getComponentByType = (type) => {
    switch (type) {
        case 'text':
            return DraggableTextBlock;
        case 'button':
            return DraggableButton;
        case 'image':
            return DraggableImage;
        default:
            // 기본값 또는 오류 처리
            return () => <div>Unknown component type: {type}</div>;
    }
};



const DropZone = () => {
    const [components, setComponents] = useState([]);

    // 드래그된 컴포넌트의 위치를 업데이트하는 함수
    const updateComponentPosition = useCallback((id, newPosition) => {
        setComponents(prevComponents => prevComponents.map(comp =>
            comp.id === id ? { ...comp, position: newPosition } : comp
        ));
    }, []);

    const [, drop] = useDrop(() => ({
        accept: 'widget',
        drop: (item, monitor) => {
            const clientOffset = monitor.getClientOffset();
            if (clientOffset) {
                const dropZoneRect = document.querySelector('.drop-zone').getBoundingClientRect();
                const newPosition = {
                    x: clientOffset.x - dropZoneRect.left,
                    y: clientOffset.y - dropZoneRect.top,
                };

                // 새로운 컴포넌트를 추가하거나 기존 컴포넌트의 위치를 업데이트
                setComponents(prevComponents => {
                    const existingComponent = prevComponents.find(comp => comp.id === item.id);
                    if (existingComponent) {
                        return prevComponents.map(comp =>
                            comp.id === item.id ? { ...comp, position: newPosition } : comp
                        );
                    } else {
                        return [...prevComponents, {
                            id: item.id,
                            type: item.type,
                            position: newPosition
                        }];
                    }
                });
            }
        }
    }), [updateComponentPosition]);

    return (
        <div ref={drop} className="drop-zone" style={{ position: 'relative', width: '100%', height: '100%' }}>
            {components.map((comp) => (
                <DraggableComponent
                    key={comp.id}
                    id={comp.id}
                    type={comp.type}
                    position={comp.position}
                    onMove={updateComponentPosition}
                />
            ))}
        </div>
    );
};

export default DropZone;
