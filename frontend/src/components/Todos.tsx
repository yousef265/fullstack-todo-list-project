import useCustomQuery from "../hooks/useCustomQuery";
import { ITodo } from "../interfaces";
import Button from "./ui/Button";

interface IProps {}

function Todos({}: IProps) {
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;

    const { data, isLoading, error } = useCustomQuery({
        queryKey: ["todos"],
        url: "/users/me?populate=*",
        config: {
            headers: {
                Authorization: `bearer ${userData.jwt}`,
            },
        },
    });

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
                                <Button variant="danger" size="sm">
                                    Delete
                                </Button>
                                <Button size="sm">Edit</Button>
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <h3>No Todos Found</h3>
            )}
        </section>
    );
}

export default Todos;
