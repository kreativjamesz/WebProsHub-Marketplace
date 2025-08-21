import type { Address } from '@/types/marketplace'

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  bio: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say'
  location: string
  website?: string
  socialMedia: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
}

export interface UserPreferences {
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  marketingEmails: boolean
  orderUpdates: boolean
  newProductAlerts: boolean
  language: string
  timezone: string
  currency: string
}

export const mockProfile: UserProfile = {
  id: 'user1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  avatar: '/images/avatars/john-doe.jpg',
  bio: 'Passionate shopper and tech enthusiast. Love discovering new products and great deals.',
  dateOfBirth: '1990-05-15',
  gender: 'male',
  location: 'New York, NY',
  website: 'https://johndoe.com',
  socialMedia: {
    facebook: 'johndoe',
    twitter: '@johndoe',
    instagram: 'johndoe_nyc'
  }
}

export const mockAddress: Address = {
  id: 'addr1',
  userId: 'user1',
  type: 'shipping',
  name: 'John Doe',
  phone: '+1 (555) 123-4567',
  street: '123 Main Street',
  city: 'New York',
  state: 'NY',
  country: 'USA',
  zipCode: '10001',
  isDefault: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

export const mockPreferences: UserPreferences = {
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  marketingEmails: false,
  orderUpdates: true,
  newProductAlerts: true,
  language: 'en',
  timezone: 'America/New_York',
  currency: 'USD'
}
