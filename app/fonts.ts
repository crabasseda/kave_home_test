import {Noto_Serif, Poppins} from 'next/font/google'

export const noto_serif = Noto_Serif({subsets: ['latin'], weight:'700'})
export const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '700']
})