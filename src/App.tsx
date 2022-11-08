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
        return fetch(
            'https://http-nodejs-production-0920.up.railway.app').then((res) =>
            res.json()
        )
    })
    console.log(data)
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    return (
        <div>
            <p>Grams: {data.grams}</p>
            <p>Litres: {data.litres}</p>
        </div>)
}