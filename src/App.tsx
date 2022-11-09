import './App.css'
import {
    useQuery,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import Header from './components/Header/Header';
//@ts-ignore
import ChatBot from 'react-simple-chatbot';
import {useEffect, useState} from "react";
import bot from "./assets/bot.svg";
// @ts-ignore
import {ThemeProvider} from 'styled-components';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';

const theme = {
    fontFamily: 'Helvetica Neue',
    headerBgColor: 'rgb(73, 118, 186)',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: 'rgb(73, 118, 186)',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
};

function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Header/>
                <Test />
                <Footer />
            </div>
        </QueryClientProvider>
    )
}

export default App
const Test = () => {
    const [showChat, setShowChat] = useState(false);
    const [isEcoMode, setIsEcoMode] = useState(localStorage.getItem('ecoMode') === 'true' || false);
    const [img, setImg] = useState('');
    const {data, isLoading, isError} = useQuery(['test'], () => {
        return fetch(
            'https://http-nodejs-production-0920.up.railway.app').then((res) =>
            res.json()
        )
    })

    const loadImage = () => {
        import('./assets/car_banner.jpg').then(image => {
            setImg(image.default)
        });
    }
    useEffect(() => {
        if (!isEcoMode && img === '') {
            loadImage()
        }
    }, [isEcoMode])

    const steps = [
        {
            id: '1',
            message: `Grams? ${data?.websiteCarbon?.grams}`,
            trigger: '2',
        },
        {
            id: '2',
            message: `Litres? ${data?.websiteCarbon?.litres}`,
            trigger: '3'
        },
        {
            id: '3',
            message: `Carbon Intensity? ${data?.carbonIntensity?.carbonIntensity}`,
            trigger: '4'
        },
        {
            id: '4',
            component: (
                <button onClick={() => {
                    // @ts-ignore
                    console.log(isEcoMode)
                    setIsEcoMode(!isEcoMode);
                    localStorage.setItem('ecoMode', (!isEcoMode).toString())
                }}> Eco Mode aktivieren/deaktivieren</button>
            ),
            end: true,
        },
    ]

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    return (
        <>
            {!isEcoMode && img && <Hero imageSrc={img} />}

            <div className='fab-container'>

                {showChat && (<ThemeProvider theme={theme}><ChatBot theme={theme} steps={steps} botAvatar={bot}
                                                                    headerTitle={'BlaBla'}/></ThemeProvider>)}
                <img
                    src={bot}
                    height={'70px'}
                    alt="AXA Bot"
                    onClick={() => setShowChat(!showChat)}
                />

            </div>
        </>)

}