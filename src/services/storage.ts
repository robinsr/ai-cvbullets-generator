const API_CONFIG_KEY = 'resume-bullet-point-api-config'
const ENCRYPTION_KEY = 'resume-bullet-point-key'

// Simple encryption/decryption (for production, consider using a more robust solution)
class SecureStorage {
  private static getEncryptionKey(): string {
    // In a real app, you might want to derive this from user input or use a more secure method
    return ENCRYPTION_KEY
  }

  private static encrypt(text: string): string {
    try {
      const key = this.getEncryptionKey()
      let result = ''
      for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        result += String.fromCharCode(charCode)
      }
      return btoa(result) // Base64 encode
    } catch (error) {
      console.error('Encryption failed:', error)
      return text // Fallback to plain text
    }
  }

  private static decrypt(encryptedText: string): string {
    try {
      const key = this.getEncryptionKey()
      const decoded = atob(encryptedText) // Base64 decode
      let result = ''
      for (let i = 0; i < decoded.length; i++) {
        const charCode = decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        result += String.fromCharCode(charCode)
      }
      return result
    } catch (error) {
      console.error('Decryption failed:', error)
      return encryptedText // Fallback to original text
    }
  }

  static saveAPIConfig(config: { provider: string; apiKey: string; model: string }): void {
    try {
      const encryptedConfig = {
        ...config,
        apiKey: this.encrypt(config.apiKey)
      }
      localStorage.setItem(API_CONFIG_KEY, JSON.stringify(encryptedConfig))
    } catch (error) {
      console.error('Failed to save API config:', error)
    }
  }

  static getAPIConfig(): { provider: string; apiKey: string; model: string } | null {
    try {
      const stored = localStorage.getItem(API_CONFIG_KEY)
      if (!stored) return null

      const encryptedConfig = JSON.parse(stored)
      return {
        ...encryptedConfig,
        apiKey: this.decrypt(encryptedConfig.apiKey)
      }
    } catch (error) {
      console.error('Failed to load API config:', error)
      return null
    }
  }

  static clearAPIConfig(): void {
    try {
      localStorage.removeItem(API_CONFIG_KEY)
    } catch (error) {
      console.error('Failed to clear API config:', error)
    }
  }

  static hasStoredAPIConfig(): boolean {
    return this.getAPIConfig() !== null
  }
}

export { SecureStorage } 