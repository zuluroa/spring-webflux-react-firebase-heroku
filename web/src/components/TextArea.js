import React, { useRef } from 'react';
import JoditEditor from "jodit-react";

export const TextArea = ({setContent}) => {
	const editor = useRef(null)

	const config = {
		readonly: false 
	}
	
	return (
        <JoditEditor
            ref={editor}
            config={config}
            tabIndex={1} 
            onBlur={newContent => setContent(newContent)} 
            onChange={newContent => {}}
        />
    );
}