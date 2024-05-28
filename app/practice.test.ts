import { describe, expect, test } from 'vitest'
import { checkDiveGroupAnswer, getDiveGroupQuestions } from './practice'

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
        expect(checkDiveGroupAnswer(3, 57, 'A')).toBeTruthy()
    })

    test('direktuppstigning 18 m & 60 min -> group K', () => {
        expect(checkDiveGroupAnswer(18, 60, 'K')).toBeTruthy()
    })

    test('direktuppstigning 27.8 m & 4 min -> group A', () => {
        expect(checkDiveGroupAnswer(27.8, 4, 'A')).toBeTruthy()
    })

    test('direktuppstigning 3.1 m & 440 min -> group H', () => {
        expect(checkDiveGroupAnswer(3.1, 440, 'H')).toBeTruthy()
    })

    test('direktuppstigning 39.7 m & 4 min -> group B', () => {
        expect(checkDiveGroupAnswer(39.7, 4, 'B')).toBeTruthy()
    })

    test('direktuppstigning 37.3 m & 8 min -> group D', () => {
        expect(checkDiveGroupAnswer(37.3, 8, 'D')).toBeTruthy()
    })

    test('direktuppstigning 24.5 m & 24 min -> group G', () => {
        expect(checkDiveGroupAnswer(24.5, 24, 'G')).toBeTruthy()
    })

    test('direktuppstigning 8.4 m & 208 min -> group M', () => {
        expect(checkDiveGroupAnswer(8.4, 208, 'M')).toBeTruthy()
    })

    test('direktuppstigning 11.6 m & 140 min -> group N', () => {
        expect(checkDiveGroupAnswer(11.6, 140, 'N')).toBeTruthy()
    })

    test('direktuppstigning 16.5 m & 30 min -> group E', () => {
        expect(checkDiveGroupAnswer(16.5, 30, 'E')).toBeTruthy()
    })

    test('direktuppstigning 32 m & 13 min -> group E', () => {
        expect(checkDiveGroupAnswer(3, 57, 'A')).toBeTruthy()
    })

    test('direktuppstigning 48 m & 13 min -> group Q', () => {
        expect(checkDiveGroupAnswer(48, 13, 'Q')).toBeFalsy()
    })

    test('direktuppstining 7.5 m & 196 min -> group J', () => {
        expect(checkDiveGroupAnswer(7.5, 196, 'J')).toBeTruthy()
    })

    test('verify the questions', () => {
        expect(checkDiveGroupAnswer(12, 45 + 60, 'K')).toBeTruthy()
        expect(checkDiveGroupAnswer(7.5, 117 + 79, 'J')).toBeTruthy()
        expect(checkDiveGroupAnswer(18, 58 + 2, 'K')).toBeTruthy()
        expect(checkDiveGroupAnswer(12, 60 + 21, 'I')).toBeTruthy()
        expect(checkDiveGroupAnswer(6, 160 + 63, 'I')).toBeTruthy()
        expect(checkDiveGroupAnswer(16.4, 58 + 16, 'L')).toBeTruthy()
        expect(checkDiveGroupAnswer(15, 20 + 65, 'L')).toBeTruthy()
        expect(checkDiveGroupAnswer(12, 50 + 37, 'J')).toBeTruthy()
        expect(checkDiveGroupAnswer(15, 30 + 49, 'K')).toBeTruthy()
        expect(checkDiveGroupAnswer(12, 40 + 29, 'H')).toBeTruthy()
        expect(checkDiveGroupAnswer(16.5, 25 + 15, 'G')).toBeTruthy()
        expect(checkDiveGroupAnswer(21, 13 + 25, 'I')).toBeTruthy()
    })
})
