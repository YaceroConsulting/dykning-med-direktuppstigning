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

    return maxIntervall[0]
}

function random(min: number = 6, max: number = 13) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function multilevelDives(index: number = 0): TwoDives {
    const startTime = new Date(
        new Date().setHours(random(6, 13), random(0, 59))
    )
    const result: Array<TwoDives> = [
        {
            startTime: startTime,
            firstDive: { time: 40, depth: 15, group: 'F' },
            surfaceTime: { hours: 0, minutes: 55, letter: 'E' },
            secondDive: { time: 60, depth: 12, group: 'K' },
            maxRemaining: { consumed: 45, maxRemaining: 118 },
        },
        {
            startTime: startTime,
            firstDive: { time: 70, depth: 13.5, group: 'I' },
            surfaceTime: { hours: 3, minutes: 45, letter: 'E' },
            secondDive: { time: 117, depth: 7.5, group: 'J' },
            maxRemaining: { consumed: 79, maxRemaining: 516 },
        },
        {
            startTime: startTime,
            firstDive: { time: 48, depth: 21, group: 'K' },
            surfaceTime: { hours: 2, minutes: 0, letter: 'I' },
            secondDive: { time: 20, depth: 15, group: 'L' },
            maxRemaining: { consumed: 65, maxRemaining: 27 },
        },
        {
            startTime: startTime,
            firstDive: { time: 110, depth: 10.5, group: 'J' },
            surfaceTime: { hours: 6, minutes: 0, letter: 'D' },
            secondDive: { time: 50, depth: 12, group: 'J' },
            maxRemaining: { consumed: 37, maxRemaining: 126 },
        },
        {
            startTime: startTime,
            firstDive: { time: 40, depth: 18, group: 'H' },
            surfaceTime: { hours: 1, minutes: 0, letter: 'G' },
            secondDive: { time: 30, depth: 15, group: 'K' },
            maxRemaining: { consumed: 49, maxRemaining: 43 },
        },
        {
            startTime: startTime,
            firstDive: { time: 50, depth: 9, group: 'D' },
            surfaceTime: { hours: 1, minutes: 0, letter: 'C' },
            secondDive: { time: 40, depth: 12, group: 'H' },
            maxRemaining: { consumed: 29, maxRemaining: 134 },
        },
        {
            startTime: startTime,
            firstDive: { time: 15, depth: 24, group: 'D' },
            surfaceTime: { hours: 2, minutes: 0, letter: 'B' },
            secondDive: { time: 25, depth: 16.5, group: 'G' },
            maxRemaining: { consumed: 15, maxRemaining: 59 },
        },
        {
            startTime: startTime,
            firstDive: { time: 24, depth: 27, group: 'H' },
            surfaceTime: { hours: 3, minutes: 0, letter: 'E' },
            secondDive: { time: 13, depth: 21, group: 'I' },
            maxRemaining: { consumed: 25, maxRemaining: 23 },
        },
    ]
    return result[index % result.length]
}

export function repeatedDives(index: number = 0): TwoDives {
    const startTime = new Date(
        new Date().setHours(random(6, 13), random(0, 59))
    )
    const result: Array<TwoDives> = [
        {
            startTime: startTime,
            firstDive: { time: 60, depth: 18, group: 'K' },
            surfaceTime: { hours: 1, minutes: 30, letter: 'J' },
            secondDive: { time: 60, depth: 18, group: 'K' },
            maxRemaining: {
                diveTimeAtDepth: 2,
                consumed: 58,
                maxExposition: 60,
            },
        },
        {
            startTime: startTime,
            firstDive: { time: 13, depth: 12, group: 'B' },
            surfaceTime: { hours: 0, minutes: 30, letter: 'B' },
            secondDive: { time: 60, depth: 12, group: 'I' },
            maxRemaining: { consumed: 21, maxRemaining: 142 },
        },
        {
            startTime: startTime,
            firstDive: { time: 140, depth: 6, group: 'F' },
            surfaceTime: { hours: 1, minutes: 45, letter: 'D' },
            secondDive: { time: 160, depth: 6, group: 'I' },
            maxRemaining: { consumed: 63, maxRemaining: 532 },
        },
        {
            startTime: startTime,
            firstDive: { time: 72, depth: 16.4, group: 'K' },
            surfaceTime: { hours: 2, minutes: 30, letter: 'I' },
            secondDive: { time: 74, depth: 16.4, group: 'L' },
            maxRemaining: {
                diveTimeAtDepth: 16,
                consumed: 58,
                maxExposition: 74,
            },
        },
    ]
    return result[index % result.length]
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
