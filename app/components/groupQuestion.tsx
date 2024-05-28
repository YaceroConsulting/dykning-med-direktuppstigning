import { GroupCombobox } from '~/components/smallCards'

type GroupQuestionProps = {
    answer: string
    name: string
    question: string
    extra?: string
}

export function GroupQuestion({
    answer,
    name,
    question,
    extra,
}: GroupQuestionProps) {
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
                <input type="hidden" name={name} value={answer} />
                <div className="mt-2 max-w-32">
                    <GroupCombobox name={`${name}-answer`} />
                </div>
            </div>
        </div>
    )
}
