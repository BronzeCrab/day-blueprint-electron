import React from 'react';
import ReactQuill from 'react-quill';

class Editor extends React.Component {

  render() {
    const { 
      editorState, 
      onChange 
    } = this.props;

    return (
      <div>
        <ReactQuill
          theme="snow"
          onChange={onChange}
          value={editorState}
          modules={Editor.modules}
          formats={Editor.formats}
          placeholder="Description"
        />
      </div>
    )
  }
}

Editor.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}

Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'code',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

export default Editor;