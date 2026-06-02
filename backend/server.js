import express from 'express'

import cors from 'cors'

import dotenv from 'dotenv'

import pool from './db.js'

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API works')
})

app.get('/survey', async (req, res) => {
  try {
    const random = Math.random()

    const groupCode =
      random < 0.5
        ? 'FPS'
        : 'RPG'

    const groupResult =
      await pool.query(
        `
        SELECT *
        FROM survey_groups
        WHERE code = $1
        `,
        [groupCode]
      )

    const group =
      groupResult.rows[0]

    const questionsResult =
      await pool.query(
        `
        SELECT
            q.id,
            q.question_type,

            m.name AS mechanic,
            m.category,

            qv.question_text

        FROM questions q

        JOIN mechanics m
            ON q.mechanic_id = m.id

        JOIN question_variants qv
            ON q.id = qv.question_id

        WHERE qv.group_id = $1

        ORDER BY
        m.display_order,
        q.id
        `,
        [group.id]
      )

    res.json({
      group: group.code,

      questions:
        questionsResult.rows
    })
  }
  catch (error) {
    console.error(error)

    res.status(500).json({
      success: false
    })
  }
})

app.post('/submit', async (req, res) => {
  try {
    const {
      group,
      answers, 
      sessionId
    } = req.body

    const groupResult =
      await pool.query(
        `
        SELECT id
        FROM survey_groups
        WHERE code = $1
        `,
        [group]
      )

    const groupId =
      groupResult.rows[0].id

    const sessionResult = await pool.query(
        `
        INSERT INTO survey_sessions (
        group_id,
        session_uuid
        )
        VALUES ($1, $2)
        RETURNING *
        `,
        [groupId, sessionId]
    )

    const session =
      sessionResult.rows[0]

    for (
      const questionId in answers
    ) {
      await pool.query(
        `
        INSERT INTO survey_answers (
            session_id,
            question_id,
            answer
        )
        VALUES ($1, $2, $3)
        `,
        [
          session.id,
          questionId,
          answers[questionId]
        ]
      )
    }

    res.json({
      success: true
    })
  }
  catch (error) {
    console.error(error)

    res.status(500).json({
      success: false
    })
  }
})

app.get('/analytics', async (req, res) => {
  try {
    const mechanicsStats = await pool.query(`
      SELECT
        m.name,
        m.category,
        AVG(sa.answer) as avg_score,
        COUNT(*) as responses
      FROM survey_answers sa
      JOIN questions q ON sa.question_id = q.id
      JOIN mechanics m ON q.mechanic_id = m.id
      GROUP BY m.name, m.category
      ORDER BY avg_score DESC
    `)

    const groupComparison = await pool.query(`
      SELECT
        g.code as group,
        AVG(sa.answer) as avg_score
      FROM survey_answers sa
      JOIN survey_sessions ss ON sa.session_id = ss.id
      JOIN survey_groups g ON ss.group_id = g.id
      GROUP BY g.code
    `)
    
    const worstQuestions = await pool.query(`
      SELECT
        qv.question_text,
        AVG(sa.answer) as avg_score
      FROM survey_answers sa
      JOIN questions q ON sa.question_id = q.id
      JOIN question_variants qv ON q.id = qv.question_id
      GROUP BY qv.question_text
      ORDER BY avg_score ASC
      LIMIT 5
    `)

    res.json({
      mechanicsStats: mechanicsStats.rows,
      groupComparison: groupComparison.rows,
      worstQuestions: worstQuestions.rows
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: true })
  }
})

const PORT =
  process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  )
})