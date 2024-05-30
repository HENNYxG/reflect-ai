import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  {href: '/journal', label: 'Journal'}
]
const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10 pt-3 px-5">
        <div className="relative">
          <h2 className="text-3xl ">ReflectAI</h2>
        </div>
        <ul>
          {links.map((link) => (
            <li key={link.href} className="py-6 text-xl">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)] ">{children}</div>
      </div>
    </div>
  );
};
export default DashboardLayout;
//<Providers>{children}</Providers>