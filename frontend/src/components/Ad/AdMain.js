import React, { useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableTextBlock from './DraggableTextBlock';
import DropZone from './DropZone';
import DraggableButton from './DraggableButton';
import DraggableImage from './DraggableImage';
import './AdMain.css';
import { v4 as uuidv4 } from 'uuid';

function AdMain() {
    const textBlockId = useMemo(() => uuidv4(), []);
    const buttonId = useMemo(() => uuidv4(), []);
    const imageId = useMemo(() => uuidv4(), []);

    return (
        <div className='content-container'>
            <DndProvider backend={HTML5Backend}>
                <div className="drag-components-container">
                    <DraggableTextBlock id={textBlockId} />
                    <DraggableButton id={buttonId} />
                    <DraggableImage id={imageId} />
                </div>
                <div className="drop-zone-container">
                    <DropZone />
                </div>
            </DndProvider>
        </div>
    );
}

export default AdMain;
