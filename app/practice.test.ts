import { describe, expect, test } from 'vitest'
import { getDiveGroupQuestions, checkDiveGroupAnswer } from './practice'

test('skapa en direktuppstigningsfråga', () => {
    const result = getDiveGroupQuestions()
    expect(result).toMatchObject({
        depth: expect.any(Number),
        time: expect.any(Number),
    })
    expect(result.depth).toBeGreaterThanOrEqual(0)
    expect(result.time).toBeGreaterThanOrEqual(0)
})

describe('dykning med direktuppstigning före ytintervall', () => {
    test('direktuppstigning 3 m & 57 min -> group A', () => {
        const result = checkDiveGroupAnswer(3, 57, 'A')
        expect(result).toBe(true)
    })

    test('direktuppstigning 27.8 m & 4 min -> group A', () => {
        const result = checkDiveGroupAnswer(27.8, 4, 'A')
        expect(result).toBe(true)
    })

    test('direktuppstigning 3.1 m & 440 min -> group H', () => {
        const result = checkDiveGroupAnswer(3.1, 440, 'H')
        expect(result).toBe(true)
    })

    test('direktuppstigning 39.7 m & 4 min -> group B', () => {
        const result = checkDiveGroupAnswer(39.7, 4, 'B')
        expect(result).toBe(true)
    })

    test('direktuppstigning 37.3 m & 8 min -> group D', () => {
        const result = checkDiveGroupAnswer(37.3, 8, 'D')
        expect(result).toBe(true)
    })

    test('direktuppstigning 24.5 m & 24 min -> group G', () => {
        const result = checkDiveGroupAnswer(24.5, 24, 'G')
        expect(result).toBe(true)
    })

    test('direktuppstigning 8.4 m & 208 min -> group M', () => {
        const result = checkDiveGroupAnswer(8.4, 208, 'M')
        expect(result).toBe(true)
    })

    test('direktuppstigning 11.6 m & 140 min -> group N', () => {
        const result = checkDiveGroupAnswer(11.6, 140, 'N')
        expect(result).toBe(true)
    })

    test('direktuppstigning 16.5 m & 30 min -> group E', () => {
        const result = checkDiveGroupAnswer(16.5, 30, 'E')
        expect(result).toBe(true)
    })

    test('direktuppstigning 32 m & 13 min -> group E', () => {
        const result = checkDiveGroupAnswer(32, 13, 'E')
        expect(result).toBe(true)
    })

    test('direktuppstigning 48 m & 13 min -> group Q', () => {
        const result = checkDiveGroupAnswer(48, 13, 'Q')
        expect(result).toBe(false)
    })
})
