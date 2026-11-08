/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { RegistrationPolicyNote } from '@/features/auth/components/registration-policy-note'
import { isPublicRegistrationOffered } from '@/lib/registration-access'

describe('isPublicRegistrationOffered', () => {
  test('still offers sign-up when status has not loaded', () => {
    expect(isPublicRegistrationOffered(null)).toBe(true)
    expect(isPublicRegistrationOffered(undefined)).toBe(true)
  })

  test('offers sign-up only while the server registration flag allows it', () => {
    expect(isPublicRegistrationOffered({ register_enabled: true })).toBe(true)
    expect(isPublicRegistrationOffered({ register_enabled: false })).toBe(false)
    expect(
      isPublicRegistrationOffered({
        register_enabled: true,
        self_use_mode_enabled: true,
      })
    ).toBe(false)
  })
})

function renderNote(
  status: {
    register_enabled?: boolean
    self_use_mode_enabled?: boolean
  } | null
) {
  const rootRoute = createRootRoute({ component: Outlet })
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <RegistrationPolicyNote status={status} />,
  })
  const signUpRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/sign-up',
    component: () => <div>sign-up</div>,
  })
  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute, signUpRoute]),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  return render(<RouterProvider router={router} />)
}

describe('RegistrationPolicyNote', () => {
  test('shows the sign-up link and does not claim a policy before status loads', async () => {
    renderNote(null)

    expect(await screen.findByRole('link', { name: 'Sign up' })).toBeVisible()
    expect(
      screen.queryByText('Registration is currently open.')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(
        'Accounts are limited to ones an administrator authorizes.'
      )
    ).not.toBeInTheDocument()
  })

  test('keeps sign-up visible while the server still has registration enabled', async () => {
    renderNote({ register_enabled: true })

    expect(await screen.findByRole('link', { name: 'Sign up' })).toBeVisible()
    expect(screen.getByText('Registration is currently open.')).toBeVisible()
  })

  test('hides sign-up and says registration is closed when the server flag is off', async () => {
    renderNote({ register_enabled: false })

    expect(
      screen.queryByRole('link', { name: 'Sign up' })
    ).not.toBeInTheDocument()
    expect(
      await screen.findByText(
        'Accounts are limited to ones an administrator authorizes.'
      )
    ).toBeVisible()
  })
})
