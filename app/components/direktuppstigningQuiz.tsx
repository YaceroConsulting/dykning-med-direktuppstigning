import {useEffect, useRef} from 'react'
import {Form} from "@remix-run/react";
import {CheckCircleIcon} from "@heroicons/react/20/solid";
import {SmallCards} from "~/components/smallCards";


type DiveGroupPracticeProps = {
    question: GroupQuestion
    reset: boolean
}

const numberFormatter = (number: number) => {
    return Intl.NumberFormat('sv', {minimumFractionDigits: 0, maximumFractionDigits: 1}).format(number).toString();
};

export function DirektuppstigningQuiz({question, reset}: DiveGroupPracticeProps) {
    const form = useRef(null);

    useEffect(() => {
        if (reset) {
            // @ts-expect-error - reset is a method
            form.current?.reset();
        }
    }, [reset]);

    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Form ref={form} method="POST">
                <div className="bg-white px-4 py-5 sm:px-6">
                    <h3 id="direktuppstigning"
                        className="text-base font-semibold leading-6 text-gray-900">Direktuppstigning</h3>
                    <p className="mt-6 text-xl leading-8 text-gray-700">
                        Dykning till ett djup av <strong>{numberFormatter(question.depth)} meter</strong> och
                        expositionstid <strong>{numberFormatter(question.time)} minuter</strong>.
                        Vilken gruppbeteckning är det?
                    </p>
                </div>
                <input name="depth" value={question.depth} readOnly hidden/>
                <input name="time" value={question.time} readOnly hidden/>

                <SmallCards/>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <button
                        type="submit"
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true"/>
                        Kontrollera svar
                    </button>
                </div>
            </Form>
        </div>
    )
}


type GroupQuestion = {
    depth: number
    time: number
}