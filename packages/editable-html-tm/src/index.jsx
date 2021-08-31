import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import { withStyles } from '@material-ui/core/styles';

export const parseDegrees = html =>
  html
    // removes \(   use case: 50°
    .replace(/\\[(]/g, '')
    // removes \)   use case: 50°+m<1
    .replace(/\\[)]/g, '')
    // removes \degree  use case: 50°
    .replace(/\\degree/g, '&deg;');

const useStyles = withStyles(theme => ({
  editorWrapper: {
    marginTop: theme.spacing.unit * 2,
    '& .mce-content-body': {
      border: '1px solid #e0e0e0',
      borderRadius: '5px',
      padding: '5px'
    }
  },
  removeContainer: {
    cursor: 'pointer'
  }
}));

function EditorHtml({ classes, className, markup, onChange, onDone, height, width }) {

  const editorRef = useRef(null);

  const inputChange = (value, done) => {
    const htmlParsed = parseDegrees(value);

    if (value !== markup) {
      onChange(htmlParsed);
    }

    if (done && typeof onDone === 'function') {
      onDone(htmlParsed);
    }
  };

  return (
    <div className={classes.editorWrapper}>
      <Editor
        className={classes.editContainer}
        apiKey="jia0ekj0smryac6bkoratszcr5zks933f60faprd3b30work"
        onInit={(evt, editor) => editorRef.current = editor}
        value={markup}
        onEditorChange={inputChange}
        init={{
          height,
          width,
          menubar: '',
          inline: true,
          plugins: [
            'advlist',
            'anchor',
            'autolink',
            'charmap',
            'code',
            'fullscreen',
            'help',
            'image',
            'insertdatetime',
            'link',
            'lists',
            'media',
            'paste',
            'preview',
            'print',
            'searchreplace',
            'table',
            'visualblocks',
            'wordcount',
          ],
          toolbar: [
            'bold italic underline strikethrough',
            'fontselect fontsizeselect formatselect',
            'alignleft aligncenter alignright alignjustify',
            'table',
            'outdent indent',
            'numlist bullist checklist',
            'forecolor backcolor casechange permanentpen formatpainter removeformat',
            'pagebreak',
            'charmap emoticons',
            'fullscreen  preview save print',
            'insertfile image media pageembed template link anchor codesample',
            'a11ycheck ltr rtl',
            'showcomments addcomment',
          ].join(' | '),
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
    </div>
  );
}

EditorHtml.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onDone: PropTypes.func,
  markup: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number
};
EditorHtml.defaultProps = {
  height: 120,
  width: 400,
  onDone: () => {}
};

export default useStyles(EditorHtml);
