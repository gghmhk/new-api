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

export type RegistrationStatus = {
  register_enabled?: boolean
  self_use_mode_enabled?: boolean
} | null

/**
 * Whether the public sign-up entry is offered.
 * Matches the existing sign-in condition: hidden only when the server says
 * registration is off or self-use mode is on. A missing status still offers
 * the entry, because hiding it would not close registration.
 */
export function isPublicRegistrationOffered(
  status: RegistrationStatus | undefined
): boolean {
  return !status?.self_use_mode_enabled && status?.register_enabled !== false
}
