import React from 'react'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

import { FaBold, FaItalic, FaStrikethrough, FaHeading, FaListOl, FaListUl,
         FaRedo, FaUndo, FaUnderline } from "react-icons/fa"

import { MdHorizontalRule } from "react-icons/md"


import './TextEditor.css'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className='menu-bar'>
      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleBold().run()
        }}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <FaBold />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleItalic().run()
        }}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <FaItalic />
        
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleUnderline().run()
        }}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        <FaUnderline />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleStrike().run()
        }}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <FaStrikethrough />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        <FaHeading />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleBulletList().run()
        }}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <FaListUl />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleOrderedList().run()
        }}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <FaListOl />
      </button>
      <button onClick={(e) => {
        e.preventDefault()
        editor.chain().focus().setHorizontalRule().run()
        }}>
          <MdHorizontalRule/>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().undo().run()
        }}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        <FaUndo />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().redo().run()
        }}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        <FaRedo />
      </button>
    </div>
  )
}

const TextEditor =({setBlog, initContValue, setContentTouched}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline
    ],
    content: initContValue,
    editable: true,
    onUpdate: ({editor}) => {
      const html = editor.getHTML();
      setBlog((state) => {
        return { ...state, content: html }
      });
    }, 
    onBlur: ({editor}) => {
      setContentTouched(true)
    }
  })

  return (
    <div className='text-editor'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default TextEditor