'use client';
import s from './WelcomeComponent.module.scss'

export default function WelcomeComponent() {

  return (
    <div className={s.welcome}>
      <h1>AMA</h1>
      <h2><a href="mailto:info@ama.work">info[at]ama.work</a></h2>
    </div>
  )
}