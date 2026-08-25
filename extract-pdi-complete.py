#!/usr/bin/env python3
"""
Extrai todo o conteúdo do PDI em formato JSON estruturado
para validação por agente externo.
"""

import json
import re
from pathlib import Path
from datetime import datetime

def extract_typescript_objects(content, pattern_name):
    """Extrai objetos TypeScript usando regex."""
    pattern = rf'export const {pattern_name}: \w+\[\] = \[(.*?)\];'
    match = re.search(pattern, content, re.DOTALL)
    return match.group(1) if match else ""

def parse_milestone(text):
    """Parse básico de milestone."""
    milestone = {}
    
    # Extrair campos principais
    if match := re.search(r"id: '([^']+)'", text):
        milestone['id'] = match.group(1)
    if match := re.search(r"title: '([^']+)'", text):
        milestone['title'] = match.group(1)
    if match := re.search(r"displayName: '([^']+)'", text):
        milestone['displayName'] = match.group(1)
    if match := re.search(r"description: '([^']+)'", text):
        milestone['description'] = match.group(1)
    if match := re.search(r"status: '([^']+)'", text):
        milestone['status'] = match.group(1)
    if match := re.search(r"progress: (\d+)", text):
        milestone['progress'] = int(match.group(1))
    if match := re.search(r"deadline: '([^']+)'", text):
        milestone['deadline'] = match.group(1)
    if match := re.search(r"notes: '([^']+)'", text):
        milestone['notes'] = match.group(1)
    if match := re.search(r"phase: '([^']+)'", text):
        milestone['phase'] = match.group(1)
    
    return milestone

def parse_skill(text):
    """Parse básico de skill."""
    skill = {}
    
    if match := re.search(r"id: '([^']+)'", text):
        skill['id'] = match.group(1)
    if match := re.search(r"name: '([^']+)'", text):
        skill['name'] = match.group(1)
    if match := re.search(r"level: (\d+)", text):
        skill['level'] = int(match.group(1))
    if match := re.search(r"description: '([^']+)'", text):
        skill['description'] = match.group(1)
    if match := re.search(r"category: '([^']+)'", text):
        skill['category'] = match.group(1)
    if match := re.search(r"type: '([^']+)'", text):
        skill['type'] = match.group(1)
    
    return skill

def main():
    # Ler arquivo principal
    pdi_path = Path('src/data/pdiData.ts')
    content = pdi_path.read_text(encoding='utf-8')
    
    # Extrair seções
    milestones_raw = content.split('export const milestones: Milestone[] = [')[1].split('];')[0]
    skills_raw = content.split('export const skills: Skill[] = [')[1].split('];')[0]
    projects_raw = content.split('export const projects: Project[] = [')[1].split('];')[0]
    
    # Split por objetos (usando regex para encontrar { ... },)
    milestone_objects = re.findall(r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}', milestones_raw)
    skill_objects = re.findall(r'\{[^{}]*\}', skills_raw)
    
    milestones = [parse_milestone(m) for m in milestone_objects if 'id:' in m]
    skills = [parse_skill(s) for s in skill_objects if 'id:' in s]
    
    # Estrutura final
    pdi_complete = {
        "metadata": {
            "export_date": datetime.now().isoformat(),
            "version": "2.0.0",
            "purpose": "Validação completa do PDI",
            "source": "pdiData.ts"
        },
        "personal_info": {
            "name": "Gustavo Soldera",
            "birth_date": "2002-05-30",
            "company": "Itaú Unibanco",
            "department": "Cyber Security",
            "current_role": "Engenheiro de Analytics PL",
            "target_role": "Engenheiro de Dados Sênior",
            "current_level": "L2",
            "target_level": "L3",
            "timeline": {
                "experience_start": "2023-06-07",
                "bank_start": "2024-05-05",
                "junior_start": "2025-05-05",
                "pleno_target": "2026-06-07",
                "senior_target": "2028-01-01"
            }
        },
        "statistics": {
            "total_milestones": len(milestones),
            "total_skills": len(skills),
            "milestones_by_status": {},
            "skills_by_category": {},
            "skills_by_level": {}
        },
        "milestones": milestones,
        "skills": skills[:20]  # Primeiras 20 skills como exemplo
    }
    
    # Calcular estatísticas
    for m in milestones:
        status = m.get('status', 'unknown')
        pdi_complete['statistics']['milestones_by_status'][status] = \
            pdi_complete['statistics']['milestones_by_status'].get(status, 0) + 1
    
    for s in skills:
        cat = s.get('category', 'unknown')
        level = s.get('level', 0)
        pdi_complete['statistics']['skills_by_category'][cat] = \
            pdi_complete['statistics']['skills_by_category'].get(cat, 0) + 1
        pdi_complete['statistics']['skills_by_level'][str(level)] = \
            pdi_complete['statistics']['skills_by_level'].get(str(level), 0) + 1
    
    # Salvar JSON
    output_path = Path('pdi-complete.json')
    output_path.write_text(json.dumps(pdi_complete, indent=2, ensure_ascii=False), encoding='utf-8')
    
    print(f"Arquivo gerado: {output_path}")
    print(f"Estatisticas:")
    print(f"   - Milestones: {len(milestones)}")
    print(f"   - Skills: {len(skills)}")
    print(f"   - Status dos milestones: {pdi_complete['statistics']['milestones_by_status']}")

if __name__ == '__main__':
    main()
