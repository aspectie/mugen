import {Link} from "@remix-run/react";
import { Form, Field } from 'react-final-form'
import Button from "@/ui/button/button";
import Input from "@/ui/input/Input";

export default function AnimePage() {
    function submit(values: any) {}
    function validate(values: any) {}

    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="p-l bg-gray-20 xl:w-3/5 rounded-lg shadow-md">
          <div className="flex justify-between items-end mb-2xl">
            <h1 className="font-bold text-black-80">Вход</h1>
            <Link to="/register">
              <h5>Регистрация</h5>
            </Link>
          </div>
          <div>
            <Form 
              onSubmit={submit}
              // validate={validate}
              render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                  <div className="w-full mb-xl">
                    <Field name="email">
                      {({input}) => (<Input type="email" placeholder="E-mail" {...input}/>)}
                    </Field>
                  </div>
                  <div className="w-full mb-xl">
                    <Field name="password">
                      {({input}) => (<Input type="password" placeholder="Пароль" {...input}/>)}
                    </Field>
                  </div>
                  <div className="w-full flex justify-between">
                    <Link to="/forgot">Забыл пароль</Link>
                    <div className="w-1/5">
                      <Button text="Вход" />
                    </div>
                  </div>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    )
}