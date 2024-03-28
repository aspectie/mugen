import { Link, useActionData } from "@remix-run/react";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { ValidatedForm, validationError } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

import {FormField} from "@/ui/form/Field";
import Button from "@/ui/button/Button";
import Input from "@/ui/input/Input";

export const validator = withZod(
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
    password: z
      .string()
      .min(1, { message: "Password is required" })
  })
);

export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const result = await validator.validate(
    await request.formData()
  );

  if (result.error) {
    return validationError(result.error);
  }

  // TODO: check if email exists 

  return redirect("/");
};

export default function RegisterPage() {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="p-l bg-gray-20 xl:w-3/5 rounded-lg shadow-md">
          <div className="flex justify-between items-end mb-2xl">
            <h1 className="font-bold text-black-80">Регистрация</h1>
            <Link to="/login">
              <h5 className="hover:text-accent-100">Войти</h5>
            </Link>
          </div>
          <ValidatedForm validator={validator} method="post">
            <div className="w-full mb-l">
              <FormField name="email" type="email" >
                <Input placeholder="E-mail"/>
              </FormField>
            </div>
            <div className="w-full mb-xl">
              <FormField name="password" type="password">
                <Input placeholder="Пароль"/>
              </FormField>
            </div>
            <div className="w-full flex justify-center">
              <div>
                <Button text="Зарегистрироваться" />
              </div>
            </div>
          </ValidatedForm>
        </div>
      </div>
    )
}