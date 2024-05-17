import type { MetaFunction } from '@remix-run/node'
import { HeroWithOffsetImage } from '~/components/heroWithImage'

export const meta: MetaFunction = () => {
    return [
        { title: 'Dykupp' },
        {
            name: 'description',
            content:
                'Träna på expositionstid och gruppbeteckning efter dykning med direktuppstigning.',
        },
    ]
}

export default function Index() {
    return (
        <main className="isolate">
            <HeroWithOffsetImage />
        </main>
    )
}
