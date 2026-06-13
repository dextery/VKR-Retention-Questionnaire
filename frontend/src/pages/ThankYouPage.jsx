import { useLayoutEffect } from 'react'

export default function ThankYouPage() {
  useLayoutEffect(() => {
  document.body.className = 'default'
}, [])

  return (
    <div className="container">
      <h1>Спасибо за участие!</h1>

      <p>
        Ваши ответы были сохранены.
      </p>

      <p>
        Вы можете покинуть страницу.
      </p>
    </div>
  )
}