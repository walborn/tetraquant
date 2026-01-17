'use server'

import { refresh } from 'next/cache'
import { cookies } from 'next/headers'

import { z } from 'zod'

const FormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
})

export type State = {
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
  }
  message?: string | null
}

export async function submitContactForm(_prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    }
  }

  // Prepare data for insertion into the database
  const { name, email, message } = validatedFields.data

  // Send email
  // console.log('Данные формы:', { name, email, message })
  // await sendEmail(rawData);

  // Revalidate the cache for the invoices page and redirect the user.
  // import { redirect } from 'next/navigation';
  // import { revalidatePath } from 'next/cache'
  // redirect('/thank-you');
  // revalidatePath('/contacts')
  return { success: true }
}

export async function setLocaleCookie(newLocale: string) {
  const cookieStore = await cookies()

  // Установка новой куки с локалью
  cookieStore.set('locale', newLocale, {
    path: '/',
  })

  refresh()
}
