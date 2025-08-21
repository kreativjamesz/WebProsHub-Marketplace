<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
            <p class="mt-2 text-gray-600">Manage all users in the marketplace</p>
          </div>
          <button
            @click="showCreateModal = true"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            Add User
          </button>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Search Users</label>
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by name, email, or role..."
                class="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Role Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              v-model="selectedRole"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">All Roles</option>
              <option value="BUYER">Buyer</option>
              <option value="SELLER">Seller</option>
              <option value="ADMIN">Admin</option>
              <option value="STAFF">Staff</option>
            </select>
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="selectedStatus"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">Users ({{ filteredUsers.length }})</h2>
            <div class="flex items-center space-x-4">
              <button
                @click="exportUsers"
                :disabled="exporting"
                class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ exporting ? 'Exporting...' : 'Export' }}
              </button>
              <button
                @click="bulkDelete"
                :disabled="selectedUsers.length === 0"
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Selected ({{ selectedUsers.length }})
              </button>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left">
                  <input
                    v-model="selectAll"
                    @change="toggleSelectAll"
                    type="checkbox"
                    class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Joined
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Login
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    v-model="selectedUsers"
                    :value="user.id"
                    type="checkbox"
                    class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3"
                    >
                      <span class="text-sm font-medium text-gray-600">
                        {{ getUserInitials(user.fullName) }}
                      </span>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ user.fullName }}</div>
                      <div class="text-sm text-gray-500">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                      getRoleColor(user.role),
                    ]"
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                      getStatusColor(user.status),
                    ]"
                  >
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.lastLoginAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button @click="editUser(user)" class="text-blue-600 hover:text-blue-900">
                      Edit
                    </button>
                    <button
                      @click="toggleUserStatus(user)"
                      :class="
                        user.status === 'active'
                          ? 'text-yellow-600 hover:text-yellow-900'
                          : 'text-green-600 hover:text-green-900'
                      "
                    >
                      {{ user.status === 'active' ? 'Suspend' : 'Activate' }}
                    </button>
                    <button @click="deleteUser(user)" class="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="px-6 py-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredUsers.length }} results
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span class="px-3 py-1 text-sm text-gray-700">
                Page {{ currentPage }} of {{ totalPages }}
              </span>
              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit User Modal -->
    <div
      v-if="showCreateModal || editingUser"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingUser ? 'Edit User' : 'Create New User' }}
          </h3>

          <form @submit.prevent="saveUser" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                v-model="userForm.fullName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                v-model="userForm.email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                v-model="userForm.role"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="BUYER">Buyer</option>
                <option value="SELLER">Seller</option>
                <option value="ADMIN">Admin</option>
                <option value="STAFF">Staff</option>
              </select>
            </div>

            <div v-if="!editingUser">
              <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                v-model="userForm.password"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                v-model="userForm.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div class="flex space-x-3 mt-6">
              <button
                type="button"
                @click="closeModal"
                class="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ saving ? 'Saving...' : editingUser ? 'Update' : 'Create' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

// Reactive data
const searchQuery = ref('')
const selectedRole = ref('')
const selectedStatus = ref('')
const selectedUsers = ref<string[]>([])
const showCreateModal = ref(false)
const editingUser = ref<any>(null)
const saving = ref(false)
const exporting = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10

// User form
const userForm = ref({
  fullName: '',
  email: '',
  role: 'BUYER',
  password: '',
  status: 'active',
})

// Mock users data
const users = ref([
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    role: 'BUYER',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    lastLoginAt: '2024-01-20T14:45:00Z',
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'SELLER',
    status: 'active',
    createdAt: '2024-01-10T09:15:00Z',
    lastLoginAt: '2024-01-19T16:20:00Z',
  },
  {
    id: '3',
    fullName: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'ADMIN',
    status: 'active',
    createdAt: '2024-01-05T08:00:00Z',
    lastLoginAt: '2024-01-20T11:30:00Z',
  },
  {
    id: '4',
    fullName: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'BUYER',
    status: 'inactive',
    createdAt: '2024-01-12T13:45:00Z',
    lastLoginAt: '2024-01-18T10:15:00Z',
  },
  {
    id: '5',
    fullName: 'David Brown',
    email: 'david.brown@example.com',
    role: 'SELLER',
    status: 'suspended',
    createdAt: '2024-01-08T15:20:00Z',
    lastLoginAt: '2024-01-17T09:45:00Z',
  },
])

// Computed properties
const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchesSearch =
      !searchQuery.value ||
      user.fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesRole = !selectedRole.value || user.role === selectedRole.value
    const matchesStatus = !selectedStatus.value || user.status === selectedStatus.value

    return matchesSearch && matchesRole && matchesStatus
  })
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() =>
  Math.min(startIndex.value + itemsPerPage, filteredUsers.value.length),
)
const paginatedUsers = computed(() => filteredUsers.value.slice(startIndex.value, endIndex.value))

const selectAll = computed({
  get: () =>
    selectedUsers.value.length === paginatedUsers.value.length && paginatedUsers.value.length > 0,
  set: (value) => {
    if (value) {
      selectedUsers.value = paginatedUsers.value.map((user) => user.id)
    } else {
      selectedUsers.value = []
    }
  },
})

// Methods
const getUserInitials = (fullName: string) => {
  return fullName
    .split(' ')
    .map((name) => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const getRoleColor = (role: string) => {
  switch (role) {
    case 'ADMIN':
      return 'bg-red-100 text-red-800'
    case 'STAFF':
      return 'bg-purple-100 text-purple-800'
    case 'SELLER':
      return 'bg-green-100 text-green-800'
    case 'BUYER':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'inactive':
      return 'bg-gray-100 text-gray-800'
    case 'suspended':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'Never'
  return new Date(dateString).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedUsers.value = []
  } else {
    selectedUsers.value = paginatedUsers.value.map((user) => user.id)
  }
}

const editUser = (user: any) => {
  editingUser.value = user
  userForm.value = {
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    password: '',
    status: user.status,
  }
}

const closeModal = () => {
  showCreateModal.value = false
  editingUser.value = null
  userForm.value = {
    fullName: '',
    email: '',
    role: 'BUYER',
    password: '',
    status: 'active',
  }
}

const saveUser = async () => {
  saving.value = true
  try {
    // TODO: Replace with actual API call
    // if (editingUser.value) {
    //   await apiService.admin.updateUser(editingUser.value.id, userForm.value)
    // } else {
    //   await apiService.admin.createUser(userForm.value)
    // }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (editingUser.value) {
      // Update existing user
      const index = users.value.findIndex((u) => u.id === editingUser.value.id)
      if (index !== -1) {
        users.value[index] = { ...users.value[index], ...userForm.value }
      }
    } else {
      // Add new user
      const newUser = {
        id: Date.now().toString(),
        ...userForm.value,
        createdAt: new Date().toISOString(),
        lastLoginAt: '',
      }
      users.value.unshift(newUser)
    }

    closeModal()
    console.log('User saved successfully')
  } catch (error) {
    console.error('Error saving user:', error)
  } finally {
    saving.value = false
  }
}

const toggleUserStatus = async (user: any) => {
  try {
    const newStatus = user.status === 'active' ? 'suspended' : 'active'

    // TODO: Replace with actual API call
    // await apiService.admin.updateUserStatus(user.id, newStatus)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    user.status = newStatus
    console.log(`User status updated to ${newStatus}`)
  } catch (error) {
    console.error('Error updating user status:', error)
  }
}

const deleteUser = async (user: any) => {
  if (!confirm(`Are you sure you want to delete ${user.fullName}? This action cannot be undone.`)) {
    return
  }

  try {
    // TODO: Replace with actual API call
    // await apiService.admin.deleteUser(user.id)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = users.value.findIndex((u) => u.id === user.id)
    if (index !== -1) {
      users.value.splice(index, 1)
    }

    // Remove from selected users if present
    const selectedIndex = selectedUsers.value.indexOf(user.id)
    if (selectedIndex !== -1) {
      selectedUsers.value.splice(selectedIndex, 1)
    }

    console.log('User deleted successfully')
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

const bulkDelete = async () => {
  if (
    !confirm(
      `Are you sure you want to delete ${selectedUsers.value.length} users? This action cannot be undone.`,
    )
  ) {
    return
  }

  try {
    // TODO: Replace with actual API call
    // await apiService.admin.bulkDeleteUsers(selectedUsers.value)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Remove selected users
    users.value = users.value.filter((user) => !selectedUsers.value.includes(user.id))
    selectedUsers.value = []

    console.log('Users deleted successfully')
  } catch (error) {
    console.error('Error deleting users:', error)
  }
}

const exportUsers = async () => {
  exporting.value = true
  try {
    // TODO: Replace with actual API call
    // const response = await apiService.admin.exportUsers(filteredUsers.value)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // TODO: Handle actual file download
    console.log('Users exported successfully')
  } catch (error) {
    console.error('Error exporting users:', error)
  } finally {
    exporting.value = false
  }
}

// Watch for filter changes to reset pagination
watch([searchQuery, selectedRole, selectedStatus], () => {
  currentPage.value = 1
})

// Lifecycle
onMounted(() => {
  // Set page title
  document.title = 'User Management - Admin Panel - WebProsHub Marketplace'
})
</script>
