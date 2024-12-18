// Components
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoveLeft } from "lucide-react"
import EmailForm from "@/components/EmailForm"

// Modules
import React, { Dispatch, SetStateAction } from "react"

interface KindleEmailProps {
    setSteps: Dispatch<SetStateAction<number>>
}

const KindleEmail: React.FC<KindleEmailProps> = ({ setSteps }) => {
    return (
        <Tabs defaultValue="kindle">
            <TabsList className="grid w-11/12 grid-cols-2 mx-auto">
                <TabsTrigger value="kindle">Kindle</TabsTrigger>
                <TabsTrigger value="app">Aplicativo</TabsTrigger>
            </TabsList>

            <TabsContent value="kindle">
                <Card className="flex flex-col justify-center items-center text-center mx-auto w-11/12 max-w-md md:max-w-lg lg:max-w-xl">
                    <CardContent>
                        <p className="my-5">
                            No seu dispositivo Kindle entre em "Todas as configurações". Entre na aba "Sua conta". Informe o "E-mail do Send to Kindle" abaixo:
                        </p>

                        <EmailForm setSteps={setSteps} handleType="REGISTER" />
                    </CardContent>

                    <CardFooter className="flex justify-start w-full">
                        <Button variant="outline" onClick={() => setSteps(1)}><MoveLeft /> Voltar</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            <TabsContent value="app">
                <Card className="flex flex-col justify-center items-center text-center mx-auto w-11/12 max-w-md md:max-w-lg lg:max-w-xl">
                    <CardContent>
                        <p className="my-5">
                            Em seu aplicativo "Amazon Kindle", entre em "configurações" e informe o "Endereço de e-mail Enviar para o Kindle" no campo abaixo:
                        </p>

                        <EmailForm setSteps={setSteps} handleType="REGISTER" />
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
