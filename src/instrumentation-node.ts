type TlsWithSystemCA = typeof import("node:tls") & {
  getCACertificates?: (type: "default" | "system") => string[];
  setDefaultCACertificates?: (certificates: string[]) => void;
};

export function registerNode() {
  const tls = require("node:tls") as TlsWithSystemCA;
  const getCACertificates = tls.getCACertificates;
  const setDefaultCACertificates = tls.setDefaultCACertificates;
  if (!getCACertificates || !setDefaultCACertificates) return;

  try {
    setDefaultCACertificates([
      ...getCACertificates("default"),
      ...getCACertificates("system"),
    ]);
  } catch {
    // Keep Node's bundled CAs when the platform store can't be read.
  }
}
