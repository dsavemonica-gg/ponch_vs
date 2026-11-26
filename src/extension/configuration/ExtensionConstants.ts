export const COMMANDS = {
  ACTIVATE: 'ponch.extension.activate',
  DEACTIVATE: 'ponch.extension.deactivate',
  OPEN_CUSTOMIZER: 'ponch.openCustomizer',
} as const;

export const CONTEXT_KEYS = {
  IS_ACTIVE: 'ponch.isActive',
} as const;

export const STORAGE_KEYS = {
  IS_ACTIVE: 'ponch.lifecycle.isActive',
} as const;