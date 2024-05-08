export default function Om() {
    return (
        <main>
            <TeamSection
                heading="Möt teamet"
                description="Vi som gjorde det här projektet möjligt."
                people={people}
            />

            <Flaticon />
        </main>
    )
}

function Flaticon() {
    return (
        <div className="bg-white px-6 py-0 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 text-base leading-7 text-gray-700">
                <div className="mt-10 max-w-2xl">
                    <p>
                        <a href="https://www.flaticon.com/free-icons/diver">
                            Diver icons created by Skyclick
                        </a>
                        -{' '}
                        <span>
                            Flaticon
                            <img
                                className="inline"
                                src="https://media.flaticon.com/dist/min/img/logos/flaticon-color-negative.svg"
                                alt="Flaticon"
                            />
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

type Person = {
    name: string
    role: string
    gitHubUrl: string
    imageUrl: string
}

const people: Array<Person> = [
    {
        name: 'Alexander Gimerius',
        role: 'Bollplank och idé till denna applikation',
        gitHubUrl: '',
        imageUrl: 'diver-avatar.png',
    },
    {
        name: 'Daria Lykova',
        role: 'Proof-of-concept som en Blazor fullstack applikation',
        gitHubUrl: 'https://github.com/dashlykova',
        imageUrl: 'https://avatars.githubusercontent.com/u/50490216?v=4',
    },
    {
        name: 'Marcus Holmgren',
        role: 'Vidareutveckling till denna Remix SPA',
        gitHubUrl: 'https://github.com/marcusholmgren',
        imageUrl: 'https://avatars.githubusercontent.com/u/183957?v=4',
    },
    // More people...
]

type TeamSectionProps = {
    heading: string
    description: string
    people: Array<Person>
}

function TeamSection({ heading, description, people }: TeamSectionProps) {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {heading}
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        {description}
                    </p>
                </div>
                <ul
                    role="list"
                    className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
                >
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <img
                                    className="h-16 w-16 rounded-full"
                                    src={person.imageUrl}
                                    alt={person.name}
                                />
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                                        {person.name}
                                    </h3>
                                    <p className="text-sm font-semibold leading-6 text-indigo-600">
                                        <a href={person.gitHubUrl}>
                                            {person.role}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
