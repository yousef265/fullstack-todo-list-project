import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import InputMessageError from "../components/InputMessageError";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import axiosInstance from "../config/axios.config";
import { LoginInputs } from "../data";
import { IErrorResponse, ILoginFormInput } from "../interfaces";
import { loginSchema } from "../validation";

interface IProps {}

function LoginPage({}: IProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // ---------HANDLERS---------

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginFormInput>({
        resolver: yupResolver(loginSchema),
    });
    const onSubmit: SubmitHandler<ILoginFormInput> = async (userdata) => {
        // ** -1 PENDING
        setIsLoading(true);

        try {
            // ** -2 SUCCESS
            const { data } = await axiosInstance.post(`/auth/local`, userdata);

            toast.success("You will navigate to the home page after 2", {
                position: "bottom-center",
                duration: 2000,
                style: {
                    backgroundColor: "black",
                    color: "white",
                    width: "fit-content",
                },
            });

            localStorage.setItem("loggedInUser", JSON.stringify(data));

            setTimeout(() => {
                location.replace("/");
            }, 2000);
        } catch (error) {
            // ** -3 ERROR

            const errorObj = error as AxiosError<IErrorResponse>;
            toast.error(`${errorObj.response?.data.error.message}`, {
                position: "bottom-center",
                duration: 3000,
                style: {
                    backgroundColor: "black",
                    color: "white",
                    width: "fit-content",
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    // ---------RENDERS---------

    const RenderLoginInputs = LoginInputs.map(({ name, placeholder, type }) => (
        <div key={name}>
            <Input placeholder={placeholder} type={type} {...register(name)} />
            {errors[name]?.message && <InputMessageError msg={errors[name].message} />}
        </div>
    ));

    return (
        <>
            <div className="max-w-md mx-auto mt-10 bg-[#343A40] p-4 rounded-lg text-slate-300 ">
                <h2 className="text-center mb-4  text-2xl md:text-3xl font-semibold">Login to get access!</h2>
                <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
                    {RenderLoginInputs}
                    <Button type="submit" fullWidth isLoading={isLoading}>
                        Login
                    </Button>
                    <p className="text-center text-base font-semibold text-slate-300 space-x-2">
                        <span className="">No account ?</span>
                        <Link to={"/register"} className="underline text-slate-300  hover:text-indigo-500 font-semibold">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default LoginPage;
