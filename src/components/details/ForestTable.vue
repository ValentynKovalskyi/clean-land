<template>
    <table>
                    <tr>
                        <th colspan="2">{{ $t('GeneralInfo')}}</th>
                    </tr>
                    <tr>
                        <td>{{ $t('Object.treesAmount')}}</td>
                        <td>{{ object.treesAmount }}</td>
                    </tr>
                    <tr>
                        <td>{{ $t('Object.isProtectedByLaw')}}</td>
                        <td>{{ object.isProtectedByLaw ? $t('Yes'): $t('No') }}</td>
                    </tr>
                    <tr>
                        <td>{{ $t('Object.ngo') }}</td>
                        <td>{{ object.ngo }}</td>
                    </tr>
                    <tr>
                        <td>{{ $t('Object.tonsOfSequesteredToDate') }}</td>
                        <td>{{ object.tonsOfSequesteredToDate }}</td>
                    </tr>
                    <tr>
                        <td>{{ $t('Object.tonsOfSequesteredPotential') }}</td>
                        <td>{{ object.tonsOfSequesteredPotential }}</td>
                    </tr>
                    <tr v-if="object.lessee">
                        <td>{{ $t('Object.averageYearTemperature') }}</td>
                        <td>{{ object.lessee.name }}</td>
                    </tr>
                    <tr>
                        <td>{{ $t('Object.averageYearHumidity') }}</td>
                        <td>{{ object.averageYearHumidity }}</td>
                    </tr>
                    <tr>
                        <td>{{ $t('Object.fireIncidentsAmount') }}</td>
                        <td>{{ object.fireIncidentsAmount }}</td>
                    </tr>
                    <tr v-if="object.areaDatas?.length">
                        <td>{{ $t('Object.area') }}</td>
                        <td>{{ object.areaDatas.reduce((acc, areaData) => acc + areaData.area, 0)}}</td>
                    </tr>
                </table>
                <table v-if="object.treeSpecies?.length">
                    <tr>
                        <th colspan="2">{{ $t("Object.TreeSpecies")}}</th>
                    </tr>
                    <template v-for="specie of object.treeSpecies">
                        <tr>
                            <td rowspan="2">{{ specie.scientificName }}
                                <span v-if="specie.commonName">({{ specie.commonName}})</span>
                            </td>
                            <td>{{ specie.isEndemic ? $t("Object.endemic"): $t("Object.notEndemic") }}</td>
                        </tr>
                        <tr>
                            <td>{{ specie.isInvasive ? $t("Object.invasive"): $t("Object.notInvasive") }}</td>
                        </tr>
                    </template>
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