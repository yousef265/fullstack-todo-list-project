import { ChangeEvent, FormEvent, useState } from "react";
import axiosInstance from "../config/axios.config";
import useAuthenticatedQuery from "../hooks/useCustomQuery";
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
    const todoDefaultValue: ITodo = {
        id: 0,
        title: "",
        description: "",
    };
    const [errors, setErrors] = useState<ITodo>(todoDefaultValue);
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentTodo, setCurrentTodo] = useState<ITodo>(todoDefaultValue);
    const [isLoadingStatus, setIsLoadingStatus] = useState(false);
    const [queryVersion, setQueryVersion] = useState(1);
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

    // ----RENDER DATA----

    const { data, isLoading, error } = useAuthenticatedQuery({
        queryKey: ["Todos", `${queryVersion}`],
        url: "/users/me?populate=*",
        config: {
            headers: {
                Authorization: `bearer ${userData.jwt}`,
            },
        },
    });

    // ----HANDLERS----

    const closeConfirmModal = () => {
        setIsOpenConfirmModal(false);
    };
    const openConfirmModal = (todo: ITodo) => {
        setCurrentTodo(todo);
        setIsOpenConfirmModal(true);
    };

    const isModalOpen = (todo: ITodo) => {
        setIsOpen(true);
        setCurrentTodo(todo);
    };

    const isModalClose = () => {
        setIsOpen(false);
        setCurrentTodo(todoDefaultValue);
        setErrors(todoDefaultValue);
    };

    const onChangeEdit = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCurrentTodo((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmitEdit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoadingStatus(true);

        const { description, id, title } = currentTodo;
        if (todoValidation(currentTodo).description || todoValidation(currentTodo).title) {
            setErrors(todoValidation(currentTodo));
            setIsLoadingStatus(false);
            return;
        }

        setErrors(todoDefaultValue);

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
            isModalClose();
            setQueryVersion((prev) => prev + 1);
            Toaster({ message: "successfully, Todo is updated!", toastType: "success" });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingStatus(false);
        }
    };

    const removeTodo = async () => {
        const { id } = currentTodo;
        setIsLoadingStatus(true);
        try {
            await axiosInstance.delete(`/todos/${id}`, {
                headers: {
                    Authorization: `bearer ${userData.jwt}`,
                },
            });
            closeConfirmModal();
            setQueryVersion((prev) => prev + 1);
            Toaster({ message: "successfully, Todo is Deleted!", toastType: "success" });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingStatus(false);
        }
    };

    if (isLoading) {
        return (
            <div>
                {Array.from({ length: 3 }, (_, index) => (
                    <TodoSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (error) return "An error has occurred: " + error.message;

    return (
        <section>
            {data.todos.length ? (
                <ul className="text-white space-y-3">
                    {data.todos.map((todo: ITodo, index: number) => (
                        <li key={todo.id} className="p-3 rounded-lg flex items-center justify-between even:bg-gray-800 odd:bg-black hover:bg-gray-700">
                            <span>{`${index + 1}- ${todo.title}`}</span>
                            <span className="flex space-x-3">
                                <Button size="sm" onClick={() => isModalOpen(todo)}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => openConfirmModal(todo)}>
                                    Remove
                                </Button>
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <h3>No Todos Found</h3>
            )}
            {/* Update TODO MODAL */}

            <Modal isOpen={isOpen} closeModal={isModalClose} title="Edit Todo">
                <form className="space-y-3" onSubmit={onSubmitEdit}>
                    <div>
                        <Input name="title" value={currentTodo.title} onChange={onChangeEdit} placeholder="Todo Title" />
                        {errors.title && <InputMessageError msg={errors.title} />}
                    </div>
                    <div>
                        <Textarea name="description" value={currentTodo.description} onChange={onChangeEdit} placeholder="Todo Description" />
                        {errors.description && <InputMessageError msg={errors.description} />}
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button type="submit" fullWidth variant={"outline"} className="bg-indigo-500 text-white active:bg-indigo-500" size={"sm"} isLoading={isLoadingStatus}>
                            Update
                        </Button>
                        <Button type="button" onClick={isModalClose} fullWidth variant={"cancel"} className="active:bg-gray-300" size={"sm"}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* DELETE TODO CONFIRM MODAL */}
            <Modal
                isOpen={isOpenConfirmModal}
                closeModal={closeConfirmModal}
                title="Are you sure you want to remove this Todo from your Store?"
                description="Deleting this Todo will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
            >
                <div className="flex items-center space-x-3">
                    <Button fullWidth isLoading={isLoadingStatus} variant={"danger"} size={"sm"} onClick={removeTodo}>
                        Yes, remove
                    </Button>
                    <Button fullWidth type="button" variant={"cancel"} size={"sm"} onClick={closeConfirmModal}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        </section>
    );
}

export default Todos;
