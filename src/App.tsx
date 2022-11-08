import './App.css'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import Header from './components/Header/Header';

function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Header/>
                <Test/>
            </div>
        </QueryClientProvider>
    )
}

export default App
const Test = () => {
    const {data, isLoading, isError} = useQuery(['test'], () => {
        return fetch('https://jsonplaceholder.typicode.com/todos/').then((res) =>
            res.json()
        )
    })
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    return (
        <div>
            <ul>
                {data.map((item) => (<li>{item.title}</li>))}
            </ul>
        </div>)
}