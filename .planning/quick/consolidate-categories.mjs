import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeamento de categorias antigas para consolidadas
const categoryMappings = {
  // Consolidar variações
  'IA Generativa': 'AI Engineering',
  'Segurança & SecMLOps': 'AI Security & SecMLOps',
  'Cloud & Infraestrutura': 'Cloud & Platform',
  'Arquitetura Corporativa': 'Arquitetura & APIs',
  'AI/ML Engineering': 'AI Engineering',
  'Data Engineering': 'Engenharia de Dados',
  'DevSecOps': 'Segurança & Red Team',
  'SRE & Observability': 'Cloud & Platform',
  'Soft Skills': 'Liderança & Soft Skills'
};

async function consolidateCategories() {
  const envText = fs.readFileSync(path.join(__dirname, '../../.env.local'), 'utf8');
  const env = {};
  envText.split('\n').forEach(line => {
    const [k, v] = line.split('=');
    if (k && v) env[k.trim()] = v.trim();
  });

  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  console.log('\n=== CONSOLIDAÇÃO DE CATEGORIAS ===\n');

  const { data: skills } = await supabase.from('skills').select('*');
  
  let updatedCount = 0;
  const updates = [];

  for (const skill of skills) {
    if (categoryMappings[skill.category]) {
      const newCategory = categoryMappings[skill.category];
      updates.push({ id: skill.id, oldCategory: skill.category, newCategory });
      
      const { error } = await supabase.from('skills').update({
        category: newCategory
      }).eq('id', skill.id);

      if (error) {
        console.log(`❌ ${skill.id}: ${error.message}`);
      } else {
        updatedCount++;
        console.log(`✓ ${skill.id}: "${skill.category}" → "${newCategory}"`);
      }
    }
  }

  console.log(`\n=== RESULTADO ===`);
  console.log(`✓ Skills atualizadas: ${updatedCount}`);

  // Verificar categorias finais
  const { data: updatedSkills } = await supabase.from('skills').select('category');
  const finalCategories = {};
  updatedSkills.forEach(s => {
    finalCategories[s.category] = (finalCategories[s.category] || 0) + 1;
  });

  console.log('\n=== CATEGORIAS CONSOLIDADAS (FINAL) ===\n');
  Object.entries(finalCategories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count} skills`);
  });

  // Salvar resultado
  fs.writeFileSync(
    path.join(__dirname, 'category-consolidation-result.json'),
    JSON.stringify({
      timestamp: new Date().toISOString(),
      updates: updates,
      total_updated: updatedCount,
      final_categories: finalCategories
    }, null, 2)
  );

  console.log('\n✓ Resultado salvo em: .planning/quick/category-consolidation-result.json');
  console.log('\n🎉 CONSOLIDAÇÃO CONCLUÍDA! 🎉');
}

consolidateCategories().catch(console.error);
