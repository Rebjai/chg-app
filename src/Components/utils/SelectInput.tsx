interface SelectInputProps {
    options: {value: string | number, label: string}[]
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    hidden?: boolean,
    disabled?: boolean,
}
function SelectInput(props: SelectInputProps) {
    return (
        <select value={props.value} onChange={props.onChange} hidden={props.hidden} className="border border-gray-400 p-2" name={props.name} disabled={props.disabled}>
            {props.options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default SelectInput;