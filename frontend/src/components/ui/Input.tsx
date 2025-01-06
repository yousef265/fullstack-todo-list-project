import { forwardRef, InputHTMLAttributes, memo, Ref } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(({ ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
    return (
        <input
            ref={ref}
            className="border-2 border-gray-300 shadow-lg focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg p-4 text-md w-full bg-transparent text-dark font-semibold tracking-wide"
            {...rest}
        />
    );
});

export default memo(Input);
