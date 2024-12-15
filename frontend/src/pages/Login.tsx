import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { LoginInputs } from "../data";

interface IProps {}

function LoginPage({}: IProps) {
    // ---------RENDERS---------

    const RenderLoginInputs = LoginInputs.map(({ name, placeholder, type }) => <Input key={name} name={name} placeholder={placeholder} type={type} />);

    return (
        <>
            <div className="max-w-md mx-auto mt-10 bg-[#343A40] p-4 rounded-lg text-slate-300 ">
                <h2 className="text-center mb-4  text-2xl md:text-3xl font-semibold">Login to get access!</h2>
                <form className="space-y-4 ">
                    {RenderLoginInputs}
                    <Button type="button" fullWidth>
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
