import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cx, filled } from '../../lib/utils';
import Icon from './Icon';

interface RevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: 'section' | 'div';
}

export function Reveal({ children, className, id, as = 'section' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -70px 0px', threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as 'section';
  return (
    <Tag
      id={id}
      ref={ref as React.Ref<HTMLElement>}
      className={cx('reveal-section', shown && 'is-revealed', className)}
    >
      {children}
    </Tag>
  );
}

interface SectionHeadingProps {
  badgeIcon?: string;
  badgeText?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

export function SectionHeading({
  badgeIcon,
  badgeText,
  title,
  highlight,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  if (!filled(title) && !filled(highlight) && !filled(badgeText) && !filled(subtitle)) return null;

  return (
    <div className={cx('max-w-3xl', align === 'center' ? 'text-center mx-auto' : 'text-left')}>
      {filled(badgeText) && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-badge text-xs font-semibold text-[rgb(var(--acc-1))] mb-3">
          {filled(badgeIcon) && <Icon name={badgeIcon!} className="w-3.5 h-3.5" />}
          <span>{badgeText}</span>
        </div>
      )}
      {(filled(title) || filled(highlight)) && (
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {title}
          {filled(highlight) && (
            <>
              {filled(title) ? ' ' : ''}
              <span className="text-gradient">{highlight}</span>
            </>
          )}
        </h2>
      )}
      {filled(subtitle) && (
        <p className="text-slate-400 mt-3 text-base sm:text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
