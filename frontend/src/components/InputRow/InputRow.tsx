import { RiErrorWarningLine } from "react-icons/ri";
import styles from "./inputRow.module.scss";
import { IconType } from "react-icons";

interface InputRowProps {
    labelText: string;
    placeHolderText: string;
    typeInput: string;
    value: string;
    onChangeFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    iconEndInput?: IconType;
    iconStartInput?: IconType;
    hasError?: boolean;
    errorText?: string;
}

const InputRow: React.FC<InputRowProps> = ({
    labelText,
    placeHolderText,
    typeInput,
    value,
    onChangeFunction,
    name,
    iconEndInput: IconEndInput,
    iconStartInput: IconStartInput,
    hasError = false,
    errorText = ""
}) => {
    return (
        <div className="d-flex flex-column justify-center gap-2">
            <label>{labelText}</label>
            <div className={`${styles.input_container} ${hasError ? styles.container_error : ''}  d-flex align-items-center`}>
                {IconStartInput && <IconStartInput  className={styles.icon} />}
                <input
                    placeholder={placeHolderText}
                    type={typeInput}
                    value={value}   
                    onChange={onChangeFunction}
                    name={name}
                    className={`${styles.input_element} `} 
                />
                {hasError ? (
                    <RiErrorWarningLine className="text-danger ms-2" />
                ) : (
                    IconEndInput && <IconEndInput className="ms-2" />
                )}
            </div>
            {hasError && <p className="text-danger mt-1">{errorText}</p>}
        </div>
    );
};

export default InputRow;
