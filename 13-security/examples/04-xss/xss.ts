// 04 — XSS prevention (TypeScript / React)

// VULNERABLE: dangerouslySetInnerHTML with user input
function BAD_renderUserBio({ bio }: { bio: string }) {
  return <div dangerouslySetInnerHTML={{ __html: bio }} />;  // XSS!
}

// SECURE 1: Render as text (React escapes by default)
function GOOD_renderUserBio({ bio }: { bio: string }) {
  return <div>{bio}</div>;  // React escapes automatically
}

// SECURE 2: Sanitize HTML (DOMPurify)
import DOMPurify from 'dompurify';

function renderUserBioSafe({ bio }: { bio: string }) {
  const clean = DOMPurify.sanitize(bio, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href'],
  });
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}

// VULNERABLE: URL injection
function BAD_renderLink({ url, text }: { url: string; text: string }) {
  // url = "javascript:alert(1)" → XSS!
  return <a href={url}>{text}</a>;
}

// SECURE: validate URL scheme
function renderLinkSafe({ url, text }: { url: string; text: string }) {
  const parsed = new URL(url);
  if (!['http:', 'https:', 'mailto:'].includes(parsed.protocol)) {
    return <span>{text}</span>;  // don't render as link
  }
  return <a href={url}>{text}</a>;
}

// VULNERABLE: eval with user input
function BAD_evalUserFormula(formula: string) {
  return eval(`Math.${formula}`);  // RCE!
}

// SECURE: use a parser
import { parse } from 'mathjs';
function evaluateFormulaSafe(formula: string) {
  return parse(formula).evaluate();
}

// CSP header to mitigate XSS
const cspHeader = [
  "default-src 'self'",
  "script-src 'self' 'nonce-{nonce}'",  // nonce-based
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "connect-src 'self' https://api.example.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
].join('; ');

// Trusted Types for DOM injection
// res.setHeader('Content-Security-Policy', cspHeader);

// Cookie security
const cookieConfig = {
  httpOnly: true,  // prevent XSS exfiltration
  secure: true,    // HTTPS only
  sameSite: 'Lax', // CSRF protection
  path: '/',
  maxAge: 3600,
};

// Output encoding (if not using framework)
// import { encode } from 'html-entities';
// const safe = encode(userInput);