import { DirektuppstigningQuiz } from '~/components/direktuppstigningQuiz'
import { useEffect, useState } from 'react'
import { checkDiveGroupAnswer, getDiveGroupQuestions } from '~/practice'
import { ClientActionFunctionArgs, useActionData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
    return [
        { title: 'Dyk app - Direktuppstigning' },
        {
            name: 'description',
            content:
                'Träna på expositionstid och gruppbeteckning efter dykning med direktuppstigning.',
        },
    ]
}
export const clientAction = async ({
    request,
}: ClientActionFunctionArgs): Promise<{
    correct: boolean
    answer: string
    depth?: number
    time?: number
}> => {
    const formData = await request.formData()
    invariant(formData.has('depth'), 'depth is required')
    invariant(formData.has('time'), 'time is required')
    const groupAnswer = formData.get('groupAnswer') as string
    if (groupAnswer) {
        const depth = parseFloat(formData.get('depth') as string)
        const time = parseInt(formData.get('time') as string)
        const correct = checkDiveGroupAnswer(depth, time, groupAnswer)
        if (correct) {
            const newQuestion = getDiveGroupQuestions()
            return { correct: true, answer: groupAnswer, ...newQuestion }
        }
    }
    return { correct: false, answer: groupAnswer }
}

export default function Direktuppstigning() {
    const [question, setQuestion] = useState(getDiveGroupQuestions())
    const [correct, setCorrect] = useState<string>('')
    const [incorrect, setIncorrect] = useState<string[]>([])
    const data = useActionData<typeof clientAction>()

    useEffect(() => {
        if (data && data.correct && data.depth && data.time && data) {
            setCorrect(data.answer)
            setTimeout(() => {
                setIncorrect([])
                setQuestion({
                    depth: Number(data.depth),
                    time: Number(data.time),
                })
                setCorrect('')
            }, 8000)
        }
        if (data && !data.correct) {
            setIncorrect((a) => [...a, data.answer])
            if ('vibrate' in navigator) {
                navigator.vibrate(100)
            }
        }
    }, [data])

    return (
        <div className="py-16">
            <main>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {question ? (
                        <DirektuppstigningQuiz
                            question={question}
                            correct={correct}
                            incorrect={incorrect}
                        />
                    ) : null}
                </div>
            </main>
        </div>
    )
}
