import React, { useEffect, useState,useRef } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Editor } from '@tinymce/tinymce-react';

export default function Index({onEditorStateChange}) {
  
  const [title, setTitle] = useState('');

    const editorRef = useRef(null);
   
  

  const handleEditorChange=(text)=>{

    
    onEditorStateChange(text)

  }

  return (
    <>
      
      <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         init={{
           height: 300,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
         onEditorChange={handleEditorChange}
       />
       
    </>
  );
}
