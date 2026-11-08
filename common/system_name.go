package common

import "strings"

const (
	// DefaultSystemName is the name shown when an administrator has not chosen
	// a different one. It is intentionally not the upstream stock name.
	DefaultSystemName = "电器亚瑟王的圣地"
	// UpstreamDefaultSystemName is the stock name unmodified New API writes
	// when nothing has been chosen. A stored copy of it is still the unset
	// default, not an explicit brand.
	UpstreamDefaultSystemName = "New API"
)

// ResolveSystemName keeps an explicit administrator brand. An empty value or
// the upstream stock name resolves to DefaultSystemName. The function does
// not write the database; callers that only load options leave stored rows
// unchanged.
func ResolveSystemName(stored string) string {
	name := strings.TrimSpace(stored)
	if name == "" || name == UpstreamDefaultSystemName {
		return DefaultSystemName
	}
	return name
}
