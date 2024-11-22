// Components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// Modules
import React from "react"

const EndScreen: React.FC = () => {
    return (
        <Card className="flex flex-col justify-center items-center text-center w-full max-w-72 sm:max-w-md md:max-w-lg lg:max-w-xl">
            <CardHeader>
                <CardTitle>Tudo pronto!!</CardTitle>
            </CardHeader>

            <CardContent>
                <p className="my-3">No próximo dia útil as 12 horas você recebera a Newsletter do Filipe Deschamps em sua conta Kindle</p>
                <p className="my-3">Saiba mais sobre a Newsletter do <a href="https://filipedeschamps.com.br/newsletter" target="_blank" className="underline animate-pulse text-yellow-300">Filipe Deschamps</a></p>
                <p className="text-sm opacity-70 mt-8">Você ja pode fechar essa janela</p>
            </CardContent>
        </Card>
    )
}

export default EndScreen
