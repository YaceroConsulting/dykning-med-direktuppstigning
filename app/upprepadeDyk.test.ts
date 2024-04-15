import { expect, test, describe } from 'vitest'
import { getDiveGroup, getSurfaceInterval } from './practice'
//import { getDiveGroupQuestions, checkDiveGroupAnswer } from './practice';

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
