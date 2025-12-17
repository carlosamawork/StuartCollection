'use client';
import s from './WelcomeComponent.module.scss'

export default function WelcomeComponent() {

  return (
    <div className={s.welcome}>
      <h1>Carlos Salvador</h1>
      <h2><a href="mailto:carlosisalvador@gmail.com">carlosisalvador[at]gmail.com</a></h2>
    </div>
  )
}