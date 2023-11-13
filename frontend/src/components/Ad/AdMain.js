import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableTextBlock from './DraggableTextBlock'; // You need to create this component
import DropZone from './DropZone'; // You need to create this component
import DraggableButton from './DraggableButton'
import DraggableImage from './DraggableImage'

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './AdMain.css';

function AdMain() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    return (
        <div className={`main-container ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
            <Header />
            <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
            <DndProvider backend={HTML5Backend}>
                <div className="content-container">
                    <main className="main-content">
                        <div className="drag-components-container">
                            <DraggableTextBlock />
                            <DraggableButton />
                            <DraggableImage />
                        </div>
                        <div className="drop-zone-container">
                            <DropZone />
                        </div>
                    </main>
                </div>
            </DndProvider>
        </div>
    );
}


export default AdMain;
