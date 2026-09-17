import { useState } from 'react';
import { useConfig } from '../../lib/config-context';
import { accentStyle, cx, filled, keepFilled } from '../../lib/utils';
import Icon from '../ui/Icon';
import { useToast } from '../ui/Toast';
import { Reveal } from '../ui/Reveal';

const INPUT =
  'w-full px-4 py-3 rounded-xl bg-[rgb(var(--bg-base)/0.8)] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[rgb(var(--acc-1))] focus:ring-2 focus:ring-[rgb(var(--acc-1)/0.3)] transition-all';

export default function Contact({ id }: { id: string }) {
  const { config } = useConfig();
  const { toast } = useToast();
  const c = config.contact;

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [busy, setBusy] = useState(false);

  const infos = keepFilled(c.infos, 'value');
  const socials = keepFilled(c.socials, 'label');
  const subjects = keepFilled(c.form.subjects, 'label');
  const showForm = c.form.enabled;

  const copy = async (value: string) => {
    const t = toast('Copie en cours…', 'loading');
    try {
      await navigator.clipboard.writeText(value);
      window.setTimeout(() => t.update('Copié dans le presse-papier !', 'success'), 350);
    } catch {
      t.update(value, 'info');
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim() || (subjects.length > 0 && !form.subject)) {
      toast('Veuillez renseigner tous les champs obligatoires (*).', 'error');
      return;
    }

    setBusy(true);
    const t = toast('Transmission sécurisée de votre demande…', 'loading');

    if (filled(c.form.endpoint)) {
      try {
        const res = await fetch(c.form.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        t.update(c.form.successMessage || 'Message envoyé !', 'success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } catch {
        t.update("L'envoi a échoué. Réessayez ou écrivez directement par e-mail.", 'error');
      } finally {
        setBusy(false);
      }
      return;
    }

    window.setTimeout(() => {
      t.update(c.form.successMessage || 'Message envoyé !', 'success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setBusy(false);
    }, 1200);
  };

  if (infos.length === 0 && socials.length === 0 && !showForm) return null;

  return (
    <Reveal id={id} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className={cx('space-y-6', showForm ? 'lg:col-span-5' : 'lg:col-span-12 max-w-3xl mx-auto')}>
            {filled(c.badgeText) && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-badge text-xs font-semibold text-[rgb(var(--acc-1))]">
                {filled(c.badgeIcon) && <Icon name={c.badgeIcon} className="w-3.5 h-3.5" />}
                <span>{c.badgeText}</span>
              </div>
            )}

            {(filled(c.title) || filled(c.titleHighlight)) && (
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {c.title} <span className="text-gradient">{c.titleHighlight}</span>
              </h2>
            )}

            {filled(c.intro) && (
              <p className="text-slate-300 text-base leading-relaxed">{c.intro}</p>
            )}

            {infos.length > 0 && (
              <div className="space-y-3 pt-2">
                {infos.map((info, i) => (
                  <div
                    key={i}
                    style={accentStyle(info.accent)}
                    className="glass-panel p-4 rounded-xl border border-white/10 flex items-center justify-between gap-3 hover:border-[rgb(var(--c)/0.4)] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {filled(info.icon) && (
                        <span className="w-10 h-10 rounded-lg bg-[rgb(var(--c)/0.15)] border border-[rgb(var(--c)/0.3)] flex items-center justify-center text-[rgb(var(--c))] shrink-0">
                          <Icon name={info.icon} className="w-5 h-5" />
                        </span>
                      )}
                      <span className="min-w-0">
                        {filled(info.label) && (
                          <span className="block text-xs text-slate-400 font-medium">{info.label}</span>
                        )}
                        <span className="block text-sm font-semibold text-white truncate">{info.value}</span>
                      </span>
                    </div>
                    {info.copyable && (
                      <button
                        type="button"
                        onClick={() => copy(info.value)}
                        className="btn-bounce p-2 rounded-lg text-slate-400 hover:text-[rgb(var(--c))] hover:bg-[rgb(var(--c)/0.12)] transition-colors shrink-0"
                        aria-label={`Copier : ${info.label}`}
                      >
                        <Icon name="copy" className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {socials.length > 0 && (
              <div className="pt-4">
                {filled(c.socialsTitle) && (
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    {c.socialsTitle}
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-3">
                  {socials.map((s, i) => (
                    <a
                      key={i}
                      href={s.url || '#'}
                      target={s.url?.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      style={accentStyle(s.accent)}
                      className="btn-bounce flex items-center gap-2 px-4 py-2.5 rounded-xl glass-badge hover:bg-white/10 text-slate-300 hover:text-white transition-all text-sm font-medium border border-white/10 hover:border-[rgb(var(--c)/0.4)]"
                    >
                      {filled(s.icon) && <Icon name={s.icon} className="w-4 h-4 text-[rgb(var(--c))]" />}
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {showForm && (
            <div className="lg:col-span-7">
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl glow-accent">
                {(filled(c.form.title) || filled(c.form.subtitle)) && (
                  <div className="mb-6">
                    {filled(c.form.title) && (
                      <h3 className="text-xl font-bold text-white mb-1">{c.form.title}</h3>
                    )}
                    {filled(c.form.subtitle) && (
                      <p className="text-sm text-slate-400">{c.form.subtitle}</p>
                    )}
                  </div>
                )}

                <form onSubmit={submit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cf-name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {c.form.nameLabel} <span className="text-[rgb(var(--acc-1))]">*</span>
                      </label>
                      <input
                        id="cf-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jean Dupont"
                        className={INPUT}
                      />
                    </div>
                    <div>
                      <label htmlFor="cf-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {c.form.emailLabel} <span className="text-[rgb(var(--acc-1))]">*</span>
                      </label>
                      <input
                        id="cf-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jean.dupont@entreprise.com"
                        className={INPUT}
                      />
                    </div>
                  </div>

                  {subjects.length > 0 && (
                    <div>
                      <label htmlFor="cf-subject" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {c.form.subjectLabel} <span className="text-[rgb(var(--acc-1))]">*</span>
                      </label>
                      <select
                        id="cf-subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={cx(INPUT, 'cursor-pointer')}
                      >
                        <option value="" disabled>
                          Sélectionnez une option
                        </option>
                        {subjects.map((s) => (
                          <option key={s.value} value={s.value} className="bg-slate-950">
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label htmlFor="cf-message" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {c.form.messageLabel} <span className="text-[rgb(var(--acc-1))]">*</span>
                    </label>
                    <textarea
                      id="cf-message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Présentez votre contexte, vos objectifs et vos échéances…"
                      className={cx(INPUT, 'resize-y')}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={busy}
                      className="btn-bounce btn-primary w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--acc-1))]"
                    >
                      <span>{busy ? 'Transmission en cours…' : c.form.submitLabel}</span>
                      <Icon name="send" className="w-4 h-4" />
                    </button>
                  </div>

                  {filled(c.form.privacyNote) && (
                    <p className="text-center text-[11px] text-slate-500">{c.form.privacyNote}</p>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
