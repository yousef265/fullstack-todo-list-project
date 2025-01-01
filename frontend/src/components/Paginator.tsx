import Button from "./ui/Button";

interface IProps {}

const Paginator = ({}: IProps) => {
    return (
        <div className="flex justify-center items-center mt-10 left-1/2 -translate-x-1/2  fixed bottom-10">
            <p className="text-sm text-gray-300 mx-3">
                Page <span className="mx-1 font-bold text-white">1</span> to
                <span className="mx-1 font-bold text-white">3</span> of
                <span className="mx-1 font-bold text-white">10</span> Records
            </p>

            <div className="flex items-center space-x-2">
                <Button type="button">
                    <div className="flex flex-row align-middle">
                        <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <p className="ml-2">Prev</p>
                    </div>
                </Button>

                <Button type="button">
                    <div className="flex flex-row align-middle">
                        <span className="mr-2">Next</span>
                        <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default Paginator;
