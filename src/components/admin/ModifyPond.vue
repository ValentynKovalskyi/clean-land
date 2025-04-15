<template>
    <v-dialog v-model="dialog" max-width="800">
      <template #activator="{ on, attrs }">
        <v-btn @click="openEditor">
            <v-icon icon="mdi-plus" size="large" :title="$t('Create')"></v-icon>
        </v-btn>
      </template>
  
      <v-card>
        <v-card-title>{{ isEdit ? 'Редагування водойми' : 'Створення нової водойми' }}</v-card-title>
  
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="pond.name" label="Назва водойми" variant="outlined"/>
            <v-text-field v-model="pond.district" label="Район" variant="outlined"/>
            <v-text-field v-model="pond.territorialCommunity" label="Громада" variant="outlined"/>
            <v-text-field v-model="pond.settlement" label="Населений пункт" variant="outlined"/>
            <v-text-field v-model.number="pond.xLocation" label="X координата" type="number" variant="outlined"/>
            <v-text-field v-model.number="pond.yLocation" label="Y координата" type="number" variant="outlined"/>
  
            <v-text-field v-model.number="pond.length" label="Довжина" type="number" variant="outlined"/>
            <v-text-field v-model.number="pond.width" label="Ширина" type="number" variant="outlined"/>
            <v-text-field v-model.number="pond.depth" label="Глибина" type="number" variant="outlined"/>
            <v-text-field v-model.number="pond.waterLevel" label="Рівень води" type="number" variant="outlined"/>
            <v-text-field v-model.number="pond.volume" label="Обʼєм" type="number" variant="outlined"/>
            <v-text-field v-model.number="pond.waterSurfaceArea" label="Площа водного дзеркала" type="number" variant="outlined"/>
  
            <v-switch v-model="pond.isDrainable" label="Можна осушити?" variant="outlined"/>
            <v-switch v-model="pond.hasHydraulicStructure" label="Є гідроспоруда?" variant="outlined"/>
  
            <v-text-field v-model="pond.hydraulicStructureOwner" label="Власник гідроспоруди" variant="outlined"/>
            <v-text-field v-model="pond.cadastralNumber" label="Кадастровий номер" variant="outlined"/>
  
            <v-text-field v-model="pond.lessee.name" label="Орендар: імʼя" variant="outlined"/>
            <v-text-field v-model="pond.lessee.type" label="Тип орендаря" variant="outlined"/>
            <v-text-field v-model="pond.lessee.identificationCode" label="Код орендаря" variant="outlined"/>
  
            <v-text-field v-model="pond.leaseAgreement.number" label="Номер договору оренди" variant="outlined"/>
            <v-text-field v-model="pond.leaseAgreement.date" label="Дата договору" type="date" variant="outlined"/>
            <v-text-field v-model.number="pond.leaseAgreement.termInYears" label="Строк оренди (років)" type="number" variant="outlined"/>
            <v-text-field v-model="pond.leaseAgreement.economicActivities" label="Види діяльності" variant="outlined"/>
  
            <v-text-field v-model="pond.waterUsagePermit.number" label="Номер дозволу на водокористування" variant="outlined"/>
            <v-text-field v-model="pond.waterUsagePermit.startDate" label="Початок дозволу" type="date" variant="outlined"/>
            <v-text-field v-model.number="pond.waterUsagePermit.termInYears" label="Термін дії (років)" type="number" variant="outlined"/>
  
            <v-text-field v-model="pond.river" label="Річка" variant="outlined"/>
            <v-text-field v-model="pond.basin" label="Басейн" variant="outlined"/>
            <v-text-field v-model="pond.status" label="Статус" variant="outlined"/>
            <v-textarea v-model="pond.description" label="Опис" rows="3" variant="outlined"/>
  
            <v-text-field v-model.number="pond.imposedFines" label="Накладені штрафи" type="number" variant="outlined"/>
            <v-text-field v-model.number="pond.imposedDamages" label="Накладені збитки" type="number" variant="outlined"/>
            <v-text-field v-model.number="pond.collectedFines" label="Стягнуті штрафи" type="number" variant="outlined"/>
            <v-text-field v-model.number="pond.collectedDamages" label="Стягнуті збитки" type="number" variant="outlined"/>
  
            <v-text-field v-model.number="pond.waterQualityIndex" label="Індекс якості води" type="number" variant="outlined"/>
            <v-text-field v-model.number="pond.oxygenSaturation" label="Насиченість киснем" type="number" variant="outlined"/>
            <v-text-field v-model.number="pond.pollutantConcentration" label="Концентрація забруднень" type="number" variant="outlined"/>
            <v-switch v-model="pond.isEutrophicated" label="Є евтрофікація?" />
            <v-text-field v-model.number="pond.algalBloomFrequency" label="Частота цвітіння" type="number" variant="outlined"/>
            <v-switch v-model="pond.hasAgricultureNearby" label="Є с/г поруч?" variant="outlined"/>
            <v-switch v-model="pond.hasIndustryNearby" label="Є промисловість поруч?" variant="outlined"/>
  
            <v-text-field v-model.number="pond.criticalityScore" label="Критичність (0–10)" type="number" variant="outlined"/>
          </v-form>
        </v-card-text>
  
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Скасувати</v-btn>
          <v-btn color="primary" @click="submitForm">{{ isEdit ? 'Оновити' : 'Створити' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, reactive, watch } from 'vue';
  import axios from 'axios';
  
  const dialog = ref(false);
  const isEdit = ref(false); // чи редагуємо існуючий обʼєкт
  
  const pond = reactive({
    name: '',
    district: '',
    territorialCommunity: '',
    settlement: '',
    xLocation: null,
    yLocation: null,
    length: null,
    width: null,
    depth: null,
    waterLevel: null,
    volume: null,
    waterSurfaceArea: null,
    cadastralNumber: '',
    isDrainable: false,
    hasHydraulicStructure: false,
    hydraulicStructureOwner: '',
    river: '',
    basin: '',
    status: '',
    description: '',
    imposedFines: null,
    imposedDamages: null,
    collectedFines: null,
    collectedDamages: null,
    waterQualityIndex: null,
    oxygenSaturation: null,
    pollutantConcentration: null,
    isEutrophicated: false,
    algalBloomFrequency: null,
    hasAgricultureNearby: false,
    hasIndustryNearby: false,
    criticalityScore: null,
    lessee: {
      name: '',
      type: '',
      identificationCode: ''
    },
    leaseAgreement: {
      number: '',
      date: '',
      termInYears: null,
      economicActivities: ''
    },
    waterUsagePermit: {
      number: '',
      startDate: '',
      termInYears: null
    }
  });
  
  const submitForm = async () => {
    try {
      if (isEdit.value && pond.id) {
        await axios.put(`http://localhost:5000/Ponds/${pond.id}`, pond);
      } else {
        await axios.post('http://localhost:5000/Ponds', pond);
      }
      dialog.value = false;
    } catch (error) {
      console.error('Помилка збереження:', error);
    }
  };
  
  // Для зовнішнього використання — встановити обʼєкт у форму
  function openEditor(existingPond = null) {
    if (existingPond) {
      Object.assign(pond, existingPond);
      isEdit.value = true;
    } else {
      Object.assign(pond, JSON.parse(JSON.stringify(pond))); // reset
      isEdit.value = false;
    }
    dialog.value = true;
  }
  
  defineExpose({ openEditor });
  </script>
  
  <style scoped>
  .v-card-text {
    max-height: 75vh;
    overflow-y: auto;
  }
  </style>