import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import germanySchema from '../data/germany.schema.json'

const ajv = new Ajv2020({ allErrors: true, strict: false })
addFormats(ajv)
const validators = { DE: ajv.compile(germanySchema) }

// The published status is checked by the database query. This validator then
// enforces the actual country schema plus the V3 geographic-enrichment rule:
// every fact must explicitly carry location (a point or null).
export function getV3RecordRejectionReasons(content, countryCode) {
  const validate = validators[countryCode]
  if (!validate) return [`No validator configured for country ${countryCode}`]
  if (!content || typeof content !== 'object') return ['Content is missing or is not an object']
  const valid = validate(content)
  const reasons = valid ? [] : (validate.errors || []).map(error => {
    const path = error.instancePath || '/'
    return `Schema ${path}: ${error.message || 'validation failed'}`
  })
  if (!Array.isArray(content.facts) || content.facts.length === 0) {
    reasons.push('V3 rule: facts must be a non-empty array')
  } else {
    content.facts.forEach((fact, index) => {
      if (!Object.prototype.hasOwnProperty.call(fact, 'location')) reasons.push(`V3 rule: facts[${index}] is missing location`)
    })
  }
  if (Array.isArray(content.facts)) {
    const baseIds = content.facts.map(fact => fact.id)
    for (const language of ['cs', 'de', 'en', 'es', 'fr', 'it']) {
      const translatedFacts = content.translations?.[language]?.facts
      if (!Array.isArray(translatedFacts)) reasons.push(`V3 rule: translations.${language}.facts is missing or not an array`)
      else if (translatedFacts.length !== baseIds.length) reasons.push(`V3 rule: translations.${language}.facts has ${translatedFacts.length} items; expected ${baseIds.length}`)
      else translatedFacts.forEach((fact, index) => {
        if (fact.id !== baseIds[index]) reasons.push(`V3 rule: translations.${language}.facts[${index}].id does not match base fact id ${baseIds[index]}`)
      })
    }
  }
  return reasons
}

export function isV3Record(content, countryCode) {
  return getV3RecordRejectionReasons(content, countryCode).length === 0
}
