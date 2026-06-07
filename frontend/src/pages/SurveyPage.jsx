import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'


const STORAGE_KEY = "survey_progress"

const COMPLETED_KEY = "survey_completed"

const API_URL = import.meta.env.VITE_API_URL;

export default function SurveyPage() {

  const navigate = useNavigate()

  const [group, setGroup] =
    useState("")

  const [questions, setQuestions] =
    useState([])

  const [answers, setAnswers] =
    useState({})

  const [currentPage, setCurrentPage] =
    useState(0)

  const [showErrors, setShowErrors] =
    useState(false)

  const [loading, setLoading] =
    useState(true)

  const [sessionId] = useState(
    crypto.randomUUID()
  )

  useEffect(() => {

    async function loadSurvey() {

      if (
        localStorage.getItem(
          COMPLETED_KEY
        )
      ) {
        navigate('/thank-you')
        return
      }

      try {

        const response =
          await fetch(
            `${API_URL}/survey`
          )

        if (!response.ok) {
          throw new Error('Request failed')}

        const data = await response.json()
        //console.log('RESPONSE:', data)
        setGroup(data.group)

        setQuestions(data.questions)

        const savedProgress =
          localStorage.getItem(
            STORAGE_KEY
          )

        if (savedProgress) {

          const parsed =
            JSON.parse(savedProgress)

          setAnswers(
            parsed.answers || {}
          )

          setCurrentPage(
            parsed.currentPage || 0
          )
        }

        setLoading(false)

      }
      catch (error) {

        console.error(error)

      }
    }

    loadSurvey()

  }, [])

  useEffect(() => {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        answers,
        currentPage
      })
    )

  }, [answers, currentPage])



  useEffect(() => {

    if (!group) return

    document.body.className =
      group.toLowerCase()

    return () => {
      document.body.className = ''
    }

  }, [group])

  function handleAnswer(
    questionId,
    value
  ) {

    setAnswers({
      ...answers,
      [questionId]: value
    })

  }

  const groupedQuestions =
  Object.values(
    questions.reduce(
      (acc, question) => {

        const mechanic =
          question.mechanic

        if (!acc[mechanic]) {
          acc[mechanic] = []
        }

        acc[mechanic].push(
          question
        )

        return acc

      },
      {}
    )
  )
  function getOptions(questionType) {

  switch (questionType) {

    case "frequency":
      return [
        { value: 1, label: "Никогда" },
        { value: 2, label: "Редко" },
        { value: 3, label: "Иногда" },
        { value: 4, label: "Часто" },
        { value: 5, label: "Очень часто" }
      ]

    case "genre_interest":
      return [
        { value: 1, label: "Совсем не нравится" },
        { value: 2, label: "Скорее не нравится" },
        { value: 3, label: "Нейтрально" },
        { value: 4, label: "Скорее нравится" },
        { value: 5, label: "Очень нравится" }
      ]

    case "experience":
      return [
        { value: 1, label: "Менее года" },
        { value: 2, label: "1–3 года" },
        { value: 3, label: "3–5 лет" },
        { value: 4, label: "5–10 лет" },
        { value: 5, label: "Более 10 лет" }
      ]

    default:
      return [
        { value: 1, label: "Очень негативно" },
        { value: 2, label: "Негативно" },
        { value: 3, label: "Нейтрально" },
        { value: 4, label: "Положительно" },
        { value: 5, label: "Очень положительно" }
      ]
  }
}
  const totalPages =
  groupedQuestions.length
  
  const currentQuestions =
  groupedQuestions[currentPage] || []

  const currentMechanic =
  currentQuestions[0]?.mechanic || ""

   const pageTitle =
  currentMechanic === 'Mobile Gaming'
    ? 'Информация об игровом опыте'
    : currentMechanic


  const answeredQuestions =
    Object.keys(answers).length

  const progress =
    questions.length > 0
      ? Math.round(
          (
            answeredQuestions /
            questions.length
          ) * 100
        )
      : 0

  function pageIsValid() {

    return currentQuestions.every(
      (question) =>
        answers[question.id]
    )

  }

  function nextPage() {

    if (!pageIsValid()) {

      setShowErrors(true)

      return
    }

    setShowErrors(false)

    if (
      currentPage <
      totalPages - 1
    ) {

      setCurrentPage(
        currentPage + 1
      )

    }
  }

  function previousPage() {

    if (currentPage > 0) {

      setCurrentPage(
        currentPage - 1
      )

    }
  }

  async function handleSubmit() {

    if (!pageIsValid()) {

      setShowErrors(true)

      return
    }

    try {

      const response =
       await fetch(
        `${API_URL}/submit`,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body: JSON.stringify({
              group,
              answers,
              sessionId
            })
          }
        )

      if (!response.ok) {

        throw new Error(
          'Server error'
        )

      }

      localStorage.removeItem(
        STORAGE_KEY
      )

      localStorage.setItem(
        COMPLETED_KEY,
        "true"
      )

      navigate('/thank-you')

    }
    catch (error) {

      console.error(error)

      alert(
        'Ошибка отправки опроса'
      )

    }
  }

  if (loading) {

    return (
      <div className="container">
        <h1>
          Загрузка опроса...
        </h1>
      </div>
    )
  }
  
  return (
    <div className="container">

      <h1>
        Опрос retention-механик
      </h1>

     {/* <h2>
        Тема:
        {" "}
        {pageTitle}
      </h2> */}

      <p>
        Страница {currentPage + 1}
         {" "}
         из {totalPages}
      </p>

      <div className="progress-wrapper">

        <div
          className="progress-bar"
          style={{
            width: `${progress}%`
          }}
        />

      </div>

      <p>
        Прогресс: {progress}%
      </p>

      {currentQuestions.map(
        (question) => {

          const hasError =
            showErrors &&
            !answers[question.id]

          return (
            <div
              key={question.id}
              className={
                hasError
                  ? "card error-card"
                  : "card"
              }
            >

              <p>
                {
                  question.question_text
                }
              </p>

              <select
                value={
                  answers[
                    question.id
                  ] || ""
                }
                onChange={(e) =>
                  handleAnswer(
                    question.id,
                    e.target.value
                  )
                }
              >

                <option value="">
                  Выберите ответ
                </option>

                {getOptions(
                  question.question_type
                ).map((option) => (
                <option
                key={option.value} 
                value={option.value}
                >
                  {option.label}
                </option>
              ))}

              </select>

              {hasError && (
                <p className="error-text">
                  Ответ обязателен
                </p>
              )}

            </div>
          )
        }
      )}

      <div className="buttons">

        {currentPage > 0 && (

          <button
            onClick={previousPage}
          >
            Назад
          </button>

        )}

        {currentPage <
        totalPages - 1 ? (

          <button
            onClick={nextPage}
          >
            Далее
          </button>

        ) : (

          <button
            onClick={handleSubmit}
          >
            Завершить опрос
          </button>

        )}

      </div>

    </div>
  )
}