import { RadioGroup } from '@headlessui/react'
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid'

type GroupName = {
    name: string
}

const groupNames: Array<GroupName> = [
    { name: 'A' },
    { name: 'B' },
    { name: 'C' },
    { name: 'D' },
    { name: 'E' },
    { name: 'F' },
    { name: 'G' },
    { name: 'H' },
    { name: 'I' },
    { name: 'J' },
    { name: 'K' },
    { name: 'L' },
    { name: 'M' },
    { name: 'N' },
    { name: 'O' },
    { name: 'Z' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

type SmallCardsProps = {
    header: string
    readerLabel: string
    correct: string
    incorrect: string[]
}

export function SmallCards({
    header = 'Svarsalternativ',
    readerLabel = 'Choose a diving group option',
    correct,
    incorrect,
}: SmallCardsProps) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium leading-6 text-gray-900">
                    {header}
                </h2>
            </div>

            <RadioGroup className="mt-2" name="groupAnswer">
                <RadioGroup.Label className="sr-only">
                    {readerLabel}
                </RadioGroup.Label>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {groupNames.map((option) => (
                        <RadioGroup.Option
                            key={option.name}
                            value={option.name}
                            disabled={correct !== ''}
                            className={({ focus, checked }) =>
                                classNames(
                                    'cursor-pointer focus:outline-none',
                                    focus
                                        ? 'ring-2 ring-indigo-600 ring-offset-2'
                                        : '',
                                    checked
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                                        : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                                    'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1'
                                )
                            }
                        >
                            <div className="flex w-fulls justify-center items-center space-x-3">
                                {correct === option.name && (
                                    <div className="text-emerald-500">
                                        <CheckCircleIcon className="h-5 w-5" />
                                    </div>
                                )}
                                {incorrect?.includes(option.name) && (
                                    <div className="text-red-500">
                                        <XCircleIcon className="h-5 w-5" />
                                    </div>
                                )}
                                <RadioGroup.Label as="span" className="">
                                    {option.name}
                                </RadioGroup.Label>
                            </div>
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}
