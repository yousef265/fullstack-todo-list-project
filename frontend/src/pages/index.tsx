import Todos from "../components/Todos";

interface IProps {}

function HomePage({}: IProps) {
    return (
        <>
            <main>
                <Todos />
            </main>
        </>
    );
}

export default HomePage;
