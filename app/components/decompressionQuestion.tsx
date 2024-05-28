import { RemainingQuestion } from '~/practice'
import { useEffect, useState } from 'react'
import { Input } from '@headlessui/react'
import { classNames } from '~/components/libs'

type DecompressionQuestionProps = {
    group: RemainingQuestion
    depth: number
}

export function DecompressionQuestion({
    group,
    depth,
}: DecompressionQuestionProps) {
    const [maxExposition, setMaxExposition] = useState<number>()
    const [consumed, setConsumed] = useState<number>()
    const [remaining, setRemaining] = useState<number>(0)

    useEffect(() => {
        if (maxExposition && consumed) {
            setRemaining(maxExposition - consumed)
        }
    }, [maxExposition, consumed])

    return (
        <>
            <p className="text-gray-700">
                Från L-Tabellen räkna fram maximal dyktid för andra dykning ner
                till {depth} meter.
            </p>
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
                value={group.diveTimeAtDepth}
            />

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2 sm:col-start-1">
                    <label
                        htmlFor="max-exposition-answer"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Max expositionstid för djupet
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
                        <strong className="pl-4 text-gray-800 text-xl">
                            -
                        </strong>
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
                        <strong className="pl-4 text-gray-800 text-xl">
                            =
                        </strong>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label
                        htmlFor="remaining-exposition-answer"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Dyktid
                    </label>
                    <div className="mt-2">
                        <Input
                            type="text"
                            name="remaining-exposition-answer"
                            autoComplete="off"
                            readOnly
                            value={remaining}
                            className={classNames(
                                'block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                                (remaining ?? 0) > -1 ? '' : 'text-red-800'
                            )}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

type QuestionProps = DecompressionQuestionProps & {
    diveTime: number
}

export function MultilevelQuestion({ group, depth, diveTime }: QuestionProps) {
    return (
        <>
            <p className="text-gray-700">
                Från L-Tabellen fyll i värden för max kvarvarande expositionstid
                och förbrukad expositionstid för andra dykning ner till {depth}{' '}
                meter i {diveTime} minuter.
            </p>
            <input
                type="hidden"
                name="max-remaining"
                value={group.maxRemaining}
            />
            <input
                type="hidden"
                name="consumed-exposition"
                value={group.consumed}
            />

            <div className="flex flex-col max-w-sm sm:w-full">
                <div>
                    <label
                        htmlFor="max-exposition-answer"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Max kvarvarande expositionstid vid direktuppstigning
                    </label>
                    <div>
                        <Input
                            autoFocus
                            type="number"
                            min="1"
                            max="595"
                            name="max-remaining-answer"
                            autoComplete="off"
                            required
                            className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="consumed-exposition-answer"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Förbrukad expositionstid
                    </label>
                    <div>
                        <Input
                            type="number"
                            min="1"
                            max="595"
                            name="consumed-exposition-answer"
                            autoComplete="off"
                            required
                            className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
