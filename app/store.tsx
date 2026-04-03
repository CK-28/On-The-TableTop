import { atom } from 'jotai'

export const userNameAtom = atom<string>('')
export const userGamesAtom = atom<number[]>([])
export const userFriendsAtom = atom<string[]>([])