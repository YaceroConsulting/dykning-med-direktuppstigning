import { expect, test, describe } from 'vitest'
import {
    RepeatedDive,
    TwoDives,
} from './practice'


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
