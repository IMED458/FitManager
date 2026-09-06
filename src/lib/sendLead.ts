import { DemoFormData } from '../types';

/**
 * Lead delivery.
 *
 * The site is a static build (GitHub Pages), so there is no backend of our own.
 * Form submissions are relayed to email through a form-to-email endpoint
 * (Web3Forms by default) that is configured at build time:
 *
 *   VITE_LEAD_ACCESS_KEY  — the provider access key bound to the inbox
 *   VITE_LEAD_ENDPOINT    — override to swap providers (Formspree, Getform, ...)
 *   VITE_LEAD_EMAIL       — inbox shown in the message body / used as fallback
 *
 * Without a key nothing can be delivered, so we say so instead of pretending
 * the lead was sent.
 */
const ENDPOINT =
  import.meta.env.VITE_LEAD_ENDPOINT || 'https://api.web3forms.com/submit';
const ACCESS_KEY = import.meta.env.VITE_LEAD_ACCESS_KEY || '';
export const LEAD_EMAIL =
  import.meta.env.VITE_LEAD_EMAIL || 'gimedashvili7@gmail.com';

export type LeadSource = 'trial' | 'demo' | 'contact';

const SOURCE_LABEL: Record<LeadSource, string> = {
  trial: '14-დღიანი Trial-ის მოთხოვნა',
  demo: 'დემო ლინკის მოთხოვნა',
  contact: 'საკონტაქტო ფორმა',
};

export function isLeadDeliveryConfigured(): boolean {
  return ACCESS_KEY.length > 0;
}

function buildMessage(data: DemoFormData, source: LeadSource): string {
  const rows: Array<[string, string | undefined]> = [
    ['წყარო', SOURCE_LABEL[source]],
    ['სახელი და გვარი', data.fullName],
    ['დარბაზის დასახელება', data.gymName],
    ['ტელეფონი', data.phone],
    ['Email', data.email],
    ['ქალაქი', data.city],
    ['წევრების რაოდენობა', data.estimatedMembers || data.membersCount],
    ['სასურველი დრო', data.preferredTime],
    ['პაკეტი', data.plan],
    ['შენიშვნა', data.notes],
  ];

  return rows
    .filter(([, value]) => value && String(value).trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
}

/**
 * Sends one lead to the configured inbox.
 * Resolves on delivery; rejects so the caller can surface a retry hint.
 */
export async function sendLead(
  data: DemoFormData,
  source: LeadSource,
): Promise<void> {
  if (!ACCESS_KEY) {
    throw new Error(
      'VITE_LEAD_ACCESS_KEY is not configured — the lead cannot be delivered.',
    );
  }

  const payload = {
    access_key: ACCESS_KEY,
    subject: `Fit Manager — ${SOURCE_LABEL[source]}: ${data.gymName || data.fullName}`,
    from_name: 'Fit Manager ვებსაიტი',
    replyto: data.email,
    to: LEAD_EMAIL,
    message: buildMessage(data, source),
    // Individual fields as well, so the provider dashboard stays readable.
    source: SOURCE_LABEL[source],
    fullName: data.fullName,
    gymName: data.gymName,
    phone: data.phone,
    email: data.email,
    estimatedMembers: data.estimatedMembers || data.membersCount || '',
    notes: data.notes || '',
    page: typeof window === 'undefined' ? '' : window.location.href,
  };

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Lead delivery failed with status ${response.status}`);
  }
}
