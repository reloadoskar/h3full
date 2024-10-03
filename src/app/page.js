import Link from "next/link";
import Navigation from "./Nav";

export default function Home() {
  return (
    <div className="flex flex-col mx-auto">
      <header>
        <Navigation />
        <section className="px-16 mx-auto overflow-hidden max-w-screen-xl grid gap-4 justify-items-center items-center pb-10 md:grid-cols-2">
          <img src="/comp1.png" alt="main image" className="w-full max-w-lg md:order-1 " />
          <article className="text-center space-y-5 md:text-left md:space-y-8">
            <h1 className="text-4xl font-bold md:text-5xl">Todos los detalles de tu negocio bajo control</h1>
            <p className="my-12 pb-12">Controla tu inventario, compras, ventas, gastos, productos, empleados, sucursales, todo en un mismo lugar.</p>
            <Link href="/register" className="botonlanding mt-10 mx-auto md:mx-0 px-12 py-6">Registro</Link>
          </article>
        </section>
      </header>

      <main>
        <section className='px-16 mx-auto overflow-hidden max-w-screen-xl text-center py-12 grid gap-12 md:grid-cols-2 md:text-left'>
          <article>
            <h2 className='text-3xl font-bold mb-6 md:text-4xl'>Controla todo</h2>
            <p>Tus compras, tus ventas, tus sucursales... Todo está en un sólo lugar y muy fácil de usar.</p>
          </article>
          <div className='grid gap-12'>
            <article className='space-y-4 md:space-y-6'>
              <p className='bg-gray-500 rounded-l-full flex font-bold items-center md:bg-transparent'>
                <span className='bg-yellow-400 text-white px-6 rounded-full py-2'>01</span>
                <span className='flex-1 p-2'>Un lugar para todo</span>
              </p>
              <p className='text-left'>
                Encuentra un espacio para crear, actualizar, eliminar, cualquier dato relacionado a la actividad de tu negocio. Crea compras, productores, clientes, etc. y manten su información siempre al día.
              </p>
            </article>

            <article className='space-y-4 md:space-y-6'>
              <p className='bg-gray-500 rounded-l-full flex font-bold items-center md:bg-transparent'>
                <span className='bg-yellow-400 text-white px-6 rounded-full py-2'>02</span>
                <span className='flex-1 p-2'>Reportes, ¡claro que sí!</span>
              </p>
              <p className='text-left'>
                Crea tus reportes de ventas, gastos, compras, liquidaciones, fácil y rápido, en pocos clicks y con un formato muy intuitivo.
              </p>
            </article>

            <article className='space-y-4 md:space-y-6'>
              <p className='bg-gray-500 rounded-l-full flex font-bold items-center md:bg-transparent'>
                <span className='bg-yellow-400 text-white px-6 rounded-full py-2'>03</span>
                <span className='flex-1 p-2'>Inventario, siempre en orden.</span>
              </p>
              <p className='text-left'>
                Haz movimientos entre sucursales, captura tus mermas, crea tus productos personalizados y visualiza en dónde están tus productos en cualquier momento.
              </p>
            </article>
          </div>
        </section>

        <section className="px-16 mx-auto text-center py-12 max-w-lg md:max-w-xl">
          <h2 className="text-3xl font-bold md:text-4xl">¿Qué dicen nuestros clientes?</h2>
          <div className="mt-24 mb-14">
            <article className="bg-gray-500 pt-16 pb-12 px-4 relative rounded-md">
              <img src="/avatarH5.png" alt="avatar cliente" className="absolute w-28 aspect-square -top-12 inset-x-0 mx-auto " />
              <h3 className="text-xl mb-4 pt-2 font-bold">Oskar</h3>
              <p>
                &quot;Es genial tener todo en un mismo lugar, puedo ver todo lo que necesito desde el dashboard, lo que más me gusta es poder visualizar como repartí mi inventario en todas mis sucursales.&quot;
              </p>
            </article>
          </div>
          <Link href="/register" className="botonlanding py-6 px-8 mx-auto">Registrate ¡GRATIS!</Link>
        </section>

        <section className="px-16 w-full bg-yellow-500 font-bold">
          <div className="contenedor py-24 text-center grid gap-6 md:grid-cols-[40%_40%] md:justify-between md:items-center md:text-left">
            <h2 className="text-4xl">Comienza desde hoy a tener el control total de tu negocio.</h2>
            <Link href="#" className="botonlanding bg-gray-900 hover:bg-gray-950 mx-auto md:mx-0 md:justify-self-end text-white py-4 px-12">¡Registrate ya!</Link>
          </div>
        </section>
      </main>

      <footer className="py-12 ">
        <section className="px-12 mx-auto overflow-hidden max-w-screen-xl grid gap-12 justify-items-center footer-area md:footer-area-md md:grid-cols-3 md:justify-items-stretch">
          <form className="flex gap-2 min-w-[100px] w-full [grid-area:form]">
            <input type="email" required placeholder="Recibe noticias en tu correo" className="min-w-[50px] flex-1 rounded-full px-4" />
            <input type="submit" value="Ok" className=" py-4 rounded-full bg-gray-400 px-4 hover:bg-gray-500" />
          </form>
          <nav className="grid grid-cols-[max-content_max-content] gap-y-4 justify-between w-4/5 [grid-area:navigation] md:w-full">
            <Link href="#">Home</Link>
            <Link href="#">Precios</Link>
            <Link href="#">Productos</Link>
            <Link href="#">¿Quienes somos?</Link>
            <Link href="#">Contacto</Link>
            <Link href="#">Politica de privacidad</Link>
          </nav>

          <div className="flex flex-wrap gap-4 justify-between w-full [grid-area:social-media]">
            <Link href="#">
              <img className="w-8 invert dark:invert-0" src="/facebook.svg" alt="fb icon" />
            </Link>
            <Link href="#">
              <img className="w-8 invert dark:invert-0" src="/instagram.svg" alt="fb icon" />
            </Link>
            <Link href="#">
              <img className="w-8 invert dark:invert-0" src="/twitter.svg" alt="fb icon" />
            </Link>
            <Link href="#">
              <img className="w-8 invert dark:invert-0" src="/youtube.svg" alt="fb icon" />
            </Link>
          </div>
          <img width={120} src="/logoHadria3800x800.png" alt="logo hadria" className="[grid-area:logo] mx-auto dark:invert" />
          <p className="text-gray-300 text-center [grid-area:copy] md:text-right">Copyright 2023. Todos los derechos reservados. </p>
        </section>
      </footer>
    </div>
  );
}
