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

/** Fork presentation used when an administrator has not chosen another name. */
export const DEFAULT_SYSTEM_NAME = '电器亚瑟王的圣地'

/**
 * Stock name written by unmodified New API. A stored copy is still the unset
 * default, not an explicit brand.
 */
export const UPSTREAM_DEFAULT_SYSTEM_NAME = 'New API'

/** Exact notice required by the project's AGPL section 7 additional terms. */
export const REQUIRED_FRONTEND_ATTRIBUTION =
  'Frontend design and development by New API contributors.'

/**
 * Keep an explicit administrator brand. Empty values and the upstream stock
 * name fall back to the fork default. This does not write server settings.
 */
export function resolveDisplayedSystemName(stored: unknown): string {
  if (typeof stored !== 'string') return DEFAULT_SYSTEM_NAME
  const name = stored.trim()
  if (name === '' || name === UPSTREAM_DEFAULT_SYSTEM_NAME) {
    return DEFAULT_SYSTEM_NAME
  }
  return name
}
