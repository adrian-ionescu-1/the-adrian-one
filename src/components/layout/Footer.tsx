import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Zap, ArrowUpRight, ArrowRight, Mail } from 'lucide-react';

function LinkedInIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const STATS = [
  { value: '15+', labelKey: 'footer.stats.projectsLabel' },
  { value: '5+', labelKey: 'footer.stats.experienceLabel' },
  { value: '100%', labelKey: 'footer.stats.remoteLabel' },
] as const;

const QUICK_LINKS = [
  { key: 'services', href: '/services' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'partners', href: '/partners' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

function WhatsAppIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/george-adrian-ionescu-005234286',
    Icon: LinkedInIcon,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/adrian-ionescu-1',
    Icon: GitHubIcon,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/40790244446',
    Icon: WhatsAppIcon,
  },
] as const;

const TECH_STACK = ['Next.js', 'React', 'Tailwind CSS'] as const;

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/60 bg-background overflow-hidden">
      {/* Top glow line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"
        aria-hidden
      />
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full blur-[120px] bg-primary/5"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-14">

        {/* ── CTA Banner ── #8: hover state added */}
        <div className="group relative mb-12 rounded-2xl border border-border/60 bg-card/40 px-8 py-10 sm:px-12 sm:py-12 overflow-hidden text-center transition-all duration-300 hover:border-primary/35 hover:shadow-glow-sm cursor-default">
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/6 via-transparent to-transparent transition-opacity duration-300 group-hover:from-primary/10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-[80px] bg-primary/8 transition-opacity duration-300 group-hover:opacity-150"
            aria-hidden
          />
          <p className="relative text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
            {t('footer.cta.heading')}
          </p>
          <p className="relative text-sm text-muted-foreground mb-7 max-w-sm mx-auto leading-relaxed">
            {t('footer.cta.subheading')}
          </p>
          <Link
            href="/contact"
            className="relative inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25 transition-all duration-200 hover:shadow-glow hover:-translate-y-px active:translate-y-0"
          >
            {t('footer.cta.button')}
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* ── Stats row ── #5 */}
        <div className="mb-12 grid grid-cols-3 gap-4 rounded-xl border border-border/40 bg-card/20 px-6 py-5 divide-x divide-border/40">
          {STATS.map(({ value, labelKey }) => (
            <div key={labelKey} className="flex flex-col items-center gap-1 px-4">
              <span className="text-2xl sm:text-3xl font-bold text-primary tabular-nums">
                {value}
              </span>
              <span className="text-xs text-muted-foreground text-center leading-snug">
                {t(labelKey)}
              </span>
            </div>
          ))}
        </div>

        {/* ── Links grid ── */}
        <div className="grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-3">

          {/* Brand */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 text-base font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25 transition-transform duration-200 group-hover:scale-110">
                <Zap size={15} strokeWidth={2.5} />
              </span>
              The Adrian One
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-60 text-center md:text-left">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <p className="text-xs font-semibold text-foreground uppercase tracking-[0.12em]">
              {t('footer.sections.links')}
            </p>
            <ul className="space-y-1.5 flex flex-col items-center md:items-start">
              {QUICK_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-all duration-200 hover:text-foreground"
                  >
                    <span className="hidden md:block h-px w-3 bg-border transition-all duration-300 group-hover:w-5 group-hover:bg-primary" />
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <p className="text-xs font-semibold text-foreground uppercase tracking-[0.12em]">
              {t('footer.sections.connect')}
            </p>
            <ul className="space-y-2 flex flex-col items-center md:items-start">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-all duration-200 hover:text-foreground"
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg border border-border/60 bg-card transition-all duration-200 group-hover:border-primary/50 group-hover:bg-accent group-hover:scale-105 group-hover:shadow-glow-sm">
                      <Icon size={13} />
                    </span>
                    {label}
                    <ArrowUpRight
                      size={11}
                      className="text-muted-foreground/30 transition-all duration-200 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </li>
              ))}

              {/* Email */}
              <li>
                <a
                  href={`mailto:${t('footer.email')}`}
                  className="group inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-all duration-200 hover:text-foreground"
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg border border-border/60 bg-card transition-all duration-200 group-hover:border-primary/50 group-hover:bg-accent group-hover:scale-105 group-hover:shadow-glow-sm">
                    <Mail size={13} />
                  </span>
                  E-mail
                  <ArrowUpRight
                    size={11}
                    className="text-muted-foreground/30 transition-all duration-200 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar — #7: tech stack added ── */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>{t('footer.copyright', { year })}</span>

          {/* Tech stack chips */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <span className="text-muted-foreground/50">{t('footer.builtWith')}</span>
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 text-[10px] font-medium rounded-md border border-border/50 text-muted-foreground/70 bg-muted/20 tracking-wide"
              >
                {tech}
              </span>
            ))}
          </div>

          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
            {t('footer.rights')}
          </span>
        </div>
      </div>
    </footer>
  );
}
