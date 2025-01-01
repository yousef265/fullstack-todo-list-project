import { faker } from "@faker-js/faker";
import { ChangeEvent, useState } from "react";
import axiosInstance from "../config/axios.config";
import useCustomQuery from "../hooks/useCustomQuery";
import { ITodo } from "../interfaces";
import { todoValidation } from "../validation";
import InputMessageError from "./InputMessageError";
import Toaster from "./toaster";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Textarea from "./ui/Textarea";
import TodoSkeleton from "./ui/TodoSkeleton";
interface IProps {}

function Todos({}: IProps) {
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const todoDefaultValue: ITodo = {
        id: 0,
        title: "",
        description: "",
    };
    const [errors, setErrors] = useState<{ title: string; description: string }>({
        title: "",
        description: "",
    });
    const [currentTodo, setCurrentTodo] = useState<ITodo>(todoDefaultValue);
    const [isLoadingStatus, setIsLoadingStatus] = useState<boolean>(false);
    const [queryVersion, setQueryVersion] = useState<number>(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
    const [postTodoData, setPostTodoData] = useState({
        title: "",
        description: "",
    });
    // ----RENDER DATA----

    const { data, isLoading, error } = useCustomQuery({
        queryKey: ["Todos", `${queryVersion}`],
        url: "/users/me?populate=*",
        config: {
            headers: {
                Authorization: `bearer ${userData.jwt}`,
            },
        },
    });

    // ----HANDLERS----

    const toggleEditModal = (todo: ITodo | null = null) => {
        setIsEditModalOpen(!isEditModalOpen);
        setCurrentTodo(todo || todoDefaultValue);
        setErrors({ description: "", title: "" });
    };

    const toggleConfirmModal = (todo: ITodo | null = null) => {
        setIsConfirmModalOpen(!isConfirmModalOpen);
        setCurrentTodo(todo || todoDefaultValue);
    };

    const togglePostModal = () => setIsPostModalOpen(!isPostModalOpen);

    // ----REMOVE TODO----

    const removeTodo = async () => {
        const { id } = currentTodo;
        setIsLoadingStatus(true);
        try {
            await axiosInstance.delete(`/todos/${id}`, {
                headers: {
                    Authorization: `bearer ${userData.jwt}`,
                },
            });

            setQueryVersion((prev) => ++prev);
            toggleConfirmModal();
            Toaster({ message: "successfully, Todo is Deleted!", toastType: "success" });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingStatus(false);
        }
    };

    // ----UPDATE TODO----

    const onChangeEdit = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCurrentTodo((prev) => ({ ...prev, [name]: value }));
    };

    const editTodo = async () => {
        setIsLoadingStatus(true);

        const { description, id, title } = currentTodo;

        if (todoValidation(currentTodo).description || todoValidation(currentTodo).title) {
            setErrors(todoValidation(currentTodo));
            setIsLoadingStatus(false);
            return;
        }

        setErrors({ description: "", title: "" });

        try {
            await axiosInstance.put(
                `/todos/${id}`,
                {
                    data: {
                        title,
                        description,
                    },
                },
                {
                    headers: {
                        Authorization: `bearer ${userData.jwt}`,
                    },
                }
            );
            setQueryVersion((prev) => ++prev);
            toggleEditModal();
            Toaster({ message: "successfully, Todo Is Updated!", toastType: "success" });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingStatus(false);
        }
    };

    // ----POST NEW TODO----
    const onChangePost = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setPostTodoData((prev) => ({ ...prev, [name]: value }));
    };

    const postNewTodo = async () => {
        setIsLoadingStatus(true);

        const { description, title } = postTodoData;

        if (todoValidation(postTodoData).description || todoValidation(postTodoData).title) {
            setErrors(todoValidation(postTodoData));
            setIsLoadingStatus(false);
            return;
        }

        setErrors({ description: "", title: "" });

        try {
            await axiosInstance.post(
                `/todos`,
                {
                    data: {
                        title,
                        description,
                        user: [`${userData.user.id}`],
                    },
                },
                {
                    headers: {
                        Authorization: `bearer ${userData.jwt}`,
                    },
                }
            );
            setQueryVersion((prev) => ++prev);
            togglePostModal();
            Toaster({ message: "successfully, Todo is updated!", toastType: "success" });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingStatus(false);
        }
    };

    // ----POST NEW TODO----
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
        return (
            <div>
                <div role="status" className="animate-pulse">
                    <div className="flex my-5 w-fit mx-auto space-x-4 rounded-md">
                        <div className="h-10 w-[129px] bg-gray-300 rounded-md "></div>
                        <div className="h-10 w-[135px] bg-gray-300 rounded-md "></div>
                    </div>
                </div>
                {Array.from({ length: 3 }, (_, index) => (
                    <TodoSkeleton key={index} />
                ))}
            </div>
        );
    }

    // ----HANDLE COMPONENT ERROR STATUS----
    if (error) return "An error has occurred: " + error.message;

    return (
        <section>
            <div className="flex my-5 w-fit mx-auto space-x-4">
                <Button variant={"outline"} className="bg-indigo-500 text-white active:bg-indigo-500" size={"sm"} onClick={togglePostModal}>
                    Post New Todo
                </Button>

                <Button className="text-white active:bg-indigo-600" size={"sm"} onClick={generateTodos}>
                    Generate Todos
                </Button>
            </div>

            {/* Render Todos */}
            {data.todos.length ? (
                <ul className="text-white space-y-3">
                    {data.todos.map((todo: ITodo, index: number) => (
                        <li key={todo.id} className="p-3 rounded-lg flex items-center justify-between even:bg-gray-800 odd:bg-black hover:bg-gray-700">
                            <span>{`${index + 1}- ${todo.title}`}</span>
                            <span className="flex space-x-3">
                                <Button size="sm" onClick={() => toggleEditModal(todo)}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => toggleConfirmModal(todo)}>
                                    Remove
                                </Button>
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <h3>No Todos Found...</h3>
            )}

            {/* POST TODO MODAL */}
            <Modal isOpen={isPostModalOpen} closeModal={togglePostModal} title="Post New Todo">
                <form className="space-y-3">
                    <div>
                        <Input name="title" value={postTodoData.title} onChange={onChangePost} placeholder="Todo Title" />
                        {errors.title && <InputMessageError msg={errors.title} />}
                    </div>
                    <div>
                        <Textarea name="description" value={postTodoData.description} onChange={onChangePost} placeholder="Todo Description" />
                        {errors.description && <InputMessageError msg={errors.description} />}
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button type="button" fullWidth variant={"outline"} className="bg-indigo-500 text-white active:bg-indigo-500" size={"sm"} isLoading={isLoadingStatus} onClick={postNewTodo}>
                            Create
                        </Button>
                        <Button type="button" onClick={togglePostModal} fullWidth variant={"cancel"} className="active:bg-gray-300" size={"sm"}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Update TODO MODAL */}
            <Modal isOpen={isEditModalOpen} closeModal={toggleEditModal} title="Edit Todo">
                <form className="space-y-3">
                    <div>
                        <Input name="title" value={currentTodo.title} onChange={onChangeEdit} placeholder="Todo Title" />
                        {errors.title && <InputMessageError msg={errors.title} />}
                    </div>
                    <div>
                        <Textarea name="description" value={currentTodo.description} onChange={onChangeEdit} placeholder="Todo Description" />
                        {errors.description && <InputMessageError msg={errors.description} />}
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button type="button" fullWidth variant={"outline"} className="bg-indigo-500 text-white active:bg-indigo-500" size={"sm"} isLoading={isLoadingStatus} onClick={editTodo}>
                            Update
                        </Button>
                        <Button type="button" onClick={() => toggleEditModal()} fullWidth variant={"cancel"} className="active:bg-gray-300" size={"sm"}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* DELETE TODO CONFIRM MODAL */}
            <Modal
                isOpen={isConfirmModalOpen}
                closeModal={toggleConfirmModal}
                title="Are you sure you want to remove this Todo from your Store?"
                description="Deleting this Todo will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
            >
                <div className="flex items-center space-x-3">
                    <Button fullWidth isLoading={isLoadingStatus} variant={"danger"} size={"sm"} onClick={removeTodo}>
                        Yes, remove
                    </Button>
                    <Button fullWidth type="button" variant={"cancel"} size={"sm"} onClick={() => toggleConfirmModal()}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        </section>
    );
}

export default Todos;
