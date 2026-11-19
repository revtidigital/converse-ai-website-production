declare global {
  interface Window {
    grecaptcha: any;
  }
}

// 🔑 Site key
const SITE_KEY = "6Ld6E40sAAAAAAayjrv2wh-ZInD0yK12mVNWlmpH";

let recaptchaLoadPromise: Promise<void> | null = null;

/**
 * Dynamically loads the Google reCAPTCHA v3 script on-demand.
 * Prevents 700+ KiB of blocking JavaScript during initial mobile page load.
 */
export const loadRecaptcha = (): Promise<void> => {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha && window.grecaptcha.ready) return Promise.resolve();
  if (recaptchaLoadPromise) return recaptchaLoadPromise;

  recaptchaLoadPromise = new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src*="recaptcha/api.js"]');
    if (existing) {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => resolve());
      } else {
        existing.addEventListener("load", () => {
          if (window.grecaptcha && window.grecaptcha.ready) {
            window.grecaptcha.ready(() => resolve());
          } else {
            resolve();
          }
        });
      }
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => resolve());
      } else {
        resolve();
      }
    };
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });

  return recaptchaLoadPromise;
};

export const getCaptchaToken = async (action: string = "submit"): Promise<string | null> => {
  try {
    await loadRecaptcha();
    if (!window.grecaptcha || !window.grecaptcha.execute) {
      console.warn("reCAPTCHA not loaded");
      return null;
    }

    return await new Promise((resolve) => {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(SITE_KEY, { action });
          resolve(token);
        } catch (e) {
          console.error("reCAPTCHA execute error:", e);
          resolve(null);
        }
      });
    });
  } catch (error) {
    console.error("Captcha error:", error);
    return null;
  }
};
