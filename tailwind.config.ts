import type { Config } from 'tailwindcss'

import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'

export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            transitionDuration: {
                '1400': '1400ms',
            },
        },
    },
    plugins: [forms],
} satisfies Config
