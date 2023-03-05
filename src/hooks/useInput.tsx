import useLocalStorage from "./useLocalStorage";

const useInput = (key: string, initialValue: string) => {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const reset = () => setValue(initialValue);

  const attributeObj = {
    value: value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value),
  };

  return [value, reset, attributeObj] as const;
};

export default useInput;
