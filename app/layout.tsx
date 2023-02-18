import { getServerSession } from 'next-auth'
import SessionProvider from '../providers/SessionProvider'
import ClientProvider from '../providers/ClientProvider'
import Login from '../components/Login'
import Sidebar from '../components/Sidebar'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import './../styles/globals.css'
// import ThemeProvider from '../providers/ThemeProvider'
import dynamic from 'next/dynamic';


// Fixes: Hydration failed because the initial UI does not match what was rendered on the server.
const DynamicContextProvider = dynamic(() => import('../providers/ThemeProvider').then(mod => mod.default), {
  ssr: false
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)

  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ?
            <Login />
            :
            <DynamicContextProvider>
              <div className='flex flex-col md:flex-row'>

                {/* SIDEBAR */}
                <div className={`z-20`}>
                  <Sidebar />
                </div>
                {/* CLIENT PROVIDER */}
                <ClientProvider />

                <div className='bg-white dark:bg-[#343541] flex-1 duration-300'>
                  {children}
                </div>
              </div>
            </DynamicContextProvider>
          }
        </SessionProvider>
      </body>
    </html>
  )
}
