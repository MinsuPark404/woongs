import React, { useState, useCallback } from 'react';
import { useDrop, useDrag } from 'react-dnd';

const DropZone = () => {
    // Header sub-sections
    const [headerLeftComponents, setHeaderLeftComponents] = useState([]);
    const [headerRightComponents, setHeaderRightComponents] = useState([]);

    // Banner sub-sections
    const [bannerTopComponents, setBannerTopComponents] = useState([]);
    const [bannerBottomComponents, setBannerBottomComponents] = useState([]);

    // Description components
    const [descriptionComponents, setDescriptionComponents] = useState([]);
    
    const moveComponent = useCallback((dragIndex, hoverIndex, components, setComponentsFunc) => {
        const newComponents = [...components];
        const dragged = newComponents[dragIndex];
        newComponents.splice(dragIndex, 1);
        newComponents.splice(hoverIndex, 0, dragged);
        setComponentsFunc(newComponents);
    }, []);
    const deleteComponent = (setComponentsFunc, index) => {
        setComponentsFunc(prev => prev.filter((_, i) => i !== index));
    };

    // Drop logic for header left
    const [, headerLeftDrop] = useDrop(() => ({
        accept: 'widget',
        drop: (item, monitor) => {
            if (item && item.create) {
                setHeaderLeftComponents(prev => [...prev, item.create]);
            }
        }
    }));

    // Drop logic for header right
    const [, headerRightDrop] = useDrop(() => ({
        accept: 'widget',
        drop: (item, monitor) => {
            if (item && item.create) {
                setHeaderRightComponents(prev => [...prev, item.create]);
            }
        }
    }));

    // Drop logic for banner top
    const [, bannerTopDrop] = useDrop(() => ({
        accept: 'widget',
        drop: (item, monitor) => {
            if (item && item.create) {
                setBannerTopComponents(prev => [...prev, item.create]);
            }
        }
    }));

    // Drop logic for banner bottom
    const [, bannerBottomDrop] = useDrop(() => ({
        accept: 'widget',
        drop: (item, monitor) => {
            if (item && item.create) {
                setBannerBottomComponents(prev => [...prev, item.create]);
            }
        }
    }));

    // Drop logic for description remains unchanged
    // ...

    return (
        <div className="drop-zone">
            {/* Header Sub-Sections */}
            <div className="header-section">
                <div ref={headerLeftDrop} className="drop-zone-section header-left">
                    {headerLeftComponents.map((Component, index) => (
                        <div key={index} className="dropped-component">
                            <Component />
                            <button className = 'button' onClick={() => deleteComponent(setHeaderLeftComponents, index)}>Delete</button>
                        </div>
                    ))}
                </div>
                <div ref={headerRightDrop} className="drop-zone-section header-right">
                    {headerRightComponents.map((Component, index) => (
                        <div key={index} className="dropped-component">
                            <Component />
                            <button className = 'button' onClick={() => deleteComponent(setHeaderRightComponents, index)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Banner Sub-Sections */}
            <div className="banner-section">
                <div ref={bannerTopDrop} className="drop-zone-section banner-top">
                    {bannerTopComponents.map((Component, index) => (
                        <div key={index} className="dropped-component">
                            <Component />
                            <button className = 'button' onClick={() => deleteComponent(setBannerTopComponents, index)}>Delete</button>
                        </div>
                    ))}
                </div>
                <div ref={bannerBottomDrop} className="drop-zone-section banner-bottom">
                    {bannerBottomComponents.map((Component, index) => (
                        <div key={index} className="dropped-component">
                            <Component />
                            <button className = 'button' onClick={() => deleteComponent(setBannerBottomComponents, index)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Description Section */}
            {/* ... */}
        </div>
    );
};

export default DropZone;
