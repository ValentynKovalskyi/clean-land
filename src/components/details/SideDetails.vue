<template>
    <v-card class="details details--side-panel" :class="{ 'object-details--show': show}">
        <DetailsContent />
    </v-card>
</template>
<script setup>
import { useObjects } from '@/stores/objectStore';
import { storeToRefs } from 'pinia';
import DetailsContent from '../details/DetailsContent.vue';


const objectsStore = useObjects();
const { show } = storeToRefs(objectsStore);
</script>
<style lang="scss">
.details {
    &--side-panel {
        min-height: 0;
        width: 30vw;
        bottom: 0;
        height: 85vh;
        border-top-right-radius: 25px;
        left: 0;
        z-index: 2;
        position: absolute;
        transform: translateX(-100%);
        grid-template-rows: max-content max-content max-content max-content max-content max-content 1fr;
        grid-template-columns: 7fr 3fr 2em;
        @include transition;
        & .details {
            &__district {
            grid-column: span 3;
            grid-row: 2;
            }
            &__coords {
                grid-row: 3;
                grid-column: span 3;
            }
            &__actions {
                grid-row: 4;
                grid-column: span 3;
            }
            &__problems {
                grid-row: 5;
                grid-column: span 3;
            }
            &__table { 
                max-height: 100%;
                display: block;
                height: 100%;
                grid-column: span 3;
                overflow-y: auto;
                text-align: center;
                width: 100%;
                &--no-problems {
                    max-height: unset;
                }
            }
        }
    }
    
    &--dialog {
        display: grid;
        width: 100%;
        grid-template-rows: max-content max-content max-content 1fr max-content max-content max-content;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        @include transition;
        & .details {
            &__name {
                grid-column: span 2;
            }
            &__criticity {
        
            }
            &__close {
                grid-column: 4;
                grid-row: 1;
                justify-self: end;
                margin-right: 2em;
            }
            &__district {
                grid-column: span 2;
                grid-row: 2;
            }
            &__coords {
                grid-row: 2;
                grid-column: span 2;
            }
            &__actions {
                grid-row: 3;
                grid-column: span 4;
            }
            &__problems {
                grid-row: 4;
                grid-column: span 4;
            }
            &__table {
                &__title {
                    grid-column: span 4;
                }
                grid-column: span 4;
                grid-row: 6; 
                display: flex;
                flex-direction: row;
                text-align: center;
                width: 100%;
            }
        }
    }
    row-gap: 0.5em;
    display: grid;

    a {
        all: unset;
        padding-left: 1em;
        color: $color-3;
        font-weight: 600;
    }
    a:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    &__name {
        padding: 1rem 0 0 1rem;
        font-weight: 500;
        font-size: 2rem;
        align-self: center;
        @include text-ellipsis;
    }
    &__criticity {
        padding-top: 1em;
        align-self: center;
    }
    &__district {
        padding: 0 1rem;
        font-weight: 400;
        font-size: 2rem;
        @include text-ellipsis;
    }
    &__coords {
        padding: 0 1rem;
        font-weight: 500;
        font-size: 1.2rem;
    }
    &__actions {
        padding: 0 1rem;
        font-weight: 500;
        @include centered-flex;
        gap: 2em;
        &__donate {
            filter: drop-shadow(2px 2px 2px black);
        }
    }
    &__problems {
        text-align: center;
        width: 100%;
    }
    &__table { 
        width: 100%;
        &__title {
            grid-column: span 3;
        }
        & table {
            border-collapse: collapse;
            width: 100%;
            table-layout: fixed;
        }
        th {
            font-style: normal;
            font-weight: 400;
        }
        & td {
            width: 50%;
            text-align: start;
            padding-left: 2em;
        }
        th, td {
            border: 1px solid rgb(179, 179, 179);
        }
    }
}
.title {
    display: block;
    width: 100%;
    text-align: center;
    border-bottom: $color-3 1px solid;
    padding: 0.2em;
}

.object-details--show {
    transform: translateX(0%);
}

.donate {
    color: red;
    font-weight: bold;
}

.actions {
    @include centered-flex;
    gap: 2em;
    margin: 1em;
}

.v-dialog > .v-overlay__content > .v-card {
    display: grid;
}

.blurred-overlay >>> .v-overlay__scrim {
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.4); // прозорий темний фон
}
</style>