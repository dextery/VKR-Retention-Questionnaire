import { Link } from 'react-router-dom'
import { useLayoutEffect } from 'react'

export default function HomePage() {
  useLayoutEffect(() => {
  document.body.className = 'default'
}, [])
  
  return (
    <div className="container">
      <h1>
        Опрос механик удержания
      </h1>

      <p>
        Данное исследование посвящено
        восприятию механик удеражния аудитории
        в современных видеоиграх.
      </p>

      <p>
        Опрос полностью анонимный.
      </p>

      <p>
        Никакая персональная информация
        не собирается.
      </p>

      <p>
        Среднее время прохождения:
        3-5 минут.
      </p>

      <div className="consent-box">
        <p>
          Нажав на кнопку ниже вы начнёте опрос. Заранее спасибо за участие!
        </p>
      </div>

      <Link to="/survey">
        <button>
          Начать опрос
        </button>
      </Link>
    </div>
  )
}