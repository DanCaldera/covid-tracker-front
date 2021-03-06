import create from 'zustand'

const useStore = create((set) => ({
  user: localStorage.getItem('token'),
  signInUser: (token) => set({ user: token }),
  logOutUser: () => set({ user: null }),
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

export default useStore
