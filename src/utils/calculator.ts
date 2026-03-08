import { useState } from 'react';

// RER (Resting Energy Requirement)
// 70 * (weight in kg ^ 0.75)
export const calculateRER = (weight: number) => {
    return 70 * Math.pow(weight, 0.75);
};

// DER (Daily Energy Requirement) Multipliers
export const DER_MULTIPLIERS = {
    puppy_under_4m: 3.0,
    puppy_over_4m: 2.0,
    adult_intact: 1.8,
    adult_neutered: 1.6,
    senior: 1.4,
    weight_loss: 1.0,
    weight_gain: 1.4,
};

export type LifeStage = keyof typeof DER_MULTIPLIERS;

export const calculateDER = (weight: number, stage: LifeStage) => {
    const rer = calculateRER(weight);
    return rer * DER_MULTIPLIERS[stage];
};

export const calculateFeedingAmount = (weight: number, stage: LifeStage, kcalPerKg: number) => {
    const der = calculateDER(weight, stage);
    const kcalPerGram = kcalPerKg / 1000;

    const dailyGrams = der / kcalPerGram;
    return Math.round(dailyGrams);
};

// 1 SugarPet Paper Cup = approx 80g
export const PAPER_CUP_GRAMS = 80;

export const calculateCups = (grams: number) => {
    return (grams / PAPER_CUP_GRAMS).toFixed(1);
};
