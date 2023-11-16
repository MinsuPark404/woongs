import React,{useMemo} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableTextBlock from './DraggableTextBlock';
import DropZone from './DropZone';
import DraggableButton from './DraggableButton';
import DraggableImage from './DraggableImage';
import './AdMain.css';
import { v4 as uuidv4 } from 'uuid';

function AdMain() {
    // 각 컴포넌트에 대해 고유한 ID를 생성
    const textBlockId = useMemo(() => uuidv4(), []);
    const buttonId = useMemo(() => uuidv4(), []);
    const imageId = useMemo(() => uuidv4(), []);

    return (
        <div className='content-container'>
            <DndProvider backend={HTML5Backend}>
                <div className="drag-components-container">
                    <DraggableTextBlock id={textBlockId} isNew />
                    <DraggableButton id={buttonId} isNew />
                    <DraggableImage id={imageId} isNew />
                </div>
                <div className="drop-zone-container">
                    <DropZone />
                </div>
            </DndProvider>
        </div>
    );
}

export default AdMain;

