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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router'
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, describe, expect, test } from 'vitest'

import { PortalHome } from '@/features/portal/portal-home'
import { STATUS_QUERY_KEY } from '@/lib/status-query'
import {
  DEFAULT_CURRENCY_CONFIG,
  useSystemConfigStore,
} from '@/stores/system-config-store'

const longName = '电器亚瑟王的圣地电器亚瑟王的圣地·隔离测试用的超长中文标题'

afterEach(() => {
  window.localStorage.clear()
  useSystemConfigStore.setState({
    config: {
      systemName: '电器亚瑟王的圣地',
      logo: '/brand-mark.svg',
      currency: { ...DEFAULT_CURRENCY_CONFIG },
    },
    loading: false,
    loadedLogoUrl: '/brand-mark.svg',
  })
})

function renderHome(name: string) {
  window.localStorage.clear()
  useSystemConfigStore.setState({
    config: {
      systemName: name,
      logo: '/brand-mark.svg',
      currency: { ...DEFAULT_CURRENCY_CONFIG },
    },
    loading: false,
    loadedLogoUrl: '/brand-mark.svg',
  })
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  queryClient.setQueryData(STATUS_QUERY_KEY, {
    system_name: name,
    register_enabled: false,
  })

  const rootRoute = createRootRoute({ component: Outlet })
  const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <PortalHome isAuthenticated={false} />,
  })
  const plainRoute = (path: string) =>
    createRoute({
      getParentRoute: () => rootRoute,
      path,
      component: () => <div>{path}</div>,
    })
  const router = createRouter({
    routeTree: rootRoute.addChildren([
      homeRoute,
      plainRoute('/sign-in'),
      plainRoute('/sign-up'),
      plainRoute('/guide'),
      plainRoute('/about'),
      plainRoute('/dashboard'),
      plainRoute('/keys'),
    ]),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })

  function Wrapper(props: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    )
  }

  return render(<RouterProvider router={router} />, { wrapper: Wrapper })
}

describe('portal title', () => {
  test('shows the full long Chinese site name in a wrapping heading', async () => {
    renderHome(longName)

    const heading = await screen.findByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(longName)
    expect(heading.className).toContain('break-words')
    expect(heading.className).toContain('[overflow-wrap:anywhere]')
  })
})
