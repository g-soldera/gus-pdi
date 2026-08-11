import { Certification } from '@/types/pdi';

export const certifications: Certification[] = [
  {
    id: 'crtp',
    phase: 1,
    title: 'CRTP — Certified Red Team Professional',
    issuer: 'Altered Security',
    cost: 'US$ 249',
    examType: 'Prova prática · 24h',
    focus: 'Active Directory',
    note: 'Entrada mais suave que o OSCP: escopo contido em Active Directory, labs guiados, formato próximo do "assumed breach".',
    topics: [
      { id: 'crtp-1', text: 'Enumeração de Active Directory com PowerView e BloodHound', completed: false },
      { id: 'crtp-2', text: 'Escalonamento de privilégio local em máquina ingressada no domínio', completed: false },
      { id: 'crtp-3', text: 'Movimentação lateral: pass-the-hash, overpass-the-hash', completed: false },
      { id: 'crtp-4', text: 'Kerberoasting e AS-REP Roasting', completed: false },
      { id: 'crtp-5', text: 'Delegação Kerberos (unconstrained/constrained) e abuso de ACL', completed: false },
      { id: 'crtp-6', text: 'DCSync, abuso de trust keys, escalonamento child-to-parent forest', completed: false },
      { id: 'crtp-7', text: 'Ataques a Active Directory Certificate Services (AD CS)', completed: false },
      { id: 'crtp-8', text: 'Persistência: golden ticket, silver ticket, forja de tickets', completed: false },
      { id: 'crtp-9', text: 'Defesa: bypass de Defender for Endpoint/Identity, LAPS, tiered admin (ESAE)', completed: false },
      { id: 'crtp-10', text: 'Exame: comprometer domínios/florestas multi-nível em 24h + relatório', completed: false },
    ]
  },
  {
    id: 'oscp',
    phase: 1,
    title: 'OSCP — PEN-200 (OffSec)',
    issuer: 'OffSec',
    cost: '~US$ 1.500+',
    examType: 'Prova prática · 24h',
    focus: 'O selo mais reconhecido do mercado',
    note: 'Exame vale 100 pontos: 60 em três máquinas independentes e 40 em cadeia de Active Directory. Precisa de 70 pontos.',
    topics: [
      { id: 'oscp-1', text: 'Metodologia de enumeração: Nmap, fingerprinting de serviços', completed: false },
      { id: 'oscp-2', text: 'Web exploitation: SQLi, LFI/RFI, XSS, command injection', completed: false },
      { id: 'oscp-3', text: 'Ataques de senha: Hydra, John the Ripper, Hashcat', completed: false },
      { id: 'oscp-4', text: 'Linux privilege escalation: sudo, cron jobs, SUID', completed: false },
      { id: 'oscp-5', text: 'Windows privilege escalation: token impersonation, serviços vulneráveis', completed: false },
      { id: 'oscp-6', text: 'Buffer overflow: fuzzing, bad chars, JMP ESP, shellcode em C/Python', completed: false },
      { id: 'oscp-7', text: 'Ataques a Active Directory: Kerberoasting, AS-REP, exploração de trusts', completed: false },
      { id: 'oscp-8', text: 'Tunneling e pivoting: SSH tunnels, chisel, port forwarding', completed: false },
      { id: 'oscp-9', text: 'Client-side exploits: macros de documento, exploração básica de browser', completed: false },
      { id: 'oscp-10', text: 'Reporting: documentação clara, ética e acionável do pentest', completed: false },
    ]
  }
];
