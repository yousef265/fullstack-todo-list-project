import Todos from "../components/ui/Todos";

interface IProps {}

function HomePage({}: IProps) {
    return (
        <>
            <main className="container">
                <Todos />
            </main>
        </>
    );
}

export default HomePage;
