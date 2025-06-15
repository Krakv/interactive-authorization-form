import React from 'react'

const socials = [
  { id: 'google', title: 'google', src: 'images/google.ico' },
  { id: 'yandex', title: 'yandex', src: 'images/yandex.ico' },
  { id: 'vk', title: 'vk', src: 'images/vk.ico' },
  { id: 'tg', title: 'tg', src: 'images/tg.ico' },
]

export const SocialAuth = () => (
  <div className="auth__socials">
    {socials.map((social) => (
      <img
        key={social.id}
        className="socials_icons"
        id={social.id}
        title={social.title}
        src={social.src}
        alt={social.title}
      />
    ))}
  </div>
)
