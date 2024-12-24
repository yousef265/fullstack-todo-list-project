import Button from "./ui/Button";

interface IProps {}

function Todos({}: IProps) {
    return (
        <section>
            <ul className="text-white space-y-3 ">
                <li className="p-3 rounded-lg flex items-center justify-between even:bg-gray-800 odd:bg-black hover:bg-gray-700">
                    <span>List One</span>
                    <span className="flex space-x-3">
                        <Button variant={"danger"} size={"sm"}>
                            Delete
                        </Button>
                        <Button size={"sm"}>Edit</Button>
                    </span>
                </li>
                <li className="p-3 rounded-lg flex items-center justify-between even:bg-gray-800 odd:bg-black hover:bg-gray-700">
                    <span>List One</span>
                    <span className="flex space-x-3">
                        <Button variant={"danger"} size={"sm"}>
                            Delete
                        </Button>
                        <Button size={"sm"}>Edit</Button>
                    </span>
                </li>
                <li className="p-3 rounded-lg flex items-center justify-between even:bg-gray-800 odd:bg-black hover:bg-gray-700">
                    <span>List One</span>
                    <span className="flex space-x-3">
                        <Button variant={"danger"} size={"sm"}>
                            Delete
                        </Button>
                        <Button size={"sm"}>Edit</Button>
                    </span>
                </li>
            </ul>
        </section>
    );
}

export default Todos;
