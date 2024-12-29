function TodoSkeleton() {
    return (
        <div role="status" className="animate-pulse p-2">
            <div className="flex items-center justify-between bg-gray-500 p-2 rounded-md">
                <div>
                    <div className="w-32 md:w-64 h-2 bg-gray-300 rounded-md"></div>
                </div>
                <div className="flex space-x-3">
                    <div className="h-10 w-[60px] bg-gray-300 rounded-md "></div>
                    <div className="h-10 w-[80px] bg-gray-300 rounded-md "></div>
                </div>
            </div>
        </div>
    );
}

export default TodoSkeleton;
