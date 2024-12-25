import { useState } from "react";
import useAuthenticatedQuery from "../hooks/useCustomQuery";
import { ITodo } from "../interfaces";
import Button from "./ui/Button";
import Modal from "./ui/Modal";

interface IProps {}

function Todos({}: IProps) {
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // ----RENDER DATA----

    const { data, isLoading, error } = useAuthenticatedQuery({
        queryKey: ["todos"],
        url: "/users/me?populate=*",
        config: {
            headers: {
                Authorization: `bearer ${userData.jwt}`,
            },
        },
    });

    // ----HANDLERS----

    const toggleModalStatus = () => {
        setIsOpen((prev: boolean) => !prev);
    };

    if (isLoading) return <h3>Loading.....</h3>;
    if (error) return "An error has occurred: " + error.message;

    return (
        <section>
            {data.todos.length ? (
                <ul className="text-white space-y-3">
                    {data.todos.map(({ id, title }: ITodo, index: number) => (
                        <li key={id} className="p-3 rounded-lg flex items-center justify-between even:bg-gray-800 odd:bg-black hover:bg-gray-700">
                            <span>{`${index + 1}- ${title}`}</span>
                            <span className="flex space-x-3">
                                <Button size="sm" onClick={toggleModalStatus}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm">
                                    Delete
                                </Button>
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <h3>No Todos Found</h3>
            )}

            <Modal isOpen={isOpen} closeModal={toggleModalStatus} title="Edit This Todo">
                <div className="flex items-center space-x-3">
                    <Button fullWidth variant={"outline"} className="bg-indigo-500 text-white active:bg-indigo-500" size={"sm"}>
                        Update
                    </Button>
                    <Button onClick={toggleModalStatus} fullWidth variant={"cancel"} className="active:bg-gray-300" size={"sm"}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        </section>
    );
}

export default Todos;
