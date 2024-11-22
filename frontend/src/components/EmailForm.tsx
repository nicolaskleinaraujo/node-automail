// Components
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Modules
import React, { Dispatch, SetStateAction } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import apiFetch from "@/config/axios"
import z from "zod"

interface EmailFormProps {
    setSteps: Dispatch<SetStateAction<number>>
}

const formSchema = z.object({
    email: z.string().email().trim().max(150),
})

const EmailForm: React.FC<EmailFormProps> = ({ setSteps }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    const handleRegister: (values: z.infer<typeof formSchema>) => Promise<void> = async(values) => {
        try {
            await apiFetch.post("/email", { email: values.email })
            setSteps(3)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)}>
                <FormField 
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Seu e-mail do Kindle" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" variant="secondary" className="mt-2">Registrar</Button>
            </form>
        </Form>
    )
}

export default EmailForm
