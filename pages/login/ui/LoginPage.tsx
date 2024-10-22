import { Link, useActionData } from '@remix-run/react'
import { ValidatedForm } from 'remix-validated-form'

import { useTranslation } from 'react-i18next'

import { FormField } from 'shared/ui'
import { Button } from 'shared/ui'
import { Input } from 'shared/ui'

import { validator } from '../validator'

export function LoginPage() {
  // TODO: pass to notification
  // const data = useActionData<typeof action>()
  const { t } = useTranslation('account')

  return (
    <div className="container mx-auto h-screen flex items-center justify-center">
      <div className="p-l bg-gray-20 xl:w-3/5 rounded-lg shadow-md">
        <div className="flex justify-between items-end mb-2xl">
          <h1 className="font-bold text-black-80">{t('login')}</h1>
          <Link to="/register">
            <h5 className="hover:text-accent-100">{t('registration')}</h5>
          </Link>
        </div>
        <ValidatedForm
          validator={validator}
          method="post"
        >
          <div className="w-full mb-l">
            <FormField
              name="email"
              type="email"
            >
              <Input placeholder={t('email')} />
            </FormField>
          </div>
          <div className="w-full mb-xl">
            <FormField
              name="password"
              type="password"
            >
              <Input placeholder={t('password')} />
            </FormField>
          </div>
          <div className="w-full flex justify-between">
            <Link
              to="/forgot"
              className="hover:text-accent-100"
            >
              {t('forgot password')}
            </Link>
            <div className="w-1/5">
              <Button text={t('sign in')} />
            </div>
          </div>
        </ValidatedForm>
      </div>
    </div>
  )
}
