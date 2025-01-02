import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputMessageError from "../components/InputMessageError";
import Toaster from "../components/toaster";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import axiosInstance from "../config/axios.config";
import { RegisterInputs } from "../data";
import { IErrorResponse, IRegisterFormInput } from "../interfaces";
import { registerSchema } from "../validation";

interface IProps {}

function RegisterPage({}: IProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // ---------HANDLERS---------

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegisterFormInput>({
        resolver: yupResolver(registerSchema),
    });
    const onSubmit: SubmitHandler<IRegisterFormInput> = async (userdata) => {
        // ** -1 PENDING
        setIsLoading(true);

        try {
            // ** -2 SUCCESS
            await axiosInstance.post(`/auth/local/register`, userdata);
            Toaster({ message: "You will navigate to the login page after 2 seconds to login!", toastType: "success" });

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            // ** -3 ERROR
            const errorObj = error as AxiosError<IErrorResponse>;
            Toaster({ message: `${errorObj.response?.data.error.message}`, toastType: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    // ---------RENDERS---------

    const RenderRegisterInputs = RegisterInputs.map(({ name, placeholder, type }) => (
        <div key={name}>
            <Input placeholder={placeholder} type={type} {...register(name)} />
            {errors[name]?.message && <InputMessageError msg={errors[name].message} />}
        </div>
    ));

    return (
        <>
            <div className="max-w-md mx-auto mt-10 bg-[#343A40] p-4 rounded-lg text-slate-300 ">
                <h2 className="text-center mb-4 text-2xl md:text-3xl font-semibold">Register to get access!</h2>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {RenderRegisterInputs}
                    <Button type="submit" fullWidth isLoading={isLoading} disabled={isLoading}>
                        Register
                    </Button>
                    <p className="text-center text-base font-semibold text-slate-300 space-x-2">
                        <span className="">No account ?</span>
                        <Link to={"/login"} className="underline text-slate-300  hover:text-indigo-500 font-semibold">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default RegisterPage;
