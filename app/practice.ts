import data from './expositionstid.json'
import ytintervall from './ytintervall.json'

type DiveGroupQuestion = {
    depth: number
    time: number
}

export function getDiveGroupQuestions(): DiveGroupQuestion {
    const values: Array<DiveData> = data['values']
    const depthIndex = Math.floor(Math.random() * values.length)
    const diveDepth = values[depthIndex]
    const startDepth = depthIndex > 0 ? values[depthIndex - 1].depth : 3
    const depth =
        Math.random() * (values[depthIndex].depth - startDepth) + startDepth

    // get last item to get the max time
    const last: Combination = diveDepth.combinations.slice(-1)[0]
    const time = Math.floor(Math.random() * (last.time_submerged - 2) + 2)

    return { depth: Math.round(depth * 10) / 10, time }
}

export function getDiveGroup(depth: number, time: number) {
    const depthsCandidates = data['values'].filter(
        (v: DiveData) => v.depth >= depth
    )
    const nearestDepth = depthsCandidates[0]

    if (nearestDepth) {
        const timeCandidates = nearestDepth['combinations'].filter(
            (c: Combination) => c.time_submerged >= time
        )
        const group = timeCandidates[0]
        if (group) {
            return group
        }
    }
    return null
}

export function checkDiveGroupAnswer(
    depth: number,
    time: number,
    groupAnswer: string
): boolean {
    const group = getDiveGroup(depth, time)
    if (group) {
        return group['dive_group'] === groupAnswer
    }
    /*
    const depthsCandidates = data["values"].filter((v: DiveData) => v.depth >= depth);
    const nearestDepth = depthsCandidates[0];

    if (nearestDepth) {
        const timeCandidates = nearestDepth["combinations"].filter((c: Combination) => c.time_submerged >= time);
        const group = timeCandidates[0];
        if (group) {
            return group["dive_group"] === groupAnswer;
        }
    }
    */
    return false
}

export function getSurfaceInterval(group: string): SurfaceGroup {
    // @ts-expect-error ytintervall is a json object
    return ytintervall[group]
}

export function getSurfaceInterval2(
    group: string,
    hour: number,
    minutes: number
) {
    // @ts-expect-error ytintervall is a json object
    const x: SurfaceGroup = ytintervall[group]
    const surfaceTime = hour * 60 + minutes
    const maxIntervall = x.surface_interval.filter(
        (i: SurfaceInterval) => surfaceTime <= i.hours * 60 + i.minutes
    )
    console.log({ group, maxIntervall })

    /*return x.surface_interval.findIndex(
        (i: SurfaceInterval) =>
            i.hours === maxIntervall[0].hours &&
            i.minutes === maxIntervall[0].minutes
    )*/
    return maxIntervall[0]
}

function random(min: number = 6, max: number = 13) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getTwoDives_multilevel(): TwoDives {
    const result: TwoDives = {
        startTime: new Date(),
        firstDive: { time: 40, depth: 15, group: 'F' },
        surfaceTime: { hours: 0, minutes: 55, letter: 'E' },
        secondDive: { time: 60, depth: 12, group: 'K' },
        maxRemaining: { consumed: 45, maxRemaining: 118 },
    }
    return result
}

export function getTwoDives(): TwoDives {
    const result: TwoDives = {
        startTime: new Date(new Date().setHours(random(6, 13), random(0, 59))),
        firstDive: { time: 60, depth: 18, group: 'K' },
        surfaceTime: { hours: 1, minutes: 30, letter: 'J' },
        secondDive: { time: 60, depth: 18, group: 'K' },
        maxRemaining: { diveTimeAtDepth: 2, consumed: 58, maxExposition: 60 },
    }
    return result
}

export function getTwoDives_working(): TwoDives {
    const startTime = new Date().setHours(random(6, 13), random(0, 59))
    const firstDiveTime = new Date(startTime).setMinutes(
        new Date(startTime).getMinutes() + 60 + 2
    )
    const secondDiveTime = new Date(firstDiveTime).setMinutes(
        new Date(firstDiveTime).getMinutes() + 60 + 30
    )
    const firstDiveGroup = getDiveGroup(18, 60)
    const surfaceTime = { hours: 1, minutes: 30 }
    const secondDiveGroup = getSurfaceInterval2(
        firstDiveGroup.dive_group,
        surfaceTime.hours,
        surfaceTime.minutes
    )

    //TODO find table with consumed and max exposition
    const secondSurfaceGroup = getDiveGroup(18, 60)

    const result = {
        startTime: new Date(startTime),
        firstDive: { time: 60, depth: 18, group: firstDiveGroup.dive_group },
        surfaceTime: { ...surfaceTime },
        secondDive: {
            depth: secondSurfaceGroup.time_submerged,
            group: secondSurfaceGroup.dive_group,
        },
        group: {
            letter: secondDiveGroup.group,
            maxRemaining: 2,
            consumed: 58,
            maxExposition: 60,
        },
    }
    console.log(JSON.stringify(result))
    return result
}

export type TwoDives = {
    startTime: Date
    firstDive: Dive
    surfaceTime: SurfaceTime
    secondDive: Dive
    maxRemaining: RemainingQuestion
}

export type Dive = {
    time: number
    depth: number
    group: string
}

export type RemainingQuestion = {
    diveTimeAtDepth?: number
    consumed: number
    maxExposition?: number
    maxRemaining?: number
}

export type SurfaceTime = {
    hours: number
    minutes: number
    letter: string
}

export class RepeatedDive {
    private RESURFACE_TIME = 2
    private data: TwoDives

    constructor(data: TwoDives) {
        this.data = data
    }

    // get start time
    get startTime() {
        return new Date(this.data.startTime)
    }

    get firstDiveDepth() {
        return this.data.firstDive.depth
    }

    get firstDiveTime() {
        return this.data.firstDive.time
    }

    // get resurface time
    get resurfaceTime() {
        const date = this.startTime
        date.setMinutes(
            date.getMinutes() + this.data.firstDive.time + this.RESURFACE_TIME
        )
        return date
    }

    // get second dive start time
    get secondDiveStartTime() {
        const date = this.resurfaceTime
        date.setMinutes(
            date.getMinutes() +
                this.data.surfaceTime.hours * 60 +
                this.data.surfaceTime.minutes
        )
        return date
    }

    get secondDiveDepth() {
        return this.data.secondDive.depth
    }

    get secondDiveMaxQuestion() {
        return this.data.maxRemaining.diveTimeAtDepth !== undefined
    }

    get secondDiveMaxRemaining() {
        if (this.secondDiveMaxQuestion) {
            return this.data.maxRemaining.diveTimeAtDepth
        } else {
            return this.data.secondDive.time
        }
    }

    get secondDiveMaxExposition() {
        if (
            this.secondDiveMaxQuestion &&
            this.data.maxRemaining.maxExposition
        ) {
            return this.data.maxRemaining.maxExposition
        } else {
            return this.data.secondDive.time + this.data.maxRemaining.consumed
        }
    }

    get penaltyTime() {
        return this.data.maxRemaining.consumed
    }

    // get second resurface time
    get secondResurfaceTime() {
        const date = this.secondDiveStartTime
        if (
            this.secondDiveMaxQuestion &&
            this.data.maxRemaining.maxExposition
        ) {
            date.setMinutes(
                date.getMinutes() +
                    (this.data.maxRemaining.maxExposition -
                        this.data.maxRemaining.consumed) +
                    this.RESURFACE_TIME
            )
        } else {
            date.setMinutes(
                date.getMinutes() +
                    this.secondDiveMaxExposition +
                    this.RESURFACE_TIME
            )
        }

        return date
    }

    // get surface time
    get surfaceTime() {
        return `${this.data.surfaceTime.hours}:${this.data.surfaceTime.minutes}`
    }

    // get resurface group
    get resurfaceGroup() {
        return this.data.firstDive.group
    }

    // get second dive group
    get secondDiveGroup() {
        return this.data.surfaceTime.letter
    }

    // get second resurface group
    get secondResurfaceGroup() {
        return this.data.secondDive.group
    }

    get group() {
        return this.data.maxRemaining
    }
}
