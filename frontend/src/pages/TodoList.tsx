import Paginator from "../components/Paginator";
import useCustomQuery from "../hooks/useCustomQuery";

interface IProps {}

function TodoListPage({}: IProps) {
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;

    const { data, isLoading, error } = useCustomQuery({
        queryKey: ["TodoList"],
        url: "/todos",
        config: {
            headers: {
                Authorization: `bearer ${userData.jwt}`,
            },
        },
    });

    // ----HANDLE COMPONENT LOADING STATUS----
    if (isLoading) {
        return <h3>Is Loading...</h3>;
    }

    // ----HANDLE COMPONENT ERROR STATUS----
    if (error) return "An error has occurred: " + error.message;

    return (
        <>
            {data.data.length ? (
                <ul className="text-white space-y-3">
                    {data.data.map(({ id, attributes: { title } }: { id: number; attributes: { title: string } }, index: number) => (
                        <li key={id} className="p-3 rounded-lg flex items-center justify-between even:bg-gray-800 odd:bg-black hover:bg-gray-700">
                            <span>{`${index + 1}- ${title}`}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <h3>No Todos Found...</h3>
            )}
            <Paginator />
        </>
    );
}

export default TodoListPage;
