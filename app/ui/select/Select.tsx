import Button from "@/ui/button/Button";
import React, {useEffect, useRef, useState} from "react";
import Checkbox from "@/ui/checkbox/Checkbox";
import {TFieldSize} from "@/types/ui";

import classNames from 'classnames'
import styles from "./select.module.scss";

type TSelectType = "select" | "multiselect"

type TSelect = {
    options: {
        label: string;
        value: string;
    }[]
    type? : TSelectType
    size? : TFieldSize
    disabled?: boolean
    children?: React.ReactNode
    style?: React.CSSProperties
    placeholder?: string
    withCheckBox?: boolean
    onClick?: (event: React.MouseEvent<HTMLSelectElement>) => void
}

const Select: React.ForwardRefRenderFunction<
    HTMLSelectElement, TSelect
> = (props: TSelect)  => {
    const {
        options,
        type = "select",
        size = "medium",
        disabled = false,
        placeholder = "Default text",
        withCheckBox = false,
        style,
        onClick,
        ...rest
    } = props


    const [isOpened, setisOpened] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

     const toggleDropdown = () => {
         setisOpened(!isOpened);
     }

     const handleOptionClick = (option : {label: string, value: string}) => {
         if (selectedOption === option.label) {
             setSelectedOption(null)
         } else {
            setSelectedOption(option.label);
         }
         setisOpened(false);
     }

     const handleClickOutside = (event) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target))
             setisOpened(false)
     }

     useEffect(() => {
         document.addEventListener("click", handleClickOutside);
         return () => {
             document.removeEventListener("click", handleClickOutside);
         }
     }, [])


    return (
        <div className={styles[`custom-select`]} ref={dropdownRef}>
            <Button
            style={{width: "120px"}}
            type="select"
            size="small"
            text={selectedOption ? selectedOption : placeholder}
            onClick={toggleDropdown}/>
            {isOpened && (
                <ul className={styles["options-list"]}>
                    {options.map((option : object) => (
                        <li className={styles["option"]}
                            key={option.value}
                            onClick={() => handleOptionClick(option)}
                            >
                            {withCheckBox && <Checkbox
                                id={option.value}
                                text={option.label}
                                checked={selectedOption === option.label}/>}
                            {!withCheckBox && option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Select