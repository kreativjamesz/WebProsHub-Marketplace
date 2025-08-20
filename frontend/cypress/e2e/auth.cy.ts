describe('Authentication Flow', () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit('/')

    // Clear any existing auth data
    cy.window().then((win) => {
      win.localStorage.clear()
    })
  })

  describe('Login Page', () => {
    it('should display login form', () => {
      cy.visit('/login')

      cy.get('[data-testid="login-form"]').should('be.visible')
      cy.get('[data-testid="email-input"]').should('be.visible')
      cy.get('[data-testid="password-input"]').should('be.visible')
      cy.get('[data-testid="login-button"]').should('be.visible')
    })

    it('should show validation errors for empty fields', () => {
      cy.visit('/login')

      cy.get('[data-testid="login-button"]').click()

      cy.get('[data-testid="email-error"]').should('be.visible')
      cy.get('[data-testid="password-error"]').should('be.visible')
    })

    it('should successfully login with valid credentials', () => {
      cy.visit('/login')

      // Fill form
      cy.get('[data-testid="email-input"]').type('user@example.com')
      cy.get('[data-testid="password-input"]').type('password123')

      // Submit form
      cy.get('[data-testid="login-button"]').click()

      // Should redirect to dashboard
      cy.url().should('include', '/dashboard')

      // Should show user info
      cy.get('[data-testid="user-name"]').should('contain', 'Test User')
    })

    it('should show error for invalid credentials', () => {
      cy.visit('/login')

      // Fill form with invalid credentials
      cy.get('[data-testid="email-input"]').type('invalid@example.com')
      cy.get('[data-testid="password-input"]').type('wrongpassword')

      // Submit form
      cy.get('[data-testid="login-button"]').click()

      // Should show error message
      cy.get('[data-testid="error-message"]').should('be.visible')
      cy.get('[data-testid="error-message"]').should('contain', 'Invalid credentials')
    })

    it('should show loading state during login', () => {
      cy.visit('/login')

      // Fill form
      cy.get('[data-testid="email-input"]').type('user@example.com')
      cy.get('[data-testid="password-input"]').type('password123')

      // Submit form
      cy.get('[data-testid="login-button"]').click()

      // Should show loading state
      cy.get('[data-testid="login-button"]').should('contain', 'Loading')
      cy.get('[data-testid="login-button"]').should('be.disabled')
    })
  })

  describe('Registration Page', () => {
    it('should display registration form', () => {
      cy.visit('/register')

      cy.get('[data-testid="register-form"]').should('be.visible')
      cy.get('[data-testid="name-input"]').should('be.visible')
      cy.get('[data-testid="email-input"]').should('be.visible')
      cy.get('[data-testid="password-input"]').should('be.visible')
      cy.get('[data-testid="confirm-password-input"]').should('be.visible')
      cy.get('[data-testid="register-button"]').should('be.visible')
    })

    it('should successfully register new user', () => {
      cy.visit('/register')

      const email = `test${Date.now()}@example.com`

      // Fill form
      cy.get('[data-testid="name-input"]').type('New User')
      cy.get('[data-testid="email-input"]').type(email)
      cy.get('[data-testid="password-input"]').type('newpassword123')
      cy.get('[data-testid="confirm-password-input"]').type('newpassword123')

      // Submit form
      cy.get('[data-testid="register-button"]').click()

      // Should show success message
      cy.get('[data-testid="success-message"]').should('be.visible')
      cy.get('[data-testid="success-message"]').should('contain', 'Registration successful')
    })

    it('should show error for password mismatch', () => {
      cy.visit('/register')

      // Fill form with mismatched passwords
      cy.get('[data-testid="name-input"]').type('New User')
      cy.get('[data-testid="email-input"]').type('test@example.com')
      cy.get('[data-testid="password-input"]').type('password123')
      cy.get('[data-testid="confirm-password-input"]').type('differentpassword')

      // Submit form
      cy.get('[data-testid="register-button"]').click()

      // Should show error message
      cy.get('[data-testid="password-error"]').should('be.visible')
      cy.get('[data-testid="password-error"]').should('contain', 'Passwords do not match')
    })
  })

  describe('Protected Routes', () => {
    it('should redirect unauthenticated users to login', () => {
      // Try to access protected route
      cy.visit('/dashboard')

      // Should redirect to login
      cy.url().should('include', '/login')
    })

    it('should allow authenticated users to access protected routes', () => {
      // Login first
      cy.visit('/login')
      cy.get('[data-testid="email-input"]').type('user@example.com')
      cy.get('[data-testid="password-input"]').type('password123')
      cy.get('[data-testid="login-button"]').click()

      // Should be on dashboard
      cy.url().should('include', '/dashboard')

      // Try to access another protected route
      cy.visit('/profile')
      cy.url().should('include', '/profile')
    })
  })

  describe('Admin Routes', () => {
    it('should redirect non-admin users from admin routes', () => {
      // Login as regular user
      cy.visit('/login')
      cy.get('[data-testid="email-input"]').type('user@example.com')
      cy.get('[data-testid="password-input"]').type('password123')
      cy.get('[data-testid="login-button"]').click()

      // Try to access admin route
      cy.visit('/admin')

      // Should redirect to unauthorized page
      cy.url().should('include', '/unauthorized')
    })

    it('should allow admin users to access admin routes', () => {
      // Login as admin
      cy.visit('/login')
      cy.get('[data-testid="email-input"]').type('admin@example.com')
      cy.get('[data-testid="password-input"]').type('admin123')
      cy.get('[data-testid="login-button"]').click()

      // Should be able to access admin routes
      cy.visit('/admin')
      cy.url().should('include', '/admin')

      cy.visit('/admin/users')
      cy.url().should('include', '/admin/users')
    })
  })

  describe('Logout', () => {
    it('should logout user and redirect to home', () => {
      // Login first
      cy.visit('/login')
      cy.get('[data-testid="email-input"]').type('user@example.com')
      cy.get('[data-testid="password-input"]').type('password123')
      cy.get('[data-testid="login-button"]').click()

      // Should be on dashboard
      cy.url().should('include', '/dashboard')

      // Click logout
      cy.get('[data-testid="logout-button"]').click()

      // Should redirect to home
      cy.url().should('eq', Cypress.config().baseUrl + '/')

      // Should not show user info
      cy.get('[data-testid="user-name"]').should('not.exist')
    })

    it('should clear auth data on logout', () => {
      // Login first
      cy.visit('/login')
      cy.get('[data-testid="email-input"]').type('user@example.com')
      cy.get('[data-testid="password-input"]').type('password123')
      cy.get('[data-testid="login-button"]').click()

      // Logout
      cy.get('[data-testid="logout-button"]').click()

      // Check localStorage is cleared
      cy.window().then((win) => {
        expect(win.localStorage.getItem('auth_token')).to.be.null
        expect(win.localStorage.getItem('user')).to.be.null
      })
    })
  })

  describe('Navigation', () => {
    it('should show different navigation for authenticated users', () => {
      // Check unauthenticated navigation
      cy.visit('/')
      cy.get('[data-testid="nav-login"]').should('be.visible')
      cy.get('[data-testid="nav-register"]').should('be.visible')
      cy.get('[data-testid="nav-dashboard"]').should('not.exist')
      cy.get('[data-testid="nav-profile"]').should('not.exist')

      // Login
      cy.visit('/login')
      cy.get('[data-testid="email-input"]').type('user@example.com')
      cy.get('[data-testid="password-input"]').type('password123')
      cy.get('[data-testid="login-button"]').click()

      // Check authenticated navigation
      cy.get('[data-testid="nav-login"]').should('not.exist')
      cy.get('[data-testid="nav-register"]').should('not.exist')
      cy.get('[data-testid="nav-dashboard"]').should('be.visible')
      cy.get('[data-testid="nav-profile"]').should('be.visible')
    })
  })
})
