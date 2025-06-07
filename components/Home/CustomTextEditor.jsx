import Editor, {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  HtmlButton,
  Separator,
  Toolbar
} from 'react-simple-wysiwyg';

export default function CustomEditor({ value, onChange }) {
  return (
    <Editor value={value} onChange={onChange}>
      <Toolbar>
         <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
           
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            
          
            <Separator />
          
      </Toolbar>
    </Editor>
  );
}
