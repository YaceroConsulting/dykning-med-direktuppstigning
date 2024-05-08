import { Button, Input } from '@headlessui/react'
import { getTwoDives, Group, Hej } from '~/practice'
import {
    ClientActionFunctionArgs,
    Form,
    useActionData,
    useLoaderData,
} from '@remix-run/react'
import { useEffect, useState } from 'react'
import { AcademicCapIcon } from '@heroicons/react/20/solid'
import { GroupCombobox } from '~/components/smallCards'
import {classNames} from "~/components/libs";

export const clientLoader = async () => {
    return getTwoDives()
}

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
        return groupAnswerLowFor('first-group') ? {correction: LOW_GROUP} : {correction: HIGH_GROUP}
    } else if (data.has('second-group')) {
        if (groupAnswerCorrectFor('second-group')) {
            return { q2: true }
        }
        return groupAnswerLowFor('second-group') ? {correction: LOW_GROUP} : {correction: HIGH_GROUP};
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
        console.log(data.get('remaining-exposition-answer'), data.get('remaining-exposition'))
        return answerLow('remaining-exposition') ? {correction: `Max kvarvarande expositionstid ${data.get('remaining-exposition-answer')} minuter är för låg`} : {correction: `Max kvarvarande expositionstid ${data.get('remaining-exposition-answer')} minuter är för hög`};
    } else if (data.has('fourth-group')) {
        if (groupAnswerCorrectFor('fourth-group')) {
            return { q4: true }
        }
        return groupAnswerLowFor('fourth-group') ? {correction: LOW_GROUP} : {correction: HIGH_GROUP};
    }
    return {}
}

const timeFormat = new Intl.DateTimeFormat('sv-SE', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
})

export default function UpprepadeDyk() {
    const data = useLoaderData<typeof clientLoader>()
    const answerResult = useActionData<typeof clientAction>()
    const [progress, setProgress] = useState<Progress>({
        q1: false,
        q2: false,
        q3: false,
        q4: false,
    })
    const [question, setQuestion] = useState<Hej>()

    useEffect(() => {
        //console.log("Data", data)
        console.log('Data2', answerResult)
        if (answerResult === undefined || answerResult.q4) {
            setQuestion(new Hej(data))
        }

        if (!answerResult?.correction) {
            setProgress((p) => ({...p, ...answerResult}))
        }
    }, [data, answerResult])

    if (!question) {
        return <div>Loading...</div>
    } else {
        const q1El = progress.q1 ? (
            <strong>{question.resurfaceGroup}</strong>
        ) : (
            <strong>?</strong>
        )
        const q2El = progress.q2 ? (
            <strong>{question.secondDiveGroup}</strong>
        ) : (
            <strong>?</strong>
        )
        const q3El = progress.q3 ? (
            <div>
                18 m
                <div className="">
                    Max tid <strong>{data.group.maxRemaining} min</strong>
                </div>
                <div className="pt-4">
                    +{data.group.consumed} min
                    <div className="">{data.group.maxExposition} min</div>
                </div>
            </div>
        ) : (
            <div>
                18 m
                <div className="">
                    Max tid <strong>?</strong> min
                </div>
                <div className="pt-4">
                    +? min
                    <div className="">? min</div>
                </div>
            </div>
        )
        const q4El = progress.q4 ? (
            <strong>{question.secondResurfaceGroup}</strong>
        ) : (
            <strong>?</strong>
        )

        //debugger
        const hejEl = answerResult?.correction ? (
            <p className="mt-3 text-sm leading-6 text-red-600">
                {answerResult.correction}
            </p>
        ) : null

        return (
            <div className="py-16">
                <h1>Upprepade dyk</h1>
                <p>
                    ...
                </p>
                <div className="grid grid-cols-6">
                    <div className="bg-gradient-to-b from-orange-200 to-white flex flex-col justify-between">
                        🌞 Start kl: {timeFormat.format(question?.startTime)}
                        <div className="transform scale-x-[-1] self-center">
                            🛥️
                        </div>
                    </div>
                    <div className="bg-gradient-to-b from-orange-200 to-white"/>
                    <div className="bg-gradient-to-b from-orange-200 to-white col-start-3 col-span-2">
                        <div className="flex justify-between p-3 ">
                            <div className="flex flex-col gap-y-6">
                                kl: {timeFormat.format(question?.resurfaceTime)}
                                {q1El}
                            </div>
                            <div className="self-center pt-4">
                                {question.surfaceTime} 1:30
                            </div>
                            <div className="flex flex-col gap-y-6">
                                kl:{' '}
                                {timeFormat.format(
                                    question?.secondDiveStartTime
                                )}
                                {q2El}
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-b from-orange-200 to-white"/>
                    <div className="col-start-6 flex flex-col gap-y-6 p-3 bg-gradient-to-b from-orange-200 to-white">
                        kl: {timeFormat.format(question?.secondResurfaceTime)}
                        {q4El}
                    </div>
                    {/* rad 2 */}
                    <div
                        className="bg-gradient-to-t from-blue-500 to-blue-300  flex flex-col justify-between p-4">
                        <div className="self-end transform scale-x-[-1]">🐠</div>
                        <div className="self-center transform scale-x-[-1]">🐡</div>
                        <div className="self-start transform scale-x-[-1]">🐟</div>
                    </div>
                    <div className="bg-gradient-to-t from-blue-500 to-blue-300 flex flex-col justify-end col-span-3">
                        18 m 🤿🪸
                        <div className="">60 min</div>

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
                                    question="Du dyker ner till 18 meter i 60 minuter vilken gruppbeteckning före ytintervall är det?"
                                    extra="Uppstigningstid ca 2 minuter"
                                />
                            )}
                            {progress.q1 && !progress.q2 ? (
                                <GroupQuestion
                                    answer={question.secondDiveGroup}
                                    name="second-group"
                                    question="Men en yttid på 1:30 vilken gruppbeteckning efter ytintervall?"
                                />
                            ) : null}
                            {progress.q1 && progress.q2 && !progress.q3 ? (
                                <DecompressionQuestion group={data.group} />
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
                            <div className="mt-3">
                                {hejEl}
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
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

type GroupQuestionProps = {
    answer: string
    name: string
    question: string
    extra?: string
}

function GroupQuestion({ answer, name, question, extra }: GroupQuestionProps) {
    return (
        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
                <label
                    htmlFor={`${name}-answer[name]`}
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {question}
                </label>
                {extra ? (
                    <p className="text-sm leading-6 text-gray-600">{extra}</p>
                ) : null}
                <input type="hidden" name={name} value={answer}/>
                <div className="mt-2 max-w-32">
                    <GroupCombobox name={`${name}-answer`}/>
                </div>
            </div>
        </div>
    )
}


type DecompressionQuestionProps = {
    group: Group
}

function DecompressionQuestion({group}: DecompressionQuestionProps) {
    const [maxExposition, setMaxExposition] = useState<number>()
    const [consumed, setConsumed] = useState<number>()
    const [remaining, setRemaining] = useState<number>()

    useEffect(() => {
        if (maxExposition && consumed) {
            setRemaining(maxExposition - consumed)
        }
    }, [maxExposition, consumed])

    return (
        <>
            <p className="text-gray-700">Räkna ut maximal expositionstid från L-Tabell</p>
            <input
                type="hidden"
                name="max-exposition"
                value={group.maxExposition}
            />
            <input
                type="hidden"
                name="consumed-exposition"
                value={group.consumed}
            />
            <input
                type="hidden"
                name="remaining-exposition"
                value={group.maxRemaining}
            />

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2 sm:col-start-1">
                    <label
                        htmlFor="max-exposition-answer"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Max exposition tid
                    </label>
                    <div className="mt-2 flex items-center gap-2">
                        <Input
                            autoFocus
                            type="number"
                            min="1"
                            max="595"
                            name="max-exposition-answer"
                            autoComplete="off"
                            required
                            onChange={(e) =>
                                setMaxExposition(Number(e.target.value))
                            }
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        -
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label
                        htmlFor="consumed-exposition-answer"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Förbrukad expositionstid
                    </label>
                    <div className="mt-2 flex items-center gap-2">
                        <Input
                            type="number"
                            min="1"
                            max="595"
                            name="consumed-exposition-answer"
                            autoComplete="off"
                            required
                            onChange={(e) =>
                                setConsumed(Number(e.target.value))
                            }
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        =
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label
                        htmlFor="remaining-exposition-answer"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Kvarvarande expositionstid
                    </label>
                    <div className="mt-2">
                        <Input
                            type="text"
                            name="remaining-exposition-answer"
                            autoComplete="off"
                            readOnly
                            value={maxExposition && consumed ? remaining : ''}
                            className={classNames("block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6", (remaining ?? 0) > -1 ? "": "text-red-800")}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
