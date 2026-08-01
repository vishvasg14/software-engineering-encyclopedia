# 16 — Incident response playbook (Markdown)

# Security incident response playbook

## Severity levels

| Level | Description | Response time |
|-------|-------------|---------------|
| **SEV1** | Active breach; data exfiltration; production down | Immediate |
| **SEV2** | Vulnerability discovered; risk of breach | < 4 hours |
| **SEV3** | Suspicious activity; investigation needed | < 24 hours |
| **SEV4** | Low-risk; tracking only | Next business day |

## Roles

- **Incident Commander (IC):** Coordinates response. Single point of decision.
- **Security Lead:** Technical decisions; forensics.
- **Communications Lead:** Internal and external comms.
- **Scribe:** Logs timeline; actions; decisions.
- **Subject Matter Experts (SMEs):** Engineers; legal; PR; etc.

## SEV1 Playbook: Suspected Data Breach

### 1. Detection (0-15 min)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%231-detection-0-15-min%0A%0ASection%20title%3A%201.%20Detection%20(0-15%20min)' target='_blank' rel='noopener' data-askgpt='1. Detection (0-15 min)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/examples/16-incident-response/playbook.md#1-detection-0-15-min' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%231-detection-0-15-min%0A%0ASection%20title%3A%201.%20Detection%20(0-15%20min)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%231-detection-0-15-min%0A%0ASection%20title%3A%201.%20Detection%20(0-15%20min)' title='Ask ChatGPT about this section'>💬</a>
- [ ] Alert fires: unusual access, data exfiltration, suspicious logins.
- [ ] Acknowledge alert in PagerDuty.
- [ ] Assign Incident Commander.
- [ ] Open incident channel (Slack #sec-incident).
- [ ] Start incident document (Scribe).

### 2. Containment (15-60 min)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%232-containment-15-60-min%0A%0ASection%20title%3A%202.%20Containment%20(15-60%20min)' target='_blank' rel='noopener' data-askgpt='2. Containment (15-60 min)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/examples/16-incident-response/playbook.md#2-containment-15-60-min' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%232-containment-15-60-min%0A%0ASection%20title%3A%202.%20Containment%20(15-60%20min)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%232-containment-15-60-min%0A%0ASection%20title%3A%202.%20Containment%20(15-60%20min)' title='Ask ChatGPT about this section'>💬</a>
- [ ] Isolate affected systems (revoke credentials, block IPs).
- [ ] Preserve evidence (snapshots of logs, memory dumps).
- [ ] Stop the bleeding — don't tip off attacker.
- [ ] Identify blast radius.

### 3. Investigation (1-24 hours)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%233-investigation-1-24-hours%0A%0ASection%20title%3A%203.%20Investigation%20(1-24%20hours)' target='_blank' rel='noopener' data-askgpt='3. Investigation (1-24 hours)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/examples/16-incident-response/playbook.md#3-investigation-1-24-hours' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%233-investigation-1-24-hours%0A%0ASection%20title%3A%203.%20Investigation%20(1-24%20hours)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%233-investigation-1-24-hours%0A%0ASection%20title%3A%203.%20Investigation%20(1-24%20hours)' title='Ask ChatGPT about this section'>💬</a>
- [ ] Review logs (CloudTrail, application logs, OS logs).
- [ ] Identify entry point.
- [ ] Determine data accessed.
- [ ] Identify affected users.
- [ ] Forensic analysis (if needed).

### 4. Eradication (1-7 days)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%234-eradication-1-7-days%0A%0ASection%20title%3A%204.%20Eradication%20(1-7%20days)' target='_blank' rel='noopener' data-askgpt='4. Eradication (1-7 days)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/examples/16-incident-response/playbook.md#4-eradication-1-7-days' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%234-eradication-1-7-days%0A%0ASection%20title%3A%204.%20Eradication%20(1-7%20days)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%234-eradication-1-7-days%0A%0ASection%20title%3A%204.%20Eradication%20(1-7%20days)' title='Ask ChatGPT about this section'>💬</a>
- [ ] Patch the vulnerability.
- [ ] Remove attacker access.
- [ ] Reset credentials.
- [ ] Update detection rules.

### 5. Recovery (1-7 days)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%235-recovery-1-7-days%0A%0ASection%20title%3A%205.%20Recovery%20(1-7%20days)' target='_blank' rel='noopener' data-askgpt='5. Recovery (1-7 days)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/examples/16-incident-response/playbook.md#5-recovery-1-7-days' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%235-recovery-1-7-days%0A%0ASection%20title%3A%205.%20Recovery%20(1-7%20days)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%235-recovery-1-7-days%0A%0ASection%20title%3A%205.%20Recovery%20(1-7%20days)' title='Ask ChatGPT about this section'>💬</a>
- [ ] Restore from backup if needed.
- [ ] Verify integrity.
- [ ] Increase monitoring.
- [ ] Validate with red team.

### 6. Communication (parallel)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%236-communication-parallel%0A%0ASection%20title%3A%206.%20Communication%20(parallel)' target='_blank' rel='noopener' data-askgpt='6. Communication (parallel)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/examples/16-incident-response/playbook.md#6-communication-parallel' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%236-communication-parallel%0A%0ASection%20title%3A%206.%20Communication%20(parallel)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%236-communication-parallel%0A%0ASection%20title%3A%206.%20Communication%20(parallel)' title='Ask ChatGPT about this section'>💬</a>
- [ ] **Internal:** leadership, legal, PR.
- [ ] **Regulators:** GDPR 72-hour notification; CCPA; state laws.
- [ ] **Customers:** data breach notification.
- [ ] **Public:** blog post; press.

### 7. Postmortem (within 2 weeks)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%237-postmortem-within-2-weeks%0A%0ASection%20title%3A%207.%20Postmortem%20(within%202%20weeks)' target='_blank' rel='noopener' data-askgpt='7. Postmortem (within 2 weeks)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/examples/16-incident-response/playbook.md#7-postmortem-within-2-weeks' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%237-postmortem-within-2-weeks%0A%0ASection%20title%3A%207.%20Postmortem%20(within%202%20weeks)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%237-postmortem-within-2-weeks%0A%0ASection%20title%3A%207.%20Postmortem%20(within%202%20weeks)' title='Ask ChatGPT about this section'>💬</a>
- [ ] **Blameless** postmortem.
- [ ] Timeline of events.
- [ ] Root cause analysis (5 Whys).
- [ ] Contributing factors.
- [ ] Lessons learned.
- [ ] Action items with owners.

## Communication templates

### Initial customer notification

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%23initial-customer-notification%0A%0ASection%20title%3A%20Initial%20customer%20notification' target='_blank' rel='noopener' data-askgpt='Initial customer notification' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/examples/16-incident-response/playbook.md#initial-customer-notification' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%23initial-customer-notification%0A%0ASection%20title%3A%20Initial%20customer%20notification' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%23initial-customer-notification%0A%0ASection%20title%3A%20Initial%20customer%20notification' title='Ask ChatGPT about this section'>💬</a>
```
Subject: [ACTION REQUIRED] Security Incident at [Company]

Dear [Name],

We are writing to inform you of a security incident that may
have affected your account. On [date], we discovered [description].

What we know: [facts].
What we don't know: [unknowns].
What we are doing: [actions].
What you should do: [steps].

We will provide updates at [URL].

Sincerely,
[Security Team]
```

### Regulatory notification (GDPR)

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%23regulatory-notification-gdpr%0A%0ASection%20title%3A%20Regulatory%20notification%20(GDPR)' target='_blank' rel='noopener' data-askgpt='Regulatory notification (GDPR)' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/13-security/examples/16-incident-response/playbook.md#regulatory-notification-gdpr' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%23regulatory-notification-gdpr%0A%0ASection%20title%3A%20Regulatory%20notification%20(GDPR)' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F13-security%2Fexamples%2F16-incident-response%2Fplaybook.md%23regulatory-notification-gdpr%0A%0ASection%20title%3A%20Regulatory%20notification%20(GDPR)' title='Ask ChatGPT about this section'>💬</a>
Required within 72 hours of awareness.

## Detection sources

- SIEM alerts.
- EDR alerts.
- Cloud provider alerts.
- User reports.
- Bug bounty reports.
- Third-party intel.
- Honeypot / deception.

## Common incident types

- **Credential stuffing:** brute force; stolen credentials.
- **Phishing:** user clicks link; credentials stolen.
- **Supply chain:** compromised dependency.
- **Insider threat:** malicious employee.
- **Misconfiguration:** public S3 bucket; open security group.
- **Zero-day:** unknown vulnerability.

## Indicators of Compromise (IoCs)

- **Network:** suspicious IPs, unusual ports, data exfiltration.
- **Host:** unknown processes, persistence, suspicious files.
- **User:** impossible travel, unusual activity, new devices.
- **Application:** unusual API calls, privilege escalation.
- **Cloud:** unusual IAM activity, public buckets.

## Forensic preservation

- Memory dump (volatile).
- Disk image.
- Network captures.
- Logs.
- CloudTrail / activity logs.

## Tools

- **TheHive / MISP:** case management.
- **GRR / Velociraptor:** remote forensics.
- **Volatility:** memory analysis.
- **Timesketch:** timeline analysis.
- **Sleuth Kit:** disk analysis.

## Best practices

- **Prepare:** runbooks; tabletop exercises; on-call rotation.
- **Detect:** SIEM; anomaly detection; threat intel.
- **Respond:** clear roles; comms; blameless culture.
- **Recover:** backups; DR; communication.
- **Learn:** postmortems; process improvement.

## Postmortem template

```markdown
# Incident postmortem: [Title]

## Summary
[One-paragraph description]

## Impact
- User impact:
- Financial impact:
- Reputation impact:

## Timeline
- [HH:MM] Event 1
- [HH:MM] Event 2
- [HH:MM] Detection
- [HH:MM] Mitigation

## Root cause
[What went wrong and why]

## Contributing factors
- Factor 1
- Factor 2

## What went well
- Good 1
- Good 2

## What went poorly
- Bad 1
- Bad 2

## Action items
- [ ] Item 1 (Owner: @person, Due: date)
- [ ] Item 2 (Owner: @person, Due: date)
```

## Laws and regulations

- **GDPR:** 72 hours; data subject notification.
- **CCPA:** California consumer privacy.
- **HIPAA:** Breach Notification Rule.
- **SOX:** Public companies; controls.
- **PCI-DSS:** Card data; immediate notification.

## Reporting timelines

| Regulation | Initial notification | Full report |
|-----------|---------------------|--------------|
| GDPR | 72 hours | Ongoing |
| HIPAA | 60 days | 60 days |
| CCPA | Variable | Variable |
| State laws (US) | Variable | Variable |

## Communication channels

- Internal: Slack #sec-incident; email security@.
- External: status page; press; legal.
- Customers: email; dashboard notification.
- Partners: via account managers.

## After the incident

- **Restore trust:** communicate, remediate, prevent.
- **Update runbooks:** based on lessons.
- **Update detection:** based on IoCs.
- **Train team:** based on gaps.
- **Tabletop exercise:** test response.