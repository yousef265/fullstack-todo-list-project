import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { RegisterInputs } from "../data";
import { Link } from "react-router-dom";

interface IProps {}

function RegisterPage({}: IProps) {
    // ---------RENDERS---------

    const RenderRegisterInputs = RegisterInputs.map(({ name, placeholder, type }) => <Input key={name} name={name} placeholder={placeholder} type={type} />);

    return (
        <>
            <div className="max-w-md mx-auto mt-10 bg-[#343A40] p-4 rounded-lg text-slate-300 ">
                <h2 className="text-center mb-4 text-2xl md:text-3xl font-semibold">Register to get access!</h2>
                <form className="space-y-4 ">
                    {RenderRegisterInputs}
                    <Button type="button" fullWidth>
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
