import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableTextBlock from './DraggableTextBlock'; // You need to create this component
import DropZone from './DropZone'; // You need to create this component
import DraggableButton from './DraggableButton'
import DraggableImage from './DraggableImage'
import './AdMain.css';

function AdMain() {
    return (
        <div className='content-container'>
            <DndProvider backend={HTML5Backend}>
                <div className="drag-components-container">
                    <DraggableTextBlock />
                    <DraggableButton />
                    <DraggableImage />
                </div>
                <div className="drop-zone-container">
                    <DropZone />
                </div>
            </DndProvider>
        </div>
    );
}


export default AdMain;
