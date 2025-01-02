import { ChangeEvent, useState } from "react";
import Paginator from "../components/Paginator";
import useCustomQuery from "../hooks/useCustomQuery";
import Button from "../components/ui/Button";
import axiosInstance from "../config/axios.config";
import { faker } from "@faker-js/faker";

interface IProps {}

function TodoListPage({}: IProps) {
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>("ASC");
    const [queryVersion, setQueryVersion] = useState<number>(0);

    const { data, isLoading, isFetching, error } = useCustomQuery({
        queryKey: [`todo-page-${page}`, `${pageSize}`, `${sortBy}`, `${queryVersion}`],
        url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`,
        config: {
            headers: {
                Authorization: `bearer ${userData.jwt}`,
            },
        },
    });

    // -----HANDLERS-----
    const clickNext = () => setPage((prev) => prev + 1);

    const clickPrev = () => setPage((prev) => prev - 1);

    const changePageSize = (event: ChangeEvent<HTMLSelectElement>) => {
        setPageSize(+event.target.value);
    };

    const changeSortBy = (event: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value);
    };

    const generateTodos = async () => {
        for (let i = 0; i < 10; i++)
            try {
                await axiosInstance.post(
                    `/todos`,
                    {
                        data: {
                            title: faker.lorem.words({ min: 1, max: 5 }),
                            description: faker.lorem.words({ min: 3, max: 10 }),
                            user: [`${userData.user.id}`],
                        },
                    },
                    {
                        headers: {
                            Authorization: `bearer ${userData.jwt}`,
                        },
                    }
                );
            } catch (error) {
                console.error(error);
            }
        setQueryVersion((prev) => ++prev);
    };

    // ----HANDLE COMPONENT LOADING STATUS----
    if (isLoading) {
        // -----SKELETON-----
        return (
            <div role="status" className="animate-pulse">
                {Array.from({ length: 3 }, (_, index) => (
                    <div key={index} className="flex items-center min-h-12 bg-gray-500 px-2 py-3 rounded-md my-2">
                        <div className="w-64 md:w-64 h-2 bg-gray-300 rounded-md "></div>
                    </div>
                ))}
            </div>
        );
    }

    // ----HANDLE COMPONENT ERROR STATUS----
    if (error) return "An error has occurred: " + error.message;

    return (
        <section>
            <div className="mb-5 flex justify-between">
                <Button size={"sm"} onClick={generateTodos}>
                    Generate todos
                </Button>
                <div className="space-x-3">
                    <select className="border-2 bg-black text-white border-indigo-600 rounded-md p-2" value={sortBy} onChange={changeSortBy}>
                        <option disabled>Sort by</option>
                        <option value="ASC">Oldest</option>
                        <option value="DESC">Latest</option>
                    </select>

                    <select className="border-2 bg-black text-white border-indigo-600 rounded-md p-2" value={pageSize} onChange={changePageSize}>
                        <option disabled>Page size</option>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>
            {/* --------RENDER TODO-------- */}
            {data.data.length ? (
                <ul className="text-white space-y-3">
                    {data.data.map(({ id, attributes: { title } }: { id: number; attributes: { title: string } }) => (
                        <li key={id} className="p-3 rounded-lg flex items-center justify-between even:bg-gray-800 odd:bg-black hover:bg-gray-700">
                            <span>{`${id} - ${title}`}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <h3>No Todos Found...</h3>
            )}
            <Paginator isLoading={isLoading || isFetching} page={page} pageCount={data.meta.pagination.pageCount} total={data.meta.pagination.total} clickNext={clickNext} clickPrev={clickPrev} />
        </section>
    );
}

export default TodoListPage;
