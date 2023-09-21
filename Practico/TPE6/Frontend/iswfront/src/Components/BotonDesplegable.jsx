import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { AiFillShopping } from "react-icons/ai";
import { AiFillShop } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { SiGoogleforms } from "react-icons/si";
import { TbTruckReturn } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const solutions = [
  { name: 'Pedido de lo que sea', description: 'Puedes realizar un pedido a comercios que no esten adheridos', icon: AiFillShopping , ruta:'/pedidos' },
  { name: 'Pedido en comercio adherido', description: 'Realizar el pedido de tus objetos en el carrito', icon: AiFillShop },
  { name: 'Mis pedidos', description: "", icon: AiOutlineShoppingCart },
  { name: 'Historia de Pedidos', description: '', icon: SiGoogleforms },
]
const callsToAction = [
  { name: 'Devoluciones', icon: TbTruckReturn },
  { name: 'Mis Puntos', icon: AiFillStar },
]


export default function Desplegable() {

    const navigate = useNavigate();

    return (
    <Popover className="relative">
      <Popover.Button className="text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-blue-300">
        <span>Pedidos</span>
        {/*<ChevronDownIcon className="h-5 w-5" aria-hidden="true" />*/}
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {solutions.map((item) => (
                <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50" onClick={() => navigate(item.ruta)}>
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <item.icon className="h-6 w-6 text-cyan-800 group-hover:text-cyan-900" aria-hidden="true" />
                  </div>
                  <div>
                    <a href={item.href} className="font-semibold text-gray-900">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
              {callsToAction.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                >
                   <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
