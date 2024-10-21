import { redirect, type ActionFunctionArgs } from '@remix-run/node'
import { validationError } from 'remix-validated-form'
import { validator } from '../validator'

export const action = async ({ request }: ActionFunctionArgs) => {
  const result = await validator.validate(await request.formData())

  if (result.error) {
    return validationError(result.error)
  }

  return redirect('/')
}
