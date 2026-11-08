import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import germanySchema from '../data/germany.schema.json'

const ajv = new Ajv2020({ allErrors: true, strict: false })
addFormats(ajv)
const validators = { DE: ajv.compile(germanySchema) }

// The published status is checked by the database query. This validator then
// enforces the actual country schema plus the V3 geographic-enrichment rule:
// every fact must explicitly carry location (a point or null).
export function isV3Record(content, countryCode) {
  const validate = validators[countryCode]
  if (!validate || !content || typeof content !== 'object') return false
  if (!validate(content)) return false
  if (!Array.isArray(content.facts) || content.facts.length === 0) return false
  if (!content.facts.every(fact => Object.prototype.hasOwnProperty.call(fact, 'location'))) return false

  const baseIds = content.facts.map(fact => fact.id)
  for (const language of ['cs', 'de', 'en', 'es', 'fr', 'it']) {
    const translatedFacts = content.translations?.[language]?.facts
    if (!Array.isArray(translatedFacts) || translatedFacts.length !== baseIds.length) return false
    if (translatedFacts.some((fact, index) => fact.id !== baseIds[index])) return false
  }
  return true
}
