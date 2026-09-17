/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import EditorLauncher from './components/editor/EditorLauncher';
import AmbientBackground from './components/layout/AmbientBackground';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import SectionRenderer from './components/sections/SectionRenderer';
import { ToastProvider } from './components/ui/Toast';
import { ConfigProvider, useConfig } from './lib/config-context';

function Portfolio() {
  const { config } = useConfig();
  const sections = config.sections.filter((s) => s.enabled);

  return (
    <div className="text-slate-100 relative overflow-x-hidden min-h-dvh flex flex-col">
      {config.theme.ambientGlow && <AmbientBackground />}
      <Navbar />
      <main className="flex-1">
        {sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </main>
      <Footer />
      <EditorLauncher />
    </div>
  );
}

export default function App() {
  return (
    <ConfigProvider>
      <ToastProvider>
        <Portfolio />
      </ToastProvider>
    </ConfigProvider>
  );
}
