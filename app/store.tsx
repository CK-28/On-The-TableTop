import { atom } from 'jotai'

export const userNameAtom = atom<string>('')
export const userEmailAtom = atom<string>('')
export const userGamesAtom = atom<number[]>([])
export const userFriendsAtom = atom<string[]>([])
export const collectionStatusAtom = atom<'loading' | 'loaded' | 'error'>('loading')