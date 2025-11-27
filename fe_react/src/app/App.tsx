import './App.css'
import {Outlet} from 'react-router-dom';
import {Card, CardDescription, CardHeader, CardTitle} from '../components/ui/card'

function App() {

    return (
        <>
            <h1 className="text-red-900 bg-white">Hello world</h1>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>

                </CardHeader>
            </Card>
            <Outlet />
        </>
    )
}

export default App
