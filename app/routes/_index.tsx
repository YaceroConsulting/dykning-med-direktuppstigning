import type {MetaFunction} from "@remix-run/node";
import {DirektuppstigningQuiz} from "~/components/direktuppstigningQuiz";
import {ClientActionFunctionArgs, useActionData} from "@remix-run/react";
import {useEffect, useState} from "react";
import invariant from "tiny-invariant";
import {checkDiveGroupAnswer, getDiveGroupQuestions} from "~/practice";
import {XMarkIcon} from '@heroicons/react/24/solid';

export const meta: MetaFunction = () => {
    return [
        {title: "Dive group practice SPA"},
        {name: "description", content: "Välkommen till ..."},
    ];
};

export const clientAction = async ({request}: ClientActionFunctionArgs): Promise<{
    correct: boolean,
    depth?: number,
    time?: number
}> => {
    const formData = await request.formData();
    invariant(formData.has("depth"), "depth is required");
    invariant(formData.has("time"), "time is required");
    const groupAnswer = formData.get("groupAnswer") as string;
    if (groupAnswer) {
        const depth = parseFloat(formData.get("depth") as string);
        const time = parseInt(formData.get("time") as string);
        const correct = checkDiveGroupAnswer(depth, time, groupAnswer);
        if (correct) {
            const newQuestion = getDiveGroupQuestions();
            return {correct: true, ...newQuestion};
        }
    }
    return {correct: false};
};


export default function Index() {
    const [question, setQuestion] = useState(getDiveGroupQuestions());
    const [invalid, setInvalid] = useState(0);
    const data = useActionData<typeof clientAction>();

    useEffect(() => {
        if (data && data.correct && data.depth && data.time && data) {
            setQuestion({depth: data.depth, time: data.time});
            setInvalid(0)
        }
        if (data && data.correct === false) {
            setInvalid(i => i + 1);
        }
    }, [data]);


    const invalidEl = Array.from({length: invalid}).map((_, index) => (
        <div key={index} className="border-solid border-2 border-pink-200 rounded shadow">
            <XMarkIcon className="h-6 w-6 text-pink-500"/>
        </div>
    ));

    return (
        <main className="isolate">
            <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
                <div
                    className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
                    aria-hidden="true"
                />
                <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
                    <div
                        className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
                            Dykning med direktuppstigning
                        </h1>
                        <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                            <p className="text-lg leading-8 text-gray-600">
                                Maximal expositionstid samt gruppbeteckning efter dykning med direktuppstigning
                            </p>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32"/>
            </div>

            {question ?
                <DirektuppstigningQuiz question={question} reset={invalid === 0}/>
                : null}

            <div className="mx-auto mt-6 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none flex flex-wrap items-center place-content-center gap-2 space-x-3">
                {invalidEl}
            </div>

        </main>
    );
}
