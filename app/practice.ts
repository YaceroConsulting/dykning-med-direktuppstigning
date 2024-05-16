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

export function getTwoDives(): TwoDives {
    const startTime = new Date().setHours(8, 10)
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
    console.log(JSON.stringify(result));
    return result;
}

export type TwoDives = {
    startTime: Date
    firstDive: Dive
    surfaceTime: SurfaceTime
    secondDive: Dive
    group: Group
    //secondResurface: Dive;
}

export type Dive = {
    time: number
    depth: number
    group: string
}

export type Group = {
    letter: string
    maxRemaining: number
    consumed: number
    maxExposition: number
}

export type SurfaceTime = {
    hours: number
    minutes: number
}

export class Hej {
    private RESURFACE_TIME = 2
    private data: TwoDives
    constructor(data: TwoDives) {
        this.data = data
    }

    // get start time
    get startTime() {
        return new Date(this.data.startTime)
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

    // get second resurface time
    get secondResurfaceTime() {
        const date = this.secondDiveStartTime
        date.setMinutes(
            date.getMinutes() +
                (this.data.group.maxExposition - this.data.group.consumed) +
                this.RESURFACE_TIME
        )
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
        return this.data.group.letter
    }

    // get second resurface group
    get secondResurfaceGroup() {
        return this.data.secondDive.group
    }
}
