import React from 'react'

interface MessageProps {
  text: string
  type: 'success' | 'error' | ''
}

export const Message: React.FC<MessageProps> = ({ text, type }) => {
  if (!text) return null

  const messageClass = type ? `message ${type}` : 'message'

  return (
    <div id="message" className={messageClass}>
      {text}
    </div>
  )
}
