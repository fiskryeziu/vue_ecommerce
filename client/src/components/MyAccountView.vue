<template>
  <Breadcrumb :items="links" class="breadcrumb-nav" />

  <template v-if="user.isAuthed">
    <div class="main-wrapper">
      <div class="tab-navigation">
        <button
          @click="activeTab = 'orders'"
          :class="['tab-button', { 'tab-active': activeTab === 'orders' }]"
        >
          <ShoppingBag class="tab-icon" />
          <span>My Orders</span>
        </button>
        <button
          @click="activeTab = 'profile'"
          :class="['tab-button', { 'tab-active': activeTab === 'profile' }]"
        >
          <User class="tab-icon" />
          <span>Profile</span>
        </button>
        <button @click="handleLogout" class="tab-button tab-logout">
          <LogOut class="tab-icon" />
          <span>Logout</span>
        </button>
      </div>

      <div class="sidebar">
        <div class="sidebar-header">
          <h1 class="sidebar-title">My Account</h1>
        </div>

        <nav class="sidebar-nav">
          <div class="nav-items">
            <button
              @click="activeTab = 'orders'"
              :class="['nav-item', { 'nav-item-active': activeTab === 'orders' }]"
            >
              <ShoppingBag class="nav-icon" />
              My Orders
            </button>

            <button
              @click="activeTab = 'profile'"
              :class="['nav-item', { 'nav-item-active': activeTab === 'profile' }]"
            >
              <User class="nav-icon" />
              Profile Settings
            </button>

            <button @click="handleLogout" class="nav-item nav-item-logout">
              <LogOut class="nav-icon" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      <!-- Main content -->
      <div class="main-content">
        <div class="content-wrapper">
          <!-- Orders Section -->
          <div v-if="activeTab === 'orders'" class="orders-section">
            <div class="section-header">
              <h2 class="section-title">My Orders</h2>
              <div class="filter-container">
                <select v-model="orderFilter" class="filter-select">
                  <option value="all">All Orders</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <!-- Orders List -->
            <div class="orders-list">
              <div v-for="order in filteredOrders" :key="order.order_id" class="order-card">
                <div class="order-header">
                  <div class="order-info">
                    <h3 class="order-id">Order #{{ order.order_id }}</h3>
                    <p class="order-date">{{ formatDate(order.date) }}</p>
                  </div>
                  <div class="order-meta">
                    <span :class="['status-badge', `status-${order.status}`]">
                      {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
                    </span>
                    <span class="order-total">${{ order.total }}</span>
                  </div>
                </div>

                <div class="order-items">
                  <div class="items-grid">
                    <div v-for="item in order.items" :key="item.id" class="item-row">
                      <div class="item-icon">
                        <img :src="item.image" />
                      </div>
                      <div class="item-details">
                        <p class="item-name">{{ item.title }}</p>
                        <p class="item-quantity">Qty: {{ item.quantity }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="order-footer">
                  <div class="shipping-info">
                    <span class="shipping-address">
                      <Truck class="truck-icon" />
                      {{ order.shipping_address }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="filteredOrders.length === 0" class="empty-state">
              <ShoppingBag class="empty-icon" />
              <p class="empty-text">No orders found</p>
            </div>
          </div>

          <!-- Profile Section -->
          <div v-if="activeTab === 'profile'" class="profile-section">
            <h2 class="section-title">Profile Settings</h2>

            <div class="profile-card">
              <form @submit.prevent="updateHandler" class="profile-form">
                <div class="form-grid">
                  <div class="form-group">
                    <label class="form-label">First Name</label>
                    <input v-model="profile.first_name" type="text" class="form-input" required />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Last Name</label>
                    <input v-model="profile.last_name" type="text" class="form-input" required />
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Email Address</label>
                  <input v-model="profile.email" type="email" class="form-input" required />
                </div>

                <div class="form-group">
                  <label class="form-label">Phone Number</label>
                  <input v-model="profile.phone" type="tel" class="form-input" />
                </div>

                <div class="form-group">
                  <label class="form-label">Address</label>
                  <textarea v-model="profile.street" rows="3" class="form-textarea"></textarea>
                </div>

                <div class="password-section">
                  <h3 class="password-title">Change Password</h3>
                  <div class="password-fields">
                    <div class="form-group">
                      <label class="form-label">Current Password</label>
                      <input v-model="passwordForm.current" type="password" class="form-input" />
                    </div>

                    <div class="form-grid">
                      <div class="form-group">
                        <label class="form-label">New Password</label>
                        <input v-model="passwordForm.new" type="password" class="form-input" />
                      </div>

                      <div class="form-group">
                        <label class="form-label">Confirm New Password</label>
                        <input v-model="passwordForm.confirm" type="password" class="form-input" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button type="button" class="btn btn-secondary">Cancel</button>
                  <button type="submit" :disabled="isUpdating" class="btn btn-primary">
                    {{ isUpdating ? 'Updating...' : 'Update Profile' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <template v-else>
    <LoginForm v-if="hasAccount" @toggle="toggleLogins" />
    <RegisterForm v-else @toggle="toggleLogins" />
  </template>

  <div v-if="ui.message.show" :class="['toast', `toast-${ui.message.type}`]">
    <div class="toast-content">
      <CheckCircle v-if="ui.message.type === 'success'" class="toast-icon" />
      <AlertCircle v-else class="toast-icon" />
      {{ ui.message.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { ShoppingBag, User, LogOut, Truck, CheckCircle, AlertCircle } from 'lucide-vue-next'
import Breadcrumb from './Breadcrumb.vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
import { useUserStore } from '@/stores/userStore'
import { useProductsStore } from '@/stores/productsStore'
import type { Ref } from 'vue'
import type { Order } from '@/types'
import { useUIStore } from '@/stores/uiStore'
import { storeToRefs } from 'pinia'

const links = [
  { label: 'Home', link: '/' },
  { label: 'My Account', link: '' },
]

const user = useUserStore()
const { profile } = storeToRefs(user) // make it reactive
const product = useProductsStore()
const ui = useUIStore()

// Authentication state
const hasAccount = ref(true)

// Dashboard state
const activeTab = ref('orders')
const orderFilter = ref('all')
const isUpdating = ref(false)

const passwordForm = ref({
  current: '',
  new: '',
  confirm: '',
})

const orders: Ref<Order[]> = ref([])

const filteredOrders = computed(() => {
  if (orderFilter.value === 'all') {
    return orders.value
  }
  return orders.value.filter((order) => order.status === orderFilter.value)
})

const formatDate = (dateString: string) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as const
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const updateHandler = async () => {
  isUpdating.value = true

  try {
    if (passwordForm.value.current || passwordForm.value.new || passwordForm.value.confirm) {
      if (!passwordForm.value.current) {
        throw new Error('Current password is required')
      }
      if (passwordForm.value.new !== passwordForm.value.confirm) {
        throw new Error('New passwords do not match')
      }
    }

    await user.updateProfile(passwordForm.value)
    ui.showMessage('success', 'Profile updated successfully!')

    passwordForm.value = {
      current: '',
      new: '',
      confirm: '',
    }
  } catch (error) {
    console.log('qysh asht errori',error)
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.'
    ui.showMessage('error', message)
  } finally {
    isUpdating.value = false
  }
}

const handleLogout = async () => {
  if (confirm('Are you sure you want to logout?')) {
    const logout = await user.logOut()
    if (logout) {
      ui.showMessage('success', 'Logged out successfully!')
    }
  }
}

const toggleLogins = () => {
  hasAccount.value = !hasAccount.value
}

onMounted(async () => {
  await user.isLoggedIn()
  await user.getProfile()

  const orderData = await product.fetchOrders()

  orders.value = orderData

  const saved = localStorage.getItem('hasAccount')
  if (saved !== null) {
    hasAccount.value = saved === 'true'
  }
})

watch(hasAccount, (value) => {
  localStorage.setItem('hasAccount', value.toString())
})
</script>

<style scoped>
/* Tab Navigation below breadcrumb */
.tab-navigation {
  display: flex;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 0 1rem;
}

.main-wrapper {
  display: flex;
  flex-direction: column;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 2px solid transparent;
  position: relative;
}

.tab-button:hover {
  color: #374151;
  background-color: #f9fafb;
}

.tab-button span {
  white-space: nowrap;
}

.tab-icon {
  height: 1.125rem;
  width: 1.125rem;
}

.tab-active {
  color: var(--primary);
  border-bottom-color: var(--primary);
  background-color: #f8fafc;
}

.tab-logout {
  color: #dc2626;
  margin-left: auto;
}

.tab-logout:hover {
  color: #b91c1c;
  background-color: #fef2f2;
}

@media (min-width: 1024px) {
  .tab-navigation {
    display: none;
  }
}

/* Sidebar for Desktop */
.sidebar {
  display: none;
  width: 16rem;
  background: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  margin-top: 1em;
}

@media (min-width: 1024px) {
  .sidebar {
    display: block;
  }

  .main-wrapper {
    flex-direction: row;
  }
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  background-color: var(--primary);
}

.sidebar-title {
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}

.sidebar-nav {
  margin-top: 2rem;
}

.nav-items {
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  text-align: left;
  border-radius: 0.5rem;
  transition: all 0.15s ease;
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  font-size: 0.875rem;
}

.nav-item:hover {
  background-color: #f3f4f6;
}

.nav-item-active {
  background-color: #dbeafe;
  color: var(--primary);
}

.nav-item-logout {
  color: #dc2626;
}

.nav-item-logout:hover {
  background-color: #fef2f2;
}

.nav-icon {
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 0.75rem;
}

/* Main content */
.main-content {
  margin-left: 0;
  flex: 1;
}

@media (min-width: 1024px) {
}

.content-wrapper {
  padding: 1rem;
}

@media (min-width: 1024px) {
  .content-wrapper {
    padding: 2rem;
  }
}

/* Section styles */
.orders-section,
.profile-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin: 0;
}

@media (min-width: 768px) {
  .section-title {
    font-size: 1.875rem;
  }
}

.filter-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-select {
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  background: white;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

/* Orders list */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: box-shadow 0.15s ease;
}

.order-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

@media (min-width: 1024px) {
  .order-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.order-info {
  margin-bottom: 0.5rem;
}

@media (min-width: 1024px) {
  .order-info {
    margin-bottom: 0;
  }
}

.order-id {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem 0;
}

.order-date {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.order-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-pending {
  background-color: #fef3c7;
  color: #92400e;
}

.status-shipped {
  background-color: #dbeafe;
  color: #1e40af;
}

.status-delivered {
  background-color: #d1fae5;
  color: #065f46;
}

.status-paid {
  background-color: #dcfce7;
  color: #15803d;
}

.status-cancelled {
  background-color: #fee2e2;
  color: #991b1b;
}

.order-total {
  font-size: 1.125rem;
  font-weight: bold;
  color: #111827;
}

.order-items {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}

.items-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .items-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .items-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.item-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.item-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hiden;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
  margin: 0 0 0.25rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-quantity {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.order-footer {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .order-footer {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.shipping-info {
  font-size: 0.875rem;
  color: #6b7280;
}

.shipping-address {
  display: flex;
  align-items: center;
}

.truck-icon {
  height: 1rem;
  width: 1rem;
  margin-right: 0.25rem;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 3rem 0;
}

.empty-icon {
  height: 3rem;
  width: 3rem;
  color: #9ca3af;
  margin: 0 auto 1rem;
}

.empty-text {
  color: #6b7280;
  margin: 0;
}

/* Profile section */
.profile-card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

.form-textarea {
  resize: vertical;
  min-height: 4rem;
}

.password-section {
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
}

.password-title {
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
  margin: 0 0 1rem 0;
}

.password-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .form-actions {
    flex-direction: row;
    justify-content: flex-end;
    gap: 1rem;
  }
}

.btn {
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid transparent;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--dark);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: white;
  color: #374151;
  border-color: #d1d5db;
}

.btn-secondary:hover {
  background-color: #f9fafb;
}
</style>
