<template>
    <table>
                    <tr>
                        <th colspan="2">{{ $t('GeneralInfo')}}</th>
                    </tr>
                    <tr>
                        <td>{{ $t('Object.river')}}</td>
                        <td>{{ object.river }}</td>
                    </tr>
                    <tr>
                        <td>{{ $t('Object.basin')}}</td>
                        <td>{{ object.basin }}</td>
                    </tr>
                    <tr>
                        <td>{{ [$t('Object.length'), $t('Object.width'), $t('Object.depth')].join(':')}}</td>
                        <td>{{ [object.length, object.width,  object.width].join(':') }}</td>
                    </tr>
                    <tr>
                        <td>{{ $t('Object.waterLevel') }}</td>
                        <td>{{ object.waterLevel }}</td>
                    </tr>
                    <tr>
                        <td>{{ $t('Object.hydraulicStructureOwner') }}</td>
                        <td>{{ object.hydraulicStructureOwner}}</td>
                    </tr>
                    <tr v-if="object.lessee">
                        <td>{{ $t('Object.lesseeName') }}</td>
                        <td>{{ object.lessee.name }}</td>
                    </tr>
                    <tr>
                        <td>{{ $t('Object.cadastralNumber') }}</td>
                        <td>{{ object.cadastralNumber}}</td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th colspan="2">{{ $t("WaterQualityInfo")}}</th>
                    </tr>
                    <tr>
                        <td>{{ $t('Object.waterQualityIndex') }}</td>
                        <td>{{ object.waterQualityIndex }}</td>
                    </tr>
                    <tr>
                        <td>{{ $t('Object.oxygenSaturation') }}</td>
                        <td>{{ object.oxygenSaturation }}</td>
                    </tr>
                    <tr>
                        <td>{{ $t('Object.isEutrophicated') }}</td>
                        <td>{{ object.isEutrophicated }}</td>
                    </tr>
                    <tr>
                        <td>{{ $t('Object.algalBloomFrequency') }}</td>
                        <td>{{ object.algalBloomFrequency }}</td>
                    </tr>
                    <tr>
                        <td>{{ $t('Object.pollutantConcentration') }}</td>
                        <td>{{ object.pollutantConcentration }}</td>
                    </tr>
                    <tr>
                        <td>{{ $t("Object.pollutionStatus")}}</td>
                        <td>{{ object.status }}</td>
                    </tr>
                </table>
</template>
<script setup>
defineProps({
    object: {
        type: Object,
        required: true,
    }
})
</script>