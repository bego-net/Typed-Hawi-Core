import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { removeToken } from '../../auth/token'
import ServiceList from '../../components/ServiceList'

export default function ServicesDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Manage Services
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Create, update, and remove services that appear on the public site.
        </p>
      </div>

      <ServiceList />
    </div>
  )
}

