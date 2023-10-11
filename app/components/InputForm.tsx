interface Props {
    addClass?: string,
    type: string
    name: string
    id?: string
    title?: string
    label: boolean
    placeholder?: string | undefined
    value?: string | undefined
    onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<Props> = (props) => {

    const { addClass, type, id, title, label, placeholder, name, value, onChangeValue } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onChangeValue(event)
    }

    return (
        <div className={addClass}>
            {label === true &&
                <label htmlFor={id} className="text-base text-gray-700 inline-block pb-2">{title}</label>
            }
            <input type={type} id={id} name={name} onChange={handleChange} className="w-full py-3 px-4 rounded-md bg-slate-100 text-base focus:ring-4 focus:outline-none focus:ring-blue-300" defaultValue={value} placeholder={placeholder} />
        </div>
    )
}

export default InputForm