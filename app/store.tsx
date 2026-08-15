import { atom } from 'jotai'

export const userNameAtom = atom<string>('')
export const userGamesAtom = atom<number[]>([])
export const userFriendsAtom = atom<string[]>([])
// Indicates whether client-side auth + atoms have been hydrated.
// Components that render user-dependent UI should wait for this to
// avoid SSR/CSR mismatches and to react to clears caused by sign-out.
export const isHydratedAtom = atom<boolean>(false)