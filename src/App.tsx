import './App.css'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import Header from './components/Header/Header';
//@ts-ignore
import ChatBot from 'react-simple-chatbot';
import {useState} from "react";


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
    const [showChat, setShowChat] = useState(false)
    const {data, isLoading, isError} = useQuery(['test'], () => {
        return fetch(
            'https://http-nodejs-production-0920.up.railway.app').then((res) =>
            res.json()
        )
    })

    const steps = [
        {
            id: '1',
            message: `Grams? ${data?.websiteCarbon?.grams}`,
            trigger: '2',
        },
        /*   {
               id: '2',
               user: true,
               trigger: '3',
           },*/
        {
            id: '2',
            message: `Litres? ${data?.websiteCarbon?.litres}`,
            trigger: '3'
        },
        {
            id: '3',
            message: `Carbon Intensity? ${data?.carbonIntensity?.carbonIntensity}`,
            end: true,
        },
    ]

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    if (data) {
        return (
            <div>
                <button onClick={() => setShowChat(true)}>Show bot</button>
                {showChat && (<ChatBot steps={steps}/>)}
            </div>)
    }
}