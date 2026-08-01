# NIST Frameworks Reference

This file catalogs the NIST security frameworks and publications referenced in the Security document.

## NIST Cybersecurity Framework (CSF)

| Version | Year | Description |
|---------|------|-------------|
| 1.0 | 2014 | Initial framework |
| 1.1 | 2018 | Added supply chain, identity |
| 2.0 | 2024 | Added Govern function; more focus on risk |

## CSF Core Functions (CSF 2.0)

| Function | Description |
|----------|-------------|
| **Govern** | Establish and monitor risk management strategy |
| **Identify** | Understand assets, risks, vulnerabilities |
| **Protect** | Implement safeguards (access control, encryption) |
| **Detect** | Identify anomalies and events |
| **Respond** | Contain and mitigate incidents |
| **Recover** | Restore capabilities and services |

## CSF Categories

| Function | Categories |
|----------|-----------|
| Govern | Organizational Context, Risk Management Strategy, Roles & Responsibilities, Policies, Oversight |
| Identify | Asset Management, Risk Assessment, Improvement |
| Protect | Identity Management, Awareness & Training, Data Security, Platform Security, Infrastructure Resilience |
| Detect | Continuous Monitoring, Anomaly Detection, Event Management |
| Respond | Incident Management, Analysis, Mitigation, Communication |
| Recover | Recovery Planning, Improvements, Communication |

## NIST SP 800-63 (Digital Identity Guidelines)

| Version | Year | Description |
|---------|------|-------------|
| SP 800-63-3 | 2017 | Current |

Levels of Assurance (LOA):

- **IAL1:** Self-asserted.
- **IAL2:** Remote or in-person identity proofing.
- **IAL3:** In-person identity proofing.

Authenticator Assurance Levels (AAL):

- **AAL1:** Single-factor (password).
- **AAL2:** Multi-factor (password + OTP).
- **AAL3:** Hardware crypto + multi-factor.

## NIST SP 800-53 (Security and Privacy Controls)

| Version | Year |
|---------|------|
| Rev 4 | 2015 |
| Rev 5 | 2020 |

20 control families:

- AC (Access Control)
- AU (Audit and Accountability)
- AT (Awareness and Training)
- CM (Configuration Management)
- CP (Contingency Planning)
- IA (Identification and Authentication)
- IR (Incident Response)
- MA (Maintenance)
- MP (Media Protection)
- PS (Personnel Security)
- PE (Physical and Environmental Protection)
- PL (Planning)
- PM (Program Management)
- PS (Pervasive)
- PT (PII Processing and Transparency)
- RA (Risk Assessment)
- SA (System and Services Acquisition)
- SC (System and Communications Protection)
- SI (System and Information Integrity)
- SR (Supply Chain Risk Management)

## NIST SP 800-207 (Zero Trust Architecture)

| Pillar | Description |
|--------|-------------|
| **Users** | Continuous authentication |
| **Devices** | Device health and posture |
| **Networks** | Segmentation, encryption |
| **Applications** | Identity-aware proxies |
| **Data** | Classification, encryption |
| **Visibility** | Telemetry, analytics |
| **Automation** | Orchestration, response |

## NIST SP 800-207A (Zero Trust Network Access)

- **Resource-based access** (not network-based).
- **Per-session authentication.**
- **Encryption everywhere.**

## NIST SP 800-90 (Random Number Generation)

- DRBG (Deterministic Random Bit Generator).
- Entropy source.

## NIST SP 800-57 (Key Management)

Part 1: General.
Part 2: Best Practices.
Part 3: Application-Specific.

## NIST SP 800-131 (Algorithm Deprecation)

| Algorithm | Status |
|-----------|--------|
| MD5 | Disallowed |
| SHA-1 | Disallowed |
| DES | Disallowed |
| 3DES | Disallowed |
| RSA-1024 | Disallowed |
| RSA-2048 | Acceptable |
| RSA-3072 | Recommended |
| AES-128 | Acceptable |
| AES-256 | Recommended |
| ECDSA P-256 | Acceptable |
| Ed25519 | Recommended |

## FIPS 140 (Cryptographic Module Validation)

| Version | Year | Title |
|---------|------|-------|
| FIPS 140-2 | 2001 | Current standard |
| FIPS 140-3 | 2019 | Updated standard |

Security levels:

- **Level 1:** Lowest; software-only.
- **Level 2:** Tamper-evident seals.
- **Level 3:** Tamper-resistant.
- **Level 4:** Highest; environmental protection.

## Common Criteria (CC)

International standard for IT security evaluation (ISO 15408).

- **EAL1:** Functionally tested.
- **EAL2:** Structurally tested.
- **EAL3:** Methodically tested and checked.
- **EAL4:** Methodically designed, tested, and reviewed.
- **EAL5:** Semi-formally designed and tested.
- **EAL6:** Semi-formally verified design and tested.
- **EAL7:** Formally verified design and tested.

## Compliance frameworks

| Framework | Scope | Year |
|-----------|-------|------|
| **SOC 2** | Service organizations | 2010s |
| **ISO 27001** | Information security management | 2013 |
| **ISO 27002** | Information security controls | 2013 |
| **PCI-DSS** | Payment card industry | 2006 (v4.0 in 2024) |
| **HIPAA** | Healthcare data | 1996 |
| **GDPR** | EU personal data | 2018 |
| **CCPA** | California consumer privacy | 2020 |
| **FedRAMP** | US federal cloud | 2011 |
| **NIST CSF** | Cybersecurity framework | 2014 |
| **CMMC** | Defense industry | 2020 |

## SOC 2

Two types of reports:

- **Type I:** Point-in-time.
- **Type II:** Over a period (typically 6 months).

Five trust service criteria:

- **Security:** Protection against unauthorized access.
- **Availability:** System uptime.
- **Processing integrity:** Accurate processing.
- **Confidentiality:** Information designated as confidential.
- **Privacy:** Personal information collection, use, retention.

## ISO 27001

International standard for information security management systems (ISMS).

## GDPR (EU General Data Protection Regulation)

Key principles:

- **Lawfulness, fairness, transparency.**
- **Purpose limitation.**
- **Data minimization.**
- **Accuracy.**
- **Storage limitation.**
- **Integrity and confidentiality.**
- **Accountability.**

Rights:

- Right to access.
- Right to rectification.
- Right to erasure ("right to be forgotten").
- Right to restrict processing.
- Right to data portability.
- Right to object.

## PCI-DSS (Payment Card Industry Data Security Standard)

12 requirements in 6 categories:

1. **Build and Maintain a Secure Network and Systems.**
2. **Protect Account Data.**
3. **Maintain a Vulnerability Management Program.**
4. **Implement Strong Access Control Measures.**
5. **Regularly Monitor and Test Networks.**
6. **Maintain an Information Security Policy.**

## HIPAA (Health Insurance Portability and Accountability Act)

- **Privacy Rule:** PHI protection.
- **Security Rule:** Administrative, physical, technical safeguards.
- **Breach Notification Rule:** Notify on breach.

## Books

- *NIST Cybersecurity Framework* — various.
- *Official (ISC)² Guide to the CISSP CBK* — Gordon.
- *Computer Security: Art and Science* — Bishop (Addison-Wesley).