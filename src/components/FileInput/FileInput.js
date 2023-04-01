import React from 'react'

const FileInput = ({fileUpload, ...props}) => {
  return (
    <input type="file" {...props} onChange={fileUpload} className="position-absolute opacity-0 z-index-1 top-0-px right-0-px bottom-0-px cursor-pointer left-0-px"/>
  )
}

export default FileInput
