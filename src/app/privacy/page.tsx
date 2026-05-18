import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Frazs",
  description: "How Frazs collects, uses, and protects your personal data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-blue-500 hover:text-blue-700 transition-colors mb-10 inline-block">
          ← Back to home
        </Link>

        <h1 className="text-3xl md:text-4xl font-black font-display text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: May 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Who we are</h2>
            <p>Frazs is a UK-based digital agency run by Fraser Forrest. We build websites and AI chat assistants for businesses. You can contact us at <a href="mailto:fra5er2007@outlook.com" className="text-blue-500">fra5er2007@outlook.com</a> or 07947 449 469.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. What data we collect</h2>
            <p>When you submit our contact form, we collect:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your phone number (optional)</li>
              <li>Your business name (optional)</li>
              <li>Your message</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. How we use your data</h2>
            <p>We use the information you provide solely to respond to your enquiry and discuss your project with you. We do not sell, share, or rent your personal data to any third party for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Third-party processors</h2>
            <p>We use <strong>Resend</strong> (resend.com) to deliver contact form emails. Your submitted data is processed through Resend&apos;s servers to send us a notification. Resend is GDPR compliant. No data is stored permanently by Resend beyond email delivery.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Data retention</h2>
            <p>We retain your contact details only for as long as necessary to respond to your enquiry or fulfil a contract with you. If you ask us to delete your data, we will do so promptly.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Cookies</h2>
            <p>This website uses minimal cookies required for the site to function. We do not use advertising or tracking cookies. You can disable cookies in your browser settings at any time.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Your rights</h2>
            <p>Under UK GDPR, you have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email us at <a href="mailto:fra5er2007@outlook.com" className="text-blue-500">fra5er2007@outlook.com</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Changes to this policy</h2>
            <p>We may update this policy from time to time. Any changes will be posted on this page with an updated date.</p>
          </section>

        </div>
      </div>
    </main>
  );
}
