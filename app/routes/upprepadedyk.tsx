import { Button, Input } from '@headlessui/react'
import {
    repeatedDives,
    RemainingQuestion,
    RepeatedDive,
    TwoDives,
    getTwoDives_multilevel,
} from '~/practice'
import {
    ClientActionFunctionArgs,
    ClientLoaderFunctionArgs,
    Form,
    useActionData,
    useLoaderData,
    useSearchParams,
} from '@remix-run/react'
import { useEffect, useState } from 'react'
import { AcademicCapIcon, ArrowPathIcon } from '@heroicons/react/20/solid'
import { GroupCombobox } from '~/components/smallCards'
import { classNames } from '~/components/libs'
import {
    DecompressionQuestion,
    MultilevelQuestion,
} from '~/components/decompressionQuestion'
import { GroupQuestion } from '~/components/groupQuestion'

/*export const clientLoader = async ({request} : ClientLoaderFunctionArgs) => {
    const { searchParams } = new URL(request.url);
    searchParams.has("djup");
    let query = searchParams.get("djup");
    console.log('Client loader', query)
    return getTwoDives()
}*/

type Progress = {
    q1: boolean
    q2: boolean
    q3: boolean
    q4: boolean
}

export const clientAction = async ({
    request,
}: ClientActionFunctionArgs): Promise<{
    q1?: boolean
    q2?: boolean
    q3?: boolean
    q4?: boolean
    correction?: string
    newQuestion?: TwoDives
}> => {
    const data = await request.formData()
    console.log('Form keys:', [...data.keys()])

    const groupAnswerCorrectFor = (name: string) =>
        String(data.get(`${name}-answer[name]`))
            .trim()
            .toUpperCase() === String(data.get(name)).trim().toUpperCase()
    const groupAnswerLowFor = (name: string) =>
        String(data.get(`${name}-answer[name]`))
            .trim()
            .toUpperCase() < String(data.get(name)).trim().toUpperCase()
    const LOW_GROUP = 'Svaret på gruppbeteckningen är högre'
    const HIGH_GROUP = 'Svaret på gruppbeteckningen är lägre'

    if (data.has('first-group')) {
        if (groupAnswerCorrectFor('first-group')) {
            return { q1: true }
        }
        return groupAnswerLowFor('first-group')
            ? { correction: LOW_GROUP }
            : { correction: HIGH_GROUP }
    } else if (data.has('second-group')) {
        if (groupAnswerCorrectFor('second-group')) {
            return { q2: true }
        }
        return groupAnswerLowFor('second-group')
            ? { correction: LOW_GROUP }
            : { correction: HIGH_GROUP }
    } else if (data.has('max-exposition-answer')) {
        const answerCorrect = (name: string) =>
            Number(data.get(`${name}-answer`)) === Number(data.get(name))
        const answerLow = (name: string) =>
            Number(data.get(`${name}-answer`)) < Number(data.get(name))
        if (
            answerCorrect('max-exposition') &&
            answerCorrect('consumed-exposition') &&
            answerCorrect('remaining-exposition')
        ) {
            return { q3: true }
        }

        if (
            data.get('remaining-exposition-answer') ===
            data.get('remaining-exposition')
        ) {
            return {
                correction:
                    'Kvarvarande expositionstid är korrekt, men det är ej de förväntade värdena från dekompressionstabellen som angivits.',
            }
        } else {
            return answerLow('remaining-exposition')
                ? {
                      correction: `Max kvarvarande expositionstid ${data.get('remaining-exposition-answer')} minuter är för låg`,
                  }
                : {
                      correction: `Max kvarvarande expositionstid ${data.get('remaining-exposition-answer')} minuter är för hög`,
                  }
        }
    } else if (data.has('max-remaining')) {
        const answerCorrect = (name: string) =>
            Number(data.get(`${name}-answer`)) === Number(data.get(name))
        const answerLow = (name: string) =>
            Number(data.get(`${name}-answer`)) < Number(data.get(name))
        const remining = answerCorrect('max-remaining')
        const consumed = answerCorrect('consumed-exposition')
        if (remining && consumed) {
            return { q3: true }
        } else {
            if (remining && !consumed) {
                return {
                    correction: `Förbrukad expositionstid är ${answerLow('consumed-exposition') ? 'för låg' : 'för hög'} `,
                }
            } else if (!remining && consumed) {
                return {
                    correction: `Max kvarvarande expositionstid är ${answerLow('max-remaining') ? 'för låg' : 'för hög'}`,
                }
            } else {
                return {
                    correction: `Max kvarvarande expositionstid är ${answerLow('max-remaining') ? 'för låg' : 'för hög'} och förbrukad expositionstid är ${answerLow('consumed-exposition') ? 'för låg' : 'för hög'}`,
                }
            }
        }
        //return {q3: remining && consumed}
    } else if (data.has('fourth-group')) {
        if (groupAnswerCorrectFor('fourth-group')) {
            return { q4: true }
        }
        return groupAnswerLowFor('fourth-group')
            ? { correction: LOW_GROUP }
            : { correction: HIGH_GROUP }
    } else if (data.has('new-question')) {
        return { newQuestion: repeatedDives(Number(data.get('new-question'))) }
    }
    return {}
}

const timeFormat = new Intl.DateTimeFormat('sv-SE', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
})

const NO_PROGRESS: Progress = {
    q1: false,
    q2: false,
    q3: false,
    q4: false,
}

export default function UpprepadeDyk() {
    //const data = useLoaderData<typeof clientLoader>()
    const answerResult = useActionData<typeof clientAction>()
    const [progress, setProgress] = useState<Progress>(NO_PROGRESS)
    const [question, setQuestion] = useState<RepeatedDive>(
        new RepeatedDive(repeatedDives())
    )
    const [questions, setQuestions] = useState(0)
    //const [searchParams, setSearchParams] = useSearchParams()

    // console.log(progress)
    useEffect(() => {
        if (answerResult) {
            if (answerResult.newQuestion !== undefined) {
                setProgress(NO_PROGRESS)
                setQuestion(new RepeatedDive(answerResult.newQuestion))
                setQuestions((q) => q + 1)
            } else if (
                answerResult.q1 ||
                answerResult.q2 ||
                answerResult.q3 ||
                answerResult.q4
            ) {
                setProgress((p) => ({ ...p, ...answerResult }))
            }
        }
    }, [answerResult])

    if (!question) {
        return <div>Laddar innehåll...</div>
    } else {
        const q1El = progress.q1 ? (
            <strong>{question.resurfaceGroup}</strong>
        ) : (
            <strong className="animate-bounce">?</strong>
        )
        const q2El = progress.q2 ? (
            <>
                Dykstart {timeFormat.format(question?.secondDiveStartTime)}
                <strong className="self-end">{question.secondDiveGroup}</strong>
            </>
        ) : (
            <div className="min-w-10 flex justify-end h-full">
                <strong
                    className={classNames(
                        'content-end self-end',
                        progress.q1 && 'animate-bounce'
                    )}
                >
                    ?
                </strong>
            </div>
        )
        const q3El = progress.q3 ? (
            <div>
                <div>
                    Dyktid{' '}
                    <strong>{question.secondDiveMaxRemaining} min</strong>
                </div>
                <div className="pt-4">
                    <strong>+</strong>
                    {question.penaltyTime} min
                    <div>
                        <strong>=</strong>
                        {question.secondDiveMaxExposition} min
                    </div>
                </div>
                <div>Djup {question.secondDiveDepth} m</div>
            </div>
        ) : (
            <div
                className={classNames(
                    progress.q1 && progress.q2 && 'animate-pulse'
                )}
            >
                <div>
                    Dyktid{' '}
                    <strong>
                        {question.secondDiveMaxQuestion
                            ? '?'
                            : question.secondDiveMaxRemaining}{' '}
                        min
                    </strong>
                </div>
                <div className="pt-4">
                    +<strong>?</strong> min
                    <div>
                        =<strong>?</strong> min
                    </div>
                </div>
                <div>Djup {question.secondDiveDepth} m</div>
            </div>
        )
        const q4El = progress.q4 ? (
            <div className="flex flex-col gap-y-6">
                Yta {timeFormat.format(question?.secondResurfaceTime)}
                <strong>{question.secondResurfaceGroup}</strong>
            </div>
        ) : (
            <div
                className={classNames(
                    'min-w-10 flex h-full',
                    progress.q1 &&
                        progress.q2 &&
                        progress.q3 &&
                        'animate-bounce'
                )}
            >
                <strong className="content-end">?</strong>
            </div>
        )

        //debugger
        const answerCorrectionEl = answerResult?.correction ? (
            <p className="mt-3 text-sm leading-6 text-red-600">
                {answerResult.correction}
            </p>
        ) : null

        const completed =
            progress.q1 && progress.q2 && progress.q3 && progress.q4
        return (
            <div className="py-16">
                <h1>Upprepade dyk</h1>
                <p>...</p>
                <div className="grid grid-cols-6">
                    <div className="bg-gradient-to-b from-orange-200 to-white flex flex-col justify-between">
                        🌞 Dykstart {timeFormat.format(question?.startTime)}
                        <div className="transform scale-x-[-1] self-center">
                            🛥️
                        </div>
                    </div>
                    <div className="bg-gradient-to-b from-orange-200 to-white" />
                    <div className="bg-gradient-to-b from-orange-200 to-white col-start-3 col-span-2">
                        <div className="flex justify-between p-3 ">
                            <div className="flex flex-col gap-y-6">
                                Yta {timeFormat.format(question?.resurfaceTime)}
                                {q1El}
                            </div>
                            <div className="self-center pt-4">
                                Yttid {question.surfaceTime}
                            </div>
                            <div className="flex flex-col gap-y-6">{q2El}</div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-b from-orange-200 to-white" />
                    <div className="col-start-6 flex flex-col gap-y-6 p-3 bg-gradient-to-b from-orange-200 to-white">
                        {q4El}
                    </div>
                    {/* rad 2 */}
                    <div className="bg-gradient-to-t from-blue-500 to-blue-300" />
                    <div className="bg-gradient-to-t from-blue-500 to-blue-300 flex flex-col justify-end col-span-1">
                        <div>{question.firstDiveTime} min</div>
                        <div>Djup {question.firstDiveDepth} m</div>
                    </div>
                    <div className="bg-gradient-to-t from-blue-500 to-blue-300  flex flex-col justify-between p-4 col-span-2">
                        <div className="self-end">🐠</div>
                        <div className="self-center scale-125">🐡</div>
                        <div className="self-start scale-150">🐟</div>
                    </div>

                    <div className="bg-gradient-to-t from-blue-500 to-blue-300 col-start-5 col-span-2">
                        {q3El}
                    </div>
                </div>

                <div className="space-y-10 divide-y divide-gray-900/10">
                    <Form
                        method="POST"
                        className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
                    >
                        <div className="px-4 py-6 sm:p-8">
                            {progress.q1 ? null : (
                                <GroupQuestion
                                    answer={question.resurfaceGroup}
                                    name="first-group"
                                    question={`Du dyker ner till ${question.firstDiveDepth} meter i ${question.firstDiveTime} minuter vilken gruppbeteckning vid ytan har du?`}
                                    extra="Uppstigningstid ca 2 minuter"
                                />
                            )}
                            {progress.q1 && !progress.q2 ? (
                                <GroupQuestion
                                    answer={question.secondDiveGroup}
                                    name="second-group"
                                    question={`Men en yttid på ${question.surfaceTime} sedan föregående dyk, vilken gruppbeteckning har du vid nedstigning?`}
                                />
                            ) : null}
                            {progress.q1 && progress.q2 && !progress.q3 ? (
                                question.secondDiveMaxQuestion ? (
                                    <DecompressionQuestion
                                        group={question.group}
                                        depth={question.secondDiveDepth}
                                    />
                                ) : (
                                    <MultilevelQuestion
                                        group={question.group}
                                        depth={question.secondDiveDepth}
                                        diveTime={
                                            question.secondDiveMaxRemaining
                                        }
                                    />
                                )
                            ) : null}
                            {progress.q1 &&
                            progress.q2 &&
                            progress.q3 &&
                            !progress.q4 ? (
                                <GroupQuestion
                                    answer={question.secondResurfaceGroup}
                                    name="fourth-group"
                                    question="Efter det andra dyket vilken gruppbeteckning före ytintervall är det?"
                                    extra="Uppstigningstid ca 2 minuter"
                                />
                            ) : null}
                            {completed ? (
                                <div className="">
                                    <p className="text-gray-700">
                                        Du har svarat rätt på alla frågor 🎉
                                    </p>
                                    <input value={questions} type="hidden" name="new-question" />
                                    <Button
                                        type="submit"
                                        className="rounded bg-indigo-600 py-2 px-4 text-sm text-white data-[hover]:bg-indgo-500 data-[active]:bg-indigo-700 flex gap-2 justify-between"
                                    >
                                        <ArrowPathIcon
                                            className="-ml-0.5 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        Ny fråga
                                    </Button>
                                </div>
                            ) : (
                                <div className="mt-3">
                                    {answerCorrectionEl}
                                    <Button
                                        type="submit"
                                        className="rounded bg-indigo-600 py-2 px-4 text-sm text-white data-[hover]:bg-indgo-500 data-[active]:bg-indigo-700 w-40 flex justify-between"
                                    >
                                        <AcademicCapIcon
                                            className="-ml-0.5 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        Kontrollera svar
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}
