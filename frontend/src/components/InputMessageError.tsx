interface IProps {
    msg: string;
}

function InputMessageError({ msg }: IProps) {
    return <span className="block text-red-700 font-semibold text-sm">{msg}</span>;
}

export default InputMessageError;
