import useLocalStorage from "./useLocalStorage"

function useToggle(key: string, initialValue: boolean) {

  const [value, setValue] = useLocalStorage(key, initialValue)

  const toggle = (value: boolean) => {
    setValue((prev: boolean) => {
      return typeof value === 'boolean' ? value : !prev;
    })
  }

  return [value, toggle];
}

export default useToggle