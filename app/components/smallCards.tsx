import { Radio, RadioGroup, Label } from '@headlessui/react'
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import {
    Combobox,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/react'
import {
    CheckIcon,
    ChevronUpDownIcon,
} from '@heroicons/react/20/solid'
import { useState } from 'react'
import {classNames} from "~/components/libs";

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
        <>
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium leading-6 text-gray-900">
                    {header}
                </h2>
            </div>

            <RadioGroup className="mt-2" name="groupAnswer">
                <Label className="sr-only">{readerLabel}</Label>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {groupNames.map((option) => (
                        <Radio
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
                                <Label as="span" className="">
                                    {option.name}
                                </Label>
                            </div>
                        </Radio>
                    ))}
                </div>
            </RadioGroup>
        </>
    )
}

export function GroupCombobox({ name }: { name: string }) {
    const [query, setQuery] = useState('')
    const [selectedGroup, setSelectedGroup] = useState(null)

    const filteredPeople =
        query === ''
            ? groupNames
            : groupNames.filter((group) => {
                  return group.name.toLowerCase().includes(query.toLowerCase())
              })

    console.log('group name', name)
    return (
        <Combobox
            name={name}
            value={selectedGroup}
            onChange={(group) => {
                setQuery('')
                setSelectedGroup(group)
            }}
        >
            <div className="relative mt-2">
                <ComboboxInput
                    autoFocus
                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    autoComplete="off"
                    onChange={(event) => setQuery(event.target.value)}
                    onBlur={() => setQuery('')}
                    displayValue={(group) => group?.name}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </Combobox.Button>

                {filteredPeople.length > 0 && (
                    <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredPeople.map((group) => (
                            <ComboboxOption
                                key={group.name}
                                value={group}
                                className={({ active }) =>
                                    classNames(
                                        'relative cursor-default select-none py-2 pl-3 pr-9',
                                        active
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-gray-900'
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <span
                                            className={classNames(
                                                'block truncate',
                                                selected && 'font-semibold'
                                            )}
                                        >
                                            {group.name}
                                        </span>

                                        {selected && (
                                            <span
                                                className={classNames(
                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                    active
                                                        ? 'text-white'
                                                        : 'text-indigo-600'
                                                )}
                                            >
                                                <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        )}
                                    </>
                                )}
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                )}
            </div>
        </Combobox>
    )
}
