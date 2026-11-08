package model

import (
	"testing"

	"github.com/QuantumNous/new-api/common"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestSystemNameOptionKeepsExplicitBrandAndReplacesStockDefault(t *testing.T) {
	common.OptionMapRWMutex.Lock()
	previousMap := common.OptionMap
	previousName := common.SystemName
	common.OptionMap = map[string]string{}
	common.OptionMapRWMutex.Unlock()
	t.Cleanup(func() {
		common.OptionMapRWMutex.Lock()
		common.OptionMap = previousMap
		common.SystemName = previousName
		common.OptionMapRWMutex.Unlock()
	})

	tests := []struct {
		name   string
		stored string
		want   string
	}{
		{name: "stock default resolves to the fork name", stored: "New API", want: common.DefaultSystemName},
		{name: "padded stock default resolves to the fork name", stored: "  New API  ", want: common.DefaultSystemName},
		{name: "empty value resolves to the fork name", stored: "   ", want: common.DefaultSystemName},
		{name: "explicit brand is kept", stored: "北窗", want: "北窗"},
		{name: "explicit brand with surrounding space is trimmed and kept", stored: "  北窗  ", want: "北窗"},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			require.NoError(t, updateOptionMap("SystemName", tc.stored))
			assert.Equal(t, tc.want, common.SystemName)
			assert.Equal(t, tc.want, common.OptionMap["SystemName"])
		})
	}
}
