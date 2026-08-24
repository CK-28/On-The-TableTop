import { atom } from 'jotai'

export const userNameAtom = atom<string>('')
export const userEmailAtom = atom<string>('')
export const userAvatarUrlAtom = atom<string>('')
export const userGamesAtom = atom<Game[]>([])
export const userFriendsAtom = atom<User[]>([])
export const collectionStatusAtom = atom<'loading' | 'loaded' | 'error'>('loading')