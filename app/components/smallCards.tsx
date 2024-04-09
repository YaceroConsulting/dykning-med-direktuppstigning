import {RadioGroup} from '@headlessui/react'

type GroupName = {
    name: string
}

const groupNames: Array<GroupName> = [
    {name: 'A'},
    {name: 'B'},
    {name: 'C'},
    {name: 'D'},
    {name: 'E'},
    {name: 'F'},
    {name: 'G'},
    {name: 'H'},
    {name: 'I'},
    {name: 'J'},
    {name: 'K'},
    {name: 'L'},
    {name: 'M'},
    {name: 'N'},
    {name: 'O'},
    {name: 'Z'},
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}



export function SmallCards() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium leading-6 text-gray-900">Svarsalternativ</h2>
            </div>

            <RadioGroup className="mt-2" name="groupAnswer">
                <RadioGroup.Label className="sr-only">Choose a diving group option</RadioGroup.Label>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {groupNames.map((option) => (
                        <RadioGroup.Option
                            key={option.name}
                            value={option.name}
                            className={({focus, checked}) =>
                                classNames(
                                    'cursor-pointer focus:outline-none',
                                    focus ? 'ring-2 ring-indigo-600 ring-offset-2' : '',
                                    checked
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                                        : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                                    'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1'
                                )
                            }
                        >
                            <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}
