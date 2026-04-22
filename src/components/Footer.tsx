import { Link } from 'react-router-dom';

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ],
};

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 lg:px-8">
        <div className="text-center mb-10">
          <Link to="/" className="text-2xl font-bold tracking-tight text-white">
            Hawi Software Solutions
          </Link>
        </div>
        <nav className="-mb-6 flex justify-center gap-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link to={item.href} className="text-sm leading-6 text-slate-300 hover:text-white transition-colors">
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <p className="mt-16 text-center text-xs leading-5 text-slate-400">
          &copy; {new Date().getFullYear()} Hawi Software Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
