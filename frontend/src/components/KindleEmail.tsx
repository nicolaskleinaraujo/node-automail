// Components
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoveLeft } from "lucide-react"

// Modules
import React, { Dispatch, SetStateAction } from "react"

interface KindleEmailProps {
    setSteps: Dispatch<SetStateAction<number>>
}

const KindleEmail: React.FC<KindleEmailProps> = ({ setSteps }) => {
    const handleRegister: () => void = () => {
        console.log("registered")
        setSteps(3)
    }

    return (
        <Tabs defaultValue="kindle">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="kindle">Kindle</TabsTrigger>
                <TabsTrigger value="app">Aplicativo</TabsTrigger>
            </TabsList>

            <TabsContent value="kindle">
                <Card className="flex flex-col justify-center items-center text-center w-full max-w-72 sm:max-w-md md:max-w-lg lg:max-w-xl">
                    <CardContent>
                        <p className="my-5">
                            No seu dispositivo Kindle entre em "Todas as configurações". Entre na aba "Sua conta". Informe o "E-mail do Send to Kindle" abaixo:
                        </p>

                        <Input placeholder="Seu e-mail do Kindle" />
                        <Button variant="secondary" onClick={() => handleRegister()} className="mt-2">Registrar</Button>
                    </CardContent>

                    <CardFooter className="flex justify-start w-full">
                        <Button variant="outline" onClick={() => setSteps(1)}><MoveLeft /> Voltar</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            <TabsContent value="app">
                <Card className="flex flex-col justify-center items-center text-center w-full max-w-72 sm:max-w-md md:max-w-lg lg:max-w-xl">
                    <CardContent>
                        <p className="my-5">
                            Em seu aplicativo "Amazon Kindle", entre em "configurações" e informe o "Endereço de e-mail Enviar para o Kindle" no campo abaixo:
                        </p>

                        <Input placeholder="Seu e-mail do Kindle" />
                        <Button variant="secondary" onClick={() => handleRegister()} className="mt-2">Registrar</Button>
                    </CardContent>

                    <CardFooter className="flex justify-start w-full">
                        <Button variant="outline" onClick={() => setSteps(1)}><MoveLeft /> Voltar</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

export default KindleEmail
