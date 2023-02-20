interface SelectInputProps {
    options: {value: string | number, label: string}[]
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
function SelectInput(props: SelectInputProps) {
    return (
        <select value={props.value} onChange={props.onChange} className="border border-gray-400 p-2">
            {props.options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default SelectInput;