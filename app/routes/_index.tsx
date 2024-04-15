import type { MetaFunction } from '@remix-run/node'
import { DirektuppstigningQuiz } from '~/components/direktuppstigningQuiz'
import { ClientActionFunctionArgs, useActionData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import invariant from 'tiny-invariant'
import { checkDiveGroupAnswer, getDiveGroupQuestions } from '~/practice'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { HeroWithOffsetImage } from '~/components/heroWithImage'

export const meta: MetaFunction = () => {
    return [
        { title: 'Direktuppstigning' },
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
            return { correct: true, ...newQuestion }
        }
    }
    return { correct: false }
}

export default function Index() {
    const [question, setQuestion] = useState(getDiveGroupQuestions())
    const [invalid, setInvalid] = useState(0)
    const data = useActionData<typeof clientAction>()

    useEffect(() => {
        if (data && data.correct && data.depth && data.time && data) {
            setQuestion({ depth: data.depth, time: data.time })
            setInvalid(0)
        }
        if (data && data.correct === false) {
            setInvalid((i) => i + 1)
            if ('vibrate' in navigator) {
                navigator.vibrate(100)
            }
        }
    }, [data])

    const invalidEl = Array.from({ length: invalid }).map((_, index) => (
        <div
            key={index}
            className="border-solid border-2 border-pink-200 rounded shadow"
        >
            <XMarkIcon className="h-6 w-6 text-pink-500" />
        </div>
    ))

    return (
        <main className="isolate">
            <HeroWithOffsetImage />

            {question ? (
                <DirektuppstigningQuiz
                    question={question}
                    reset={invalid === 0}
                />
            ) : null}

            <div className="mx-auto mt-6 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none flex items-center justify-center space-x-3">
                {invalidEl}
            </div>
        </main>
    )
}
