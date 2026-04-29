import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks';

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
    <footer className="bg-slate-50 dark:bg-[#050505] border-t border-slate-200 dark:border-white/10 transition-colors duration-500">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-16 lg:px-8">
        <div className="text-center mb-10">
          <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-500">
            Hawi Software Solutions
          </Link>
        </div>

        <nav className="-mb-6 flex justify-center gap-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link
                to={item.href}
                className="text-sm leading-6 text-slate-600 hover:text-rose-600 dark:text-slate-400 dark:hover:text-white transition-colors duration-300"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>

        {/* Social Media Links */}
        <div className="mt-10 flex justify-center">
          <SocialLinks iconSize={20} />
        </div>

        <div className="mt-10 border-t border-slate-200 dark:border-white/10 pt-8">
          <p className="text-center text-xs leading-5 text-slate-500 dark:text-slate-500 transition-colors duration-500">
            &copy; {new Date().getFullYear()} Hawi Software Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
