import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="container">
      <h1>
        Опрос retention-механик
      </h1>

      <p>
        Данное исследование посвящено
        восприятию retention-механик
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
          Нажав на кнопку ниже вы начнёте исследование. Заранее спасибо за участие!
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