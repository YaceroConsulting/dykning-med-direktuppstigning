export function HeroWithOffsetImage() {
    return (
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
            <div
                className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
                aria-hidden="true"
            />
            <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                    <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
                        Dykupp
                    </h1>
                    <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                        <p className="text-lg leading-8 text-gray-600">
                            Depths beckon, take care
                        </p>
                        <p className="text-lg leading-8 text-gray-600">
                            Respect the ocean&apos;s power
                        </p>
                        <p className="text-lg leading-8 text-gray-600">
                            Safe return, life&apos;s gift
                        </p>
                    </div>
                    <img
                        src="/dykupp/dykupp-start.jpg"
                        alt="Depths beckon, they call Kirby Morgan, trusted guide Exploring the deep"
                        className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
                    />
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>
    )
}
