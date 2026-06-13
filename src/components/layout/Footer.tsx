import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

const QUICK_LINKS = [
  { key: 'services', href: '/services' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'partners', href: '/partners' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <p className="text-lg font-bold tracking-tight text-foreground">
              The Adrian One
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Links
            </p>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Social
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.linkedin.com/in/george-adrian-ionescu-005234286"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/adrian-ionescu-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>{t('footer.copyright', { year })}</span>
          <span>{t('footer.rights')}</span>
        </div>
      </div>
    </footer>
  );
}
