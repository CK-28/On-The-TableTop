import { atom } from 'jotai'

// TODO: Delete this and the tester page. Left just in case we need an example
export const animeAtom = atom([
  {
    title: 'Ghost in the Shell',
    year: 1995,
    watched: true
  },
  {
    title: 'Serial Experiments Lain',
    year: 1998,
    watched: false
  }
])

export const userNameAtom = atom<string>('')
export const userGamesAtom = atom<number[]>([])
export const userFriendsAtom = atom<string[]>([])