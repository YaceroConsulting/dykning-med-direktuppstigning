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
