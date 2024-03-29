import { Link } from "@remix-run/react"
import {NotFoundIcon} from '@/assets/icons'

export default function NotFound() {
  return (
    <div className="h-screen">
      <div className="h-3/5 text-center">
        <div className="pt-[10%] absolute w-full">
          <h1 className="text-[48px] mb-m text-black-80 font-bold">Страница не найдена</h1>
          <h3 className="text-black-60 mb-s">К сожалению, запрашиваемая страница не найдена.</h3>
          <Link to="/"><h3 className="text-accent-80 hover:text-accent-120">Перейти на главную</h3></Link>
        </div>
      </div>
      <div className="bg-blue-60 h-2/5 relative">
        <div className="absolute top-[-120px] w-full ">
          <NotFoundIcon  className="m-auto"/>
        </div>
      </div>
    </div>
  )
}