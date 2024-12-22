import { forwardRef, InputHTMLAttributes, Ref } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(({ ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
    return (
        <input
            ref={ref}
            className="border-2 border-gray-300 shadow-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-4 text-md w-full bg-transparent text-white font-semibold tracking-wide"
            {...rest}
        />
    );
});

export default Input;
