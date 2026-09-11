import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correções de domínios
const domainFixes = [
  // Mover para Segurança & Red Team
  { id: 'offensive-sec-pentest', newCategory: 'Segurança & Red Team' },
  
  // Verificar AI Engineering - não deve ter infrastructure/mlops genérico
  { id: 'ai-ml-infrastructure', newCategory: 'Cloud & Platform' }
];

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║   CORRIGINDO INCONSISTÊNCIAS DE DOMÍNIOS                     ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');
console.log('Correções a aplicar:', domainFixes.length);
console.log('\nPressione Ctrl+C para cancelar ou aguarde 3 segundos...\n');

await new Promise(resolve => setTimeout(resolve, 3000));

async function fixDomains() {
  const envText = fs.readFileSync(path.join(__dirname, '../../.env.local'), 'utf8');
  const env = {};
  envText.split('\n').forEach(line => {
    const [k, v] = line.split('=');
    if (k && v) env[k.trim()] = v.trim();
  });

  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  console.log('=== APLICANDO CORREÇÕES ===\n');

  let fixedCount = 0;
  const errors = [];

  for (const fix of domainFixes) {
    const { error } = await supabase.from('skills').update({
      category: fix.newCategory
    }).eq('id', fix.id);

    if (error) {
      errors.push({ skill: fix.id, error: error.message });
      console.log(`❌ ${fix.id}: ${error.message}`);
    } else {
      fixedCount++;
      console.log(`✓ ${fix.id} → ${fix.newCategory}`);
    }
  }

  console.log(`\n=== RESULTADO ===`);
  console.log(`✓ Domínios corrigidos: ${fixedCount}/${domainFixes.length}`);
  console.log(`❌ Erros: ${errors.length}`);

  // Validar distribuição final
  const { data: allSkills } = await supabase.from('skills').select('id, name, category');
  
  console.log('\n=== DISTRIBUIÇÃO FINAL POR DOMÍNIO ===\n');
  
  const byCategory = {};
  allSkills.forEach(s => {
    byCategory[s.category] = (byCategory[s.category] || 0) + 1;
  });

  Object.entries(byCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count} skills`);
  });

  fs.writeFileSync(
    path.join(__dirname, 'domain-fixes-result.json'),
    JSON.stringify({
      timestamp: new Date().toISOString(),
      fixes_applied: fixedCount,
      errors: errors,
      final_distribution: byCategory
    }, null, 2)
  );

  console.log('\n✓ Resultado salvo em: .planning/quick/domain-fixes-result.json');
  console.log('\n🎉 CORREÇÕES APLICADAS! 🎉');
}

fixDomains().catch(console.error);
