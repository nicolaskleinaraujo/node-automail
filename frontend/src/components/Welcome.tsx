// Components
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Modules
import React, { Dispatch, SetStateAction } from "react"

interface WelcomeProps {
    setSteps: Dispatch<SetStateAction<number>>
}

const Welcome: React.FC<WelcomeProps> = ({ setSteps }) => {
    return (
        <div className="flex flex-col justify-center items-center text-center w-11/12 max-w-md md:max-w-lg lg:max-w-xl">
            <Card className="flex flex-col justify-center items-center text-center w-11/12 max-w-md md:max-w-lg lg:max-w-xl">
                <CardHeader>
                    <Avatar className="w-16 h-16 m-auto">
                        <AvatarImage src="https://github.com/nicolaskleinaraujo.png" />
                    </Avatar>

                    <CardDescription>
                        Receba a Newsletter do <a href="https://filipedeschamps.com.br/newsletter" target="_blank" className="underline animate-pulse text-yellow-300">Filipe Deschamps</a> em sua conta Kindle
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-3 sm:flex-row">
                    <Button variant="outline" onClick={() => setSteps(1)}>Iniciar passo-a-passo</Button>
                    <Button variant="destructive" onClick={() => setSteps(4)}>Remover e-mail</Button>
                </CardContent>
            </Card>

            <Badge className="mt-3">
                <span className="inline-flex w-2 h-2 mr-2 rounded-full bg-green-500 animate-pulse"></span> XX usuários ativos
            </Badge>
        </div>
    )
}

export default Welcome
