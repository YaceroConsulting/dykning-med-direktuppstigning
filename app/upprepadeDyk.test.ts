import { expect, test, describe } from 'vitest'
import {
    getDiveGroup,
    getSurfaceInterval,
    getSurfaceInterval2, repeatedDives,
    RepeatedDive,
    TwoDives,
} from './practice'
//import { getDiveGroupQuestions, checkDiveGroupAnswer } from './practice';

test('upprepad dykning exempel', () => {
    const förstaDyk = { depth: 18, time: 60 }
    const förstaGrupp = getDiveGroup(förstaDyk.depth, förstaDyk.time)
    expect(förstaGrupp.dive_group).toBe('K')

    // ytintervall 1:30
    const yttid: SurfaceInterval = { hours: 1, minutes: 30 }
    const ytintervall = getSurfaceInterval(förstaGrupp.dive_group)
    //expect(ytintervall).toBe({"hej": 2});

    // dyk 2
    const andraDyk = { depth: 18, time: 60 }

    // uppslag från andra dyket
    const result = { max_exposition: 60, remaining: 2, consumed: 58 }

    expect(result.remaining).toBe(2)
    expect(result.consumed).toBe(58)
    expect(result.max_exposition).toBe(60)
})

test('två dyk exempel', () => {
    const förstaDyk = { depth: 18, time: 60 }
    const förstaGrupp = getDiveGroup(förstaDyk.depth, förstaDyk.time)
    expect(förstaGrupp.dive_group).toBe('K')

    // ytintervall 1:30
    const yttid: SurfaceInterval = { hours: 1, minutes: 30 }
    const ytintervall = getSurfaceInterval(förstaGrupp.dive_group)
    //expect(ytintervall).toBe({"hej": 2});
    //console.log("Hej", ytintervall);

    // dyk 2
    const andraDyk = { depth: 18, time: 60 }

    // uppslag från andra dyket
    const result = { max_exposition: 60, remaining: 2, consumed: 58 }

    expect(result.remaining).toBe(2)
    expect(result.consumed).toBe(58)
    expect(result.max_exposition).toBe(60)

    // yt grupp
    // andra dyk på 18 m med 58 min i straff. Maximal expositionstid för 18 m är 60 minuter.
    // 60 - 58 = 2 minuter kvar.
    const andraDykGrupp = 'K'
    expect(andraDykGrupp).toBe('K')
})

test('30 minuters expositionstid dyk 2 till 18 m, vilken yttid?', () => {
    const förstaDyk = { depth: 18, time: 60 }
    const förstaGrupp = getDiveGroup(förstaDyk.depth, förstaDyk.time)
    expect(förstaGrupp.dive_group).toBe('K')

    // ytintervall 1:30
    const yttid: SurfaceInterval = { hours: 1, minutes: 30 }
    //const ytintervall = getSurfaceInterval(förstaGrupp.dive_group)
    const index = getSurfaceInterval2(förstaGrupp.dive_group, 1, 30)
    //expect(ytintervall).toBe({"hej": 2});
    expect(index).toStrictEqual({
        group: 'J',
        hours: 1,
        minutes: 44,
    })

    // dyk 2
    const andraDyk = { depth: 18, time: 30 }

    // uppslag från andra dyket
    const result = { max_exposition: 60, group: 'E', consumed: 29 }
    const expectedYttid = { hours: 5, minutes: 14 }

    expect(result.group).toBe('E')
    expect(result.consumed).toBe(29)
    expect(result.max_exposition).toBe(60)
    expect(expectedYttid.hours).toBe(5)
    expect(expectedYttid.minutes).toBe(14)

    /*        // yt grupp
        // andra dyk på 18 m med 58 min i straff. Maximal expositionstid för 18 m är 60 minuter.
        // 60 - 58 = 2 minuter kvar.
        const andraDykGrupp = 'K'
        expect(andraDykGrupp).toBe('K')*/
})

// test that given a start time add first dive time, the surface interval and start time for the second dive and the surface time for the second dive.
// The resurface time is 2 minutes for each dive.
describe('upprepade dyk till samma djup', () => {
    test('tider för två dyk', () => {
        const example: TwoDives = {
            startTime: new Date('2022-01-01T08:10:00.000Z'),
            firstDive: {
                time: 60,
                depth: 18,
                group: 'K',
            },
            surfaceTime: {
                hours: 1,
                minutes: 30,
                letter: 'J',
            },
            secondDive: {
                time: 60,
                depth: 18,
                group: 'K',
            },
            maxRemaining: {
                diveTimeAtDepth: 2,
                consumed: 58,
                maxExposition: 60,
            },
        }

        const tryit = new RepeatedDive(example)
        expect(tryit.startTime.toISOString()).toBe('2022-01-01T08:10:00.000Z')
        expect(tryit.resurfaceTime.toISOString()).toBe(
            '2022-01-01T09:12:00.000Z'
        )
        expect(tryit.firstDiveDepth).toBe(18)
        expect(tryit.firstDiveTime).toBe(60)
        expect(tryit.resurfaceGroup).toBe('K')
        expect(tryit.secondDiveStartTime.toISOString()).toBe(
            '2022-01-01T10:42:00.000Z'
        )
        expect(tryit.secondDiveGroup).toBe('J')
        expect(tryit.secondDiveDepth).toBe(18)
        expect(tryit.secondDiveMaxQuestion).toBeTruthy()
        expect(tryit.secondDiveMaxRemaining).toBe(2)
        expect(tryit.secondDiveMaxExposition).toBe(60)
        expect(tryit.penaltyTime).toBe(58)
        expect(tryit.secondResurfaceTime.toISOString()).toBe(
            '2022-01-01T10:46:00.000Z'
        )
        expect(tryit.secondResurfaceGroup).toBe('K')
    })
})

describe('multilevel, dykning med olika djup', () => {
    test('tider för två dyk', () => {
        const example: TwoDives = {
            startTime: new Date('2022-01-01T08:10:00.000Z'),
            firstDive: { time: 40, depth: 15, group: 'F' },
            surfaceTime: { hours: 0, minutes: 55, letter: 'E' },
            secondDive: { time: 60, depth: 12, group: 'K' },
            maxRemaining: { consumed: 45, maxRemaining: 118 },
        }
        const tryit = new RepeatedDive(example)

        expect(tryit.startTime.toISOString()).toBe('2022-01-01T08:10:00.000Z')
        expect(tryit.resurfaceTime.toISOString()).toBe(
            '2022-01-01T08:52:00.000Z'
        )
        expect(tryit.firstDiveDepth).toBe(15)
        expect(tryit.firstDiveTime).toBe(40)
        expect(tryit.resurfaceGroup).toBe('F')
        expect(tryit.secondDiveStartTime.toISOString()).toBe(
            '2022-01-01T09:47:00.000Z'
        )
        expect(tryit.secondDiveGroup).toBe('E')
        expect(tryit.secondDiveDepth).toBe(12)
        expect(tryit.secondDiveMaxQuestion).toBeFalsy()
        expect(tryit.secondDiveMaxRemaining).toBe(60)
        expect(tryit.secondDiveMaxExposition).toBe(105)
        expect(tryit.penaltyTime).toBe(45)
        expect(tryit.secondResurfaceTime.toISOString()).toBe(
            '2022-01-01T11:34:00.000Z'
        )
        expect(tryit.secondResurfaceGroup).toBe('K')
    })
})

describe.skip('upprepade dykning med direktuppstigning', () => {
    test('upprepade dykning med direktuppstigning', () => {
        const förstDykA = { depth: 7.5, time: 19 }

        const groupA = getDiveGroup(förstDykA.depth, förstDykA.time)
        expect(groupA.dive_group).toBe('A')
        const ytintervall = getSurfaceInterval(groupA.dive_group)
        expect(ytintervall.surface_interval[0].hours).toBe(0)
        expect(ytintervall.surface_interval[0].minutes).toBe(10)

        const upprepad = { remaining: 574, consumed: 21 }

        expect(upprepad.remaining).toBe(574)
        expect(upprepad.consumed).toBe(21)
    })
})
