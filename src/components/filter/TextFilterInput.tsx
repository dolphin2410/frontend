import React, { useRef, useState } from 'react'
import styles from "../../styles/FilterInput.module.css"

type TextFilterInputProps = {
  handleInput: (value: string) => void,
  placeholder: string
}

export default function TextFilterInput({ handleInput, placeholder }: TextFilterInputProps) {
  const [value, setValue] = useState<string | null>(null)
  const inputRef = useRef(null)

  const validateAndHandleInput = (event: any) => {
    event.preventDefault()
    if (value) {
      (inputRef.current as any).value = ""
      handleInput(value)
    } else {
      alert('Err: Invalid Input')
    }
  }

  return (
    <>
      <input type="text" placeholder={placeholder} className={[styles.filter_text_input, styles.filter_input].join(" ")} ref={inputRef} onInput={e => setValue((e.target as any).value)} />
      <button className={[styles.filter_button_input, styles.filter_input].join(" ")} onClick={validateAndHandleInput}>SEARCH</button>
    </>
  );
}