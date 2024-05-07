import {Button, Input} from '@headlessui/react'
import {getTwoDives, Group, Hej} from "~/practice";
import {ClientActionFunctionArgs, Form, useActionData, useLoaderData} from "@remix-run/react";
import {useEffect, useState} from "react";
import {AcademicCapIcon} from "@heroicons/react/20/solid";
import {GroupCombobox} from "~/components/smallCards";

export const clientLoader = async () => {
    return getTwoDives();
}

type Progress = {
    q1: boolean
    q2: boolean
    q3: boolean
    q4: boolean
}

export const clientAction = async ({request}: ClientActionFunctionArgs): Promise<{
    q1?: boolean
    q2?: boolean
    q3?: boolean
    q4?: boolean
}> => {
    const data = await request.formData()
    console.log("Form keys:",  [...data.keys()])

    const groupAnswerCorrectFor = (name: string) => String(data.get(`${name}-answer[name]`)).trim().toUpperCase() === String(data.get(name)).trim().toUpperCase()

    if (data.has("first-group")) {
        if (groupAnswerCorrectFor("first-group")) {
            return {q1: true}
        }
    } else if (data.has("second-group")) {
        if (groupAnswerCorrectFor("second-group")) {
            return {q2: true}
        }
    } else if (data.has('max-exposition-answer')) {
        const answerCorrect = (name: string) => Number(data.get(`${name}-answer`)) === Number(data.get(name))
        // ['full_name', 'max-exposition-answer', 'consumed-exposition-answer', 'remaining-exposition-answer']
        //const answer = Number(data.get('max-exposition-answer'))
        //const thirdGroup = Number(data.get('max-exposition'))
        //if (answer === thirdGroup) {
        if (answerCorrect('max-exposition') &&
            answerCorrect('consumed-exposition') &&
            answerCorrect('remaining-exposition')) {
            return {q3: true}
        }
    } else if (data.has("fourth-group")) {
        if (groupAnswerCorrectFor("fourth-group")) {
            return {q4: true}
        }
    }
    return {}
}


const timeFormat = new Intl.DateTimeFormat('sv-SE', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
})

export default function UpprepadeDyk() {
    const data = useLoaderData<typeof clientLoader>()
    const answerResult = useActionData<typeof clientAction>()
    const [progress, setProgress] = useState<Progress>({q1: false, q2: false, q3: false, q4: false})
    const [question, setQuestion] = useState<Hej>()

    useEffect(() => {
        //console.log("Data", data)
        console.log("Data2", answerResult)
        if (answerResult === undefined || answerResult.q4) {
            setQuestion(new Hej(data))
        }


        setProgress(p => ({...p, ...answerResult}))
    }, [data, answerResult]);


    if (!question) {
        return <div>Loading...</div>
    } else {
        const q1El = progress.q1 ? (<strong>{question.resurfaceGroup} - K</strong>) :
            (<strong>?</strong>)
        const q2El = progress.q2 ? (<strong>{question.secondDiveGroup} - J</strong>) :
            (<strong>?</strong>)
        const q3El = progress.q3 ? (<strong>{question.secondDiveGroup} - K</strong>) :
            (<strong>?</strong>)
        const q4El = progress.q4 ? (<strong>{question.secondResurfaceGroup} - K</strong>) :
            (<strong>?</strong>)
        return (


            <div className="py-16">
                <h1>Upprepade dyk</h1>
                <p>
                    Upprepade dyk är en av de vanligaste orsakerna till dykarsjuka. Det är viktigt att
                    för
                    att undvika dykarsjuka att inte dyka för djupt eller för länge. Det är också viktigt
                    att
                    ha tillräckligt långa yttider mellan dyken. Här kan du träna på att räkna ut hur
                    länge
                    du behöver vänta mellan dyken.
                </p>
                <h2>Två dyk</h2>
                <div className="grid grid-cols-6">
                    <div className="bg-gradient-to-b from-orange-200 to-white flex flex-col justify-between">
                        🌞
                        Start kl: {timeFormat.format(question?.startTime)}
                        <div className="transform scale-x-[-1] self-center">🛥️</div>
                    </div>
                    <div className="bg-gradient-to-b from-orange-200 to-white"/>
                    <div className="col-start-3 col-span-2 rounded">
                        <div className="flex justify-between p-3 bg-amber-300 border-b-4 border-b-blue-400">
                            <div className="flex flex-col gap-y-6">kl: {timeFormat.format(question?.resurfaceTime)}
                                {q1El}
                                <strong>{question?.resurfaceGroup} - K</strong>
                            </div>
                            <div className="self-center pt-4">{question.surfaceTime} 1:30</div>
                            <div
                                className="flex flex-col gap-y-6">kl: {timeFormat.format(question?.secondDiveStartTime)}
                                {q2El}
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-start-6 flex flex-col gap-y-6 p-3 bg-amber-300 rounded border-b-4 border-b-blue-400">kl: {timeFormat.format(question?.secondResurfaceTime)}
                        {q4El}
                    </div>
                    {/* rad 2 */}
                    <div
                        className="bg-gradient-to-t from-blue-500 to-blue-300  flex flex-col justify-between transform scale-x-[-1]">🐠
                        <div className="self-center">🐡</div>
                        <div className="self-end">🐟</div>
                    </div>
                    <div className="bg-blue-400 col-start-2 border-t-4 border-t-amber-300 flex flex-col justify-end">
                        18 m 🤿🪸
                        <div className="bg-blue-400">60 min</div>
                    </div>

                    <div className="bg-blue-400 col-start-5 border-t-4 border-t-amber-300">18 m
                        <div className="bg-blue-400">Max tid <strong>2 min</strong></div>
                        {q3El}
                        <div className="pt-4">+58 min
                            <div className="bg-blue-400">60 min</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-10 divide-y divide-gray-900/10">
                    <Form method="POST"
                          className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                        <div className="px-4 py-6 sm:p-8">
                            {progress.q1 ? null : <GroupQuestion
                                answer={question.resurfaceGroup}
                                name="first-group"
                                label="Du har just dykt i 18 meter i 60 minuter vilken grupp är detta?"
                            />}
                            {progress.q1 && !progress.q2 ?
                                <GroupQuestion
                                    answer={question.secondDiveGroup}
                                    name="second-group"
                                    label="Men en yttid på 1:30 vilken gruppbeteckning efter ytintervall?"
                                /> : null}
                            {progress.q1 && progress.q2 && !progress.q3 ?
                                <DecompressionQuestion
                                    group={data.group}
                                /> : null}
                            {progress.q1 && progress.q2 && progress.q3 && !progress.q4 ?
                                <GroupQuestion
                                    answer={question.secondResurfaceGroup}
                                    name="fourth-group"
                                    label="När du är uppe på ytan efter ditt andra dyk vilken ytgrupp?"
                                /> : null}
                            <div className="mt-3">
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about
                                yourself.</p>
                            <Button type="submit"
                                    className="rounded bg-indigo-600 py-2 px-4 text-sm text-white data-[hover]:bg-indgo-500 data-[active]:bg-indigo-700 w-40 flex justify-between">
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
    label: string
}

function GroupQuestion({answer, name, label}: GroupQuestionProps) {
    return (
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor={`${name}-answer[name]`} className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
                <input type="hidden" name={name} value={answer}/>
                <div className="mt-2 max-w-32">
                    <GroupCombobox name={`${name}-answer`}/>
                </div>
            </div>
        </div>
    )
}

function SecondGroupQuestion({answer}: { answer: string }) {
    return (
        <div>
            <h2>Inför andra dyket</h2>
            <p>
                Men en yttid på 1:30 vilken gruppbeteckning efter ytintervall?
            </p>
            <input type="hidden" name="second-group" value={answer}/>
            <input type="text" name="second-group-answer"/>
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
            <div className="bg-blue-400">Max tid <strong>2 min</strong></div>
            <div className="pt-4">+58 min
                <div className="bg-blue-400">60 min</div>
            </div>

            <input type="hidden" name="max-exposition" value={group.maxExposition}/>
            <input type="hidden" name="consumed-exposition" value={group.consumed}/>
            <input type="hidden" name="remaining-exposition" value={remaining}/>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="max-exposition-answer" className="block text-sm font-medium leading-6 text-gray-900">
                        Max exposition tid
                    </label>
                    <div className="mt-2 flex items-center gap-2">
                        <Input
                            type="number"
                            min="1"
                            max="595"
                            name="max-exposition-answer"
                            autoComplete="off"
                            required
                            onChange={e => setMaxExposition(Number(e.target.value))}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        -
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="consumed-exposition-answer" className="block text-sm font-medium leading-6 text-gray-900">
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
                            onChange={e => setConsumed(Number(e.target.value))}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        =
                    </div>

                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="remaining-exposition-answer" className="block text-sm font-medium leading-6 text-gray-900">
                        Kvarvarande expositionstid
                    </label>
                    <div className="mt-2">
                        <Input
                            type="text"
                            name="remaining-exposition-answer"
                            autoComplete="off"
                            readOnly
                            value={maxExposition && consumed ? remaining : ""}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
            </>
)
}

function FourthGroupQuestion({answer}: { answer: string }) {
    return (
        <div>
            <h2>Inför andra dyket</h2>
            <p>
                När du är uppe på ytan efter ditt andra dyk vilken ytgrupp?
            </p>
            <input type="hidden" name="fourth-group" value={answer}/>
            <input type="text" name="fourth-group-answer"/>
        </div>
    )
}